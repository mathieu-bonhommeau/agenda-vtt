import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { Server } from 'http'
import { CalendarEventController } from '../calendar-event.controller'
import {
    arbitraryCalendarEvent,
    arbitraryContact,
    arbitraryEventLocation,
    arbitraryEventOrganizer,
    arbitraryTrace,
} from '../../../_common/helpers/event-factories.helpers'
import { CalendarEvent, Contact, EventLocation, EventOrganizer, Trace } from '../../business/models/calendar.event'
import { v4 } from 'uuid'
import { PgModule } from '../../../_common/db/pg/pg.module'
import { CalendarEventEntity } from '../../../_common/db/pg/entities/calendar-event.entity'
import { DataSource, InsertResult, UpdateResult } from 'typeorm'
import { PgTesting } from '../../../_common/db/pg/_config/pg-testing'
import { EventLocationEntity } from '../../../_common/db/pg/entities/event-location.entity'
import { TraceEntity } from '../../../_common/db/pg/entities/trace.entity'
import { ContactEntity } from '../../../_common/db/pg/entities/contact.entity'
import { EventOrganizerEntity } from '../../../_common/db/pg/entities/event-organizer.entity'
import {
    toCalendarEventDbDTO,
    toContactDbDTO,
    toEventLocationDbDTO,
    toEventOrganizerDbDTO,
    toTraceDbDTO,
} from '../../infrastructure/dtos/calendar-event-dto'
import { calendarEventDataSourceProvider, retrieveEventsProvider } from '../../_config/calendar-event.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PgTestingModule, PgTestingProvider } from '../../../_common/db/pg/pg-testing-module'
import { PgProvider } from '../../../_common/db/pg/pg.provider'

describe('Calendar event e2e test', () => {
    let sut: SUT
    let app: INestApplication
    let pg: DataSource

    const event1 = arbitraryCalendarEvent({
        id: v4(),
        eventLocation: arbitraryEventLocation({ id: v4() }),
        traces: [arbitraryTrace({ id: v4() }), arbitraryTrace({ id: v4() })],
        organizer: arbitraryEventOrganizer({
            id: v4(),
            contacts: [arbitraryContact({ id: v4() }), arbitraryContact({ id: v4() })],
        }),
    })

    const event2 = arbitraryCalendarEvent({
        id: v4(),
        eventLocation: arbitraryEventLocation({ id: v4() }),
        traces: [arbitraryTrace({ id: v4() }), arbitraryTrace({ id: v4() })],
        organizer: arbitraryEventOrganizer({
            id: v4(),
            contacts: [arbitraryContact({ id: v4() }), arbitraryContact({ id: v4() })],
        }),
    })

    beforeAll(async () => {
        pg = await PgTestingProvider.useFactory()
        const moduleRef = await Test.createTestingModule({
            controllers: [CalendarEventController],
            providers: [
                retrieveEventsProvider,
                calendarEventDataSourceProvider,
                {
                    provide: 'SQL',
                    useValue: pg,
                },
            ],
        }).compile()
        app = moduleRef.createNestApplication()
        await app.init()
    })

    beforeEach(async () => {
        sut = new SUT({ app, pg })
        await sut.clear()

        sut.givenCalendarEvent(event1)
            .withTraces(event1.traces)
            .withEventLocation(event1.eventLocation)
            .withOrganizer(event1.organizer)
            .withContacts(event1.organizer.contacts, event1.organizer.id)

        sut.givenCalendarEvent(event2)
            .withTraces(event2.traces)
            .withEventLocation(event2.eventLocation)
            .withOrganizer(event2.organizer)
            .withContacts(event2.organizer.contacts, event2.organizer.id)

        await sut.executePromises()
    })

    it('retrieves all events', async () => {
        const response = await sut.retrieveCalendarEvents('/calendar-events')
        expect(response.status).toEqual(200)
        expect(response.body).toEqual([event1, event2])
    })
})

class SUT {
    private readonly _server: Server
    private readonly _pg: DataSource
    private readonly _promises: Array<() => Promise<InsertResult | UpdateResult>> = []

    constructor({ app, pg }: { app: INestApplication; pg: DataSource }) {
        this._server = app.getHttpServer()
        this._pg = pg
    }

    givenCalendarEvent(event: CalendarEvent) {
        this._promises.push(() =>
            this._pg
                .createQueryBuilder()
                .insert()
                .into(CalendarEventEntity)
                .values(toCalendarEventDbDTO(event))
                .execute(),
        )

        return this.next(event)
    }

    next(event: CalendarEvent) {
        const calendarEventDTO = toCalendarEventDbDTO(event)
        return {
            withTraces: (traces: Trace[]) => {
                traces.forEach((trace) =>
                    this._promises.push(() =>
                        this._pg
                            .createQueryBuilder()
                            .insert()
                            .into(TraceEntity)
                            .values(toTraceDbDTO(trace, calendarEventDTO))
                            .execute(),
                    ),
                )
                return this.next(event)
            },
            withEventLocation: (eventLocation: EventLocation) => {
                this._promises.push(() =>
                    this._pg
                        .createQueryBuilder()
                        .insert()
                        .into(EventLocationEntity)
                        .values(toEventLocationDbDTO(eventLocation, calendarEventDTO))
                        .execute(),
                )
                this._promises.push(() =>
                    this._pg
                        .createQueryBuilder()
                        .update(CalendarEventEntity)
                        .set({ eventLocation })
                        .where('id = :id', { id: event.id })
                        .execute(),
                )
                return this.next(event)
            },
            withOrganizer: (organizer: EventOrganizer) => {
                this._promises.push(() =>
                    this._pg
                        .createQueryBuilder()
                        .insert()
                        .into(EventOrganizerEntity)
                        .values(toEventOrganizerDbDTO(organizer))
                        .execute(),
                )
                this._promises.push(() =>
                    this._pg
                        .createQueryBuilder()
                        .update(CalendarEventEntity)
                        .set({ organizer })
                        .where('id = :id', { id: event.id })
                        .execute(),
                )
                return this.next(event)
            },
            withContacts: (contacts: Contact[], organizerId: EventOrganizer['id']) => {
                contacts.forEach((contact) => {
                    this._promises.push(() =>
                        this._pg
                            .createQueryBuilder()
                            .insert()
                            .into(ContactEntity)
                            .values(toContactDbDTO(contact))
                            .execute(),
                    )
                    this._promises.push(() =>
                        this._pg
                            .createQueryBuilder()
                            .insert()
                            .into('organizer_contact')
                            .values({ contact_id: contact.id, organizer_id: organizerId })
                            .execute(),
                    )
                    return this.next(event)
                })
            },
        }
    }

    async retrieveCalendarEvents(path: string) {
        return request(this._server).get(path)
    }

    async executePromises() {
        for (const promise of this._promises) {
            await promise()
        }
    }

    async clear() {
        await this._pg.createQueryBuilder().delete().from(TraceEntity).execute()
        await this._pg.createQueryBuilder().delete().from(CalendarEventEntity).execute()
        await this._pg.createQueryBuilder().delete().from('organizer_contact').execute()
        await this._pg.createQueryBuilder().delete().from(EventOrganizerEntity).execute()
        await this._pg.createQueryBuilder().delete().from(EventLocationEntity).execute()
        await this._pg.createQueryBuilder().delete().from(ContactEntity).execute()
    }
}
