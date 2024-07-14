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
import { CalendarEvent, EventLocation, EventOrganizer, Trace } from '../../business/models/calendar.event'
import { v4 } from 'uuid'
import { CalendarEventEntity } from '../../../_common/db/pg/entities/calendar-event.entity'
import { DataSource, InsertResult, UpdateResult } from 'typeorm'
import { EventLocationEntity } from '../../../_common/db/pg/entities/event-location.entity'
import { TraceEntity } from '../../../_common/db/pg/entities/trace.entity'
import { EventOrganizerEntity } from '../../../_common/db/pg/entities/event-organizer.entity'
import {
    toCalendarEventDbDTO,
    toEventLocationDbDTO,
    toEventOrganizerDbDTO,
    toTraceDbDTO,
} from '../../infrastructure/dtos/calendar-event-dto'
import { calendarEventDataSourceProvider, retrieveEventsProvider } from '../../_config/calendar-event.module'
import { toCalendarEventFromResponseBodyDto } from './to-calendar-event-from-response-body-dto'
import { PgTestingProvider } from '../../../_common/db/pg/pg-testing.provider'

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
            contacts: [arbitraryContact({ name: 'dorianito' })],
        }),
    })

    const event2 = arbitraryCalendarEvent({
        id: v4(),
        eventLocation: arbitraryEventLocation({
            id: v4(),
            housenumber: null,
            county: null,
            postcode: null,
        }),
        traces: [arbitraryTrace({ id: v4() }), arbitraryTrace({ id: v4() })],
        organizer: arbitraryEventOrganizer({
            id: v4(),
            contacts: [arbitraryContact({ name: 'marcito' })],
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

        sut.givenCalendarEvent(event2)
            .withTraces(event2.traces)
            .withEventLocation(event2.eventLocation)
            .withOrganizer(event2.organizer)

        await sut.executePromises()
    })

    it('retrieves all events', async () => {
        const response = await sut.retrieveCalendarEvents('/calendar-events')

        expect(response.status).toEqual(200)
        expect(response.body.length).toEqual(2)
        expect(toCalendarEventFromResponseBodyDto(response.body[0])).toEqual(event1)
        expect(toCalendarEventFromResponseBodyDto(response.body[1])).toEqual(event2)
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
        await this._pg.createQueryBuilder().delete().from(EventOrganizerEntity).execute()
        await this._pg.createQueryBuilder().delete().from(EventLocationEntity).execute()
    }
}
