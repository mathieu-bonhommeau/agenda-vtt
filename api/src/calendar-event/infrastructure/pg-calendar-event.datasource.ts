import { CalendarEventDataSource, CalendarEventFetchParams } from '../business/ports/calendar-event-data.source'
import { DataSource, SelectQueryBuilder } from 'typeorm'
import { CalendarEvent, EventLocation, EventOrganizer, Trace } from '../business/models/calendar.event'
import { CalendarEventEntity } from '../../_common/db/pg/entities/calendar-event.entity'
import { EventLocationEntity } from '../../_common/db/pg/entities/event-location.entity'
import { EventOrganizerEntity } from '../../_common/db/pg/entities/event-organizer.entity'
import { TraceEntity } from '../../_common/db/pg/entities/trace.entity'
import { isValid } from 'date-fns'

export class PgCalendarEventDataSource implements CalendarEventDataSource {
    private readonly _pg: DataSource

    constructor({ pg }: { pg: DataSource }) {
        this._pg = pg
    }

    async fetch(params: CalendarEventFetchParams): Promise<CalendarEvent[]> {
        let request = this._pg
            .createQueryBuilder(CalendarEventEntity, 'calendar_event_entity')
            .innerJoinAndSelect('calendar_event_entity.eventLocation', 'event_location_entity')
            .innerJoinAndSelect('calendar_event_entity.organizer', 'event_organizer_entity')
            .innerJoinAndSelect('calendar_event_entity.traces', 'trace_entity')
            .where('true')

        request = this.buildQueriesFilter(params, request)

        const eventsDB = await request.getMany()

        return eventsDB.map((event: CalendarEventEntity) => PgCalendarEventFactory.create(event))
    }

    private buildQueriesFilter(
        params: CalendarEventFetchParams,
        query: SelectQueryBuilder<CalendarEventEntity>,
    ): SelectQueryBuilder<CalendarEventEntity> {
        if (isValid(params.start) && isValid(params.end)) {
            query.andWhere(':start <= calendar_event_entity.end_date', { start: params.start })
            query.andWhere(':end >= calendar_event_entity.start_date', { end: params.end })
        }

        if (isValid(params.start) && !isValid(params.end))
            query.andWhere(':start <= calendar_event_entity.end_date', { start: params.start.toISOString() })

        if (params.bbox) {
            query.andWhere(
                `ST_Contains(
                                    ST_MakeEnvelope(:minLon ,:minLat ,:maxLon ,:maxLat , 4326),
                                    ST_Transform(event_location_entity.geometry, 4326)
                          ) = true`,
                {
                    minLon: parseFloat(params.bbox[0]),
                    minLat: parseFloat(params.bbox[1]),
                    maxLon: parseFloat(params.bbox[2]),
                    maxLat: parseFloat(params.bbox[3]),
                },
            )
        }

        return query
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
            region: dbEventLocation.region,
            county: dbEventLocation.county,
            postcode: dbEventLocation.postcode,
            housenumber: dbEventLocation.housenumber,
            country: dbEventLocation.country,
            address: dbEventLocation.address,
            latLon: { lon: dbEventLocation.geometry.coordinates[1], lat: dbEventLocation.geometry.coordinates[0] },
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
