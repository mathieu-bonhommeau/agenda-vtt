import { CalendarEventDataSource } from '../business/ports/calendar-event-data.source'
import { DataSource } from 'typeorm'
import { CalendarEvent, EventLocation, EventOrganizer, Trace } from '../business/models/calendar.event'
import { CalendarEventEntity } from '../../_common/db/pg/entities/calendar-event.entity'
import { EventLocationEntity } from '../../_common/db/pg/entities/event-location.entity'
import { EventOrganizerEntity } from '../../_common/db/pg/entities/event-organizer.entity'
import { TraceEntity } from '../../_common/db/pg/entities/trace.entity'

export class PgCalendarEventDataSource implements CalendarEventDataSource {
    private readonly _pg: DataSource

    constructor({ pg }: { pg: DataSource }) {
        this._pg = pg
    }

    async fetch(): Promise<CalendarEvent[]> {
        const eventsDB = await this._pg
            .createQueryBuilder(CalendarEventEntity, 'calendar_event_entity')
            .innerJoinAndSelect('calendar_event_entity.eventLocation', 'event_location_entity')
            .innerJoinAndSelect('calendar_event_entity.organizer', 'event_organizer_entity')
            .innerJoinAndSelect('calendar_event_entity.traces', 'trace_entity')
            .getMany()

        return eventsDB.map((event: CalendarEventEntity) => PgCalendarEventFactory.create(event))
    }
}

class PgCalendarEventFactory {
    static create(dbCalendarEvent: CalendarEventEntity): CalendarEvent {
        return {
            id: dbCalendarEvent.id,
            title: dbCalendarEvent.title,
            description: dbCalendarEvent.description,
            createdAt: dbCalendarEvent.createdAt,
            startDate: dbCalendarEvent.startDate,
            endDate: dbCalendarEvent.endDate,
            eventLocation: PgEventLocationFactory.create(dbCalendarEvent.eventLocation),
            organizer: PgEventOrganizerFactory.create(dbCalendarEvent.organizer),
            traces: dbCalendarEvent.traces.map((t) => PgTraceFactory.create(t)),
            services: dbCalendarEvent.services,
            prices: dbCalendarEvent.prices,
        }
    }
}

class PgEventLocationFactory {
    static create(dbEventLocation: EventLocationEntity): EventLocation {
        return {
            id: dbEventLocation.id,
            city: dbEventLocation.city,
            county: dbEventLocation.county,
            postcode: dbEventLocation.postcode,
            housenumber: dbEventLocation.housenumber,
            country: dbEventLocation.country,
            address: dbEventLocation.address,
            latLon: { lon: dbEventLocation.geometry.coordinates[0], lat: dbEventLocation.geometry.coordinates[1] },
        }
    }
}

class PgEventOrganizerFactory {
    static create(dbEventOrganizer: EventOrganizerEntity): EventOrganizer {
        return {
            id: dbEventOrganizer.id,
            email: dbEventOrganizer.email,
            name: dbEventOrganizer.name,
            website: dbEventOrganizer.website,
            contacts: dbEventOrganizer.contacts,
        }
    }
}

class PgTraceFactory {
    static create(dbTrace: TraceEntity): Trace {
        return {
            id: dbTrace.id,
            distance: dbTrace.distance,
            link: dbTrace.link,
            positiveElevation: dbTrace.positiveElevation,
            traceColor: dbTrace.traceColor,
            utagawaId: dbTrace.utagawaId,
        }
    }
}
