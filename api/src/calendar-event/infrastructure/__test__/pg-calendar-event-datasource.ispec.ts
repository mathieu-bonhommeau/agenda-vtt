import { DataSource, InsertResult, UpdateResult } from 'typeorm'
import {
    arbitraryCalendarEvent,
    arbitraryContact,
    arbitraryEventLocation,
    arbitraryEventOrganizer,
    arbitraryTrace,
} from '../../../_common/helpers/event-factories.helpers'
import { v4 } from 'uuid'
import { PgTesting } from '../../../_common/db/pg/_config/pg-testing'
import { Server } from 'http'
import { CalendarEvent, Contact, EventLocation, EventOrganizer, Trace } from '../../business/models/calendar.event'
import { CalendarEventEntity } from '../../../_common/db/pg/entities/calendar-event.entity'
import {
    toCalendarEventDbDTO,
    toContactDbDTO,
    toEventLocationDbDTO,
    toEventOrganizerDbDTO,
    toTraceDbDTO,
} from '../dtos/calendar-event-dto'
import { TraceEntity } from '../../../_common/db/pg/entities/trace.entity'
import { EventLocationEntity } from '../../../_common/db/pg/entities/event-location.entity'
import { EventOrganizerEntity } from '../../../_common/db/pg/entities/event-organizer.entity'
import { ContactEntity } from '../../../_common/db/pg/entities/contact.entity'
import { PgCalendarEventDataSource } from '../pg-calendar-event.datasource'

describe('Calendar event datasource', () => {
    let sut: SUT
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
        pg = await PgTesting.initialize()
    })

    beforeEach(async () => {
        sut = new SUT({ pg })
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
        const eventsRetrieved = await sut.retrieveCalendarEvents()
        expect(eventsRetrieved.length).toEqual(2)
        expect(eventsRetrieved[0]).toMatchObject(event1)
        expect(eventsRetrieved[1]).toMatchObject(event2)
    })
})

class SUT {
    private readonly _server: Server
    private readonly _pg: DataSource
    private readonly _promises: Array<() => Promise<InsertResult | UpdateResult>> = []
    private readonly _calendarEventDatasource: PgCalendarEventDataSource

    constructor({ pg }: { pg: DataSource }) {
        this._pg = pg
        this._calendarEventDatasource = new PgCalendarEventDataSource({ pg: this._pg })
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

    async retrieveCalendarEvents() {
        return this._calendarEventDatasource.fetch()
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
