import { CalendarEventRepository } from '../business/ports/calendar-event.repository'
import { NewCalendarEventCommand } from '../business/use-cases/add-event/add-events'
import { DataSource } from 'typeorm'
import { CalendarEventEntity } from '../../_common/db/pg/entities/calendar-event.entity'
import { EventLocationEntity } from '../../_common/db/pg/entities/event-location.entity'
import { EventLocation, EventOrganizer, Trace } from '../business/models/calendar.event'
import { TraceEntity } from '../../_common/db/pg/entities/trace.entity'
import { EventOrganizerEntity } from '../../_common/db/pg/entities/event-organizer.entity'

export class PgCalendarEventRepository implements CalendarEventRepository {
    private readonly _pg: DataSource
    private readonly _now: Date

    constructor({ pg, now }: { pg: DataSource; now: Date }) {
        this._pg = pg
        this._now = now
    }

    async persist(newEvent: NewCalendarEventCommand): Promise<void> {
        await this.persistEventLocation(newEvent.eventLocation)
        await this.persistOrganizer(newEvent.organizer)
        await this.persistCalendarEvent(newEvent)
        await this.persistTraces(newEvent.traces, newEvent.id)
    }

    private async persistCalendarEvent(calendarEvent: NewCalendarEventCommand): Promise<void> {
        await this._pg
            .createQueryBuilder(CalendarEventEntity, 'calendar_event_entity')
            .insert()
            .values({
                id: calendarEvent.id,
                title: calendarEvent.title,
                description: calendarEvent.description,
                startDate: new Date(calendarEvent.startDate).toISOString(),
                endDate: new Date(calendarEvent.endDate).toISOString(),
                createdAt: this._now.toISOString(),
                prices: calendarEvent.price,
                services: calendarEvent.services,
                eventLocation: { id: calendarEvent.eventLocation.id },
                organizer: { id: calendarEvent.organizer.id },
            })
            .execute()
    }

    private async persistEventLocation(eventLocation: EventLocation): Promise<void> {
        await this._pg
            .createQueryBuilder(EventLocationEntity, 'event_location_entity')
            .insert()
            .values({
                id: eventLocation.id,
                country: eventLocation.country,
                region: eventLocation.region,
                county: eventLocation.county,
                city: eventLocation.city,
                postcode: eventLocation.postcode,
                housenumber: eventLocation.housenumber,
                address: eventLocation.address,
                geometry: () =>
                    `ST_SetSRID(ST_MakePoint(${eventLocation.latLon.lon}, ${eventLocation.latLon.lat}),4326)`,
            })
            .execute()
    }

    private async persistTraces(traces: Trace[], calendarEventId: string): Promise<void> {
        for (const trace of traces) {
            await this._pg
                .createQueryBuilder(TraceEntity, 'trace_entity')
                .insert()
                .values({
                    ...trace,
                    calendarEvent: { id: calendarEventId },
                })
                .execute()
        }
    }

    private async persistOrganizer(organizer: EventOrganizer): Promise<void> {
        await this._pg
            .createQueryBuilder(EventOrganizerEntity, 'event_organizer_entity')
            .insert()
            .values({
                id: organizer.id,
                name: organizer.name,
                email: organizer.email,
                website: organizer.website,
                contacts: organizer.contacts,
            })
            .execute()
    }
}
