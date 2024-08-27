import { EventLocationEntity } from '../../../_common/db/pg/entities/event-location.entity'
import { CalendarEvent, EventLocation, EventOrganizer, Trace } from '../../business/models/calendar.event'
import { CalendarEventEntity } from '../../../_common/db/pg/entities/calendar-event.entity'
import { EventOrganizerEntity } from '../../../_common/db/pg/entities/event-organizer.entity'
import { TraceEntity } from '../../../_common/db/pg/entities/trace.entity'

export class PgEventLocationFactory {
    static create(dbEventLocation: EventLocationEntity): EventLocation {
        return {
            id: dbEventLocation.id,
            city: dbEventLocation.city,
            region: dbEventLocation.region,
            county: dbEventLocation.county,
            postcode: dbEventLocation.postcode,
            housenumber: dbEventLocation.housenumber,
            country: dbEventLocation.country,
            address: dbEventLocation.address,
            latLon: { lon: dbEventLocation.geometry.coordinates[0], lat: dbEventLocation.geometry.coordinates[1] },
        }
    }
}

export class PgCalendarEventFactory {
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
