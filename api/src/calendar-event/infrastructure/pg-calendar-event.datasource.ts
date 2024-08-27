import { CalendarEventDataSource, CalendarEventFetchParams } from '../business/ports/calendar-event-data.source'
import { DataSource, SelectQueryBuilder } from 'typeorm'
import { CalendarEvent } from '../business/models/calendar.event'
import { CalendarEventEntity } from '../../_common/db/pg/entities/calendar-event.entity'
import { isValid } from 'date-fns'
import { PgCalendarEventFactory } from './factories/pg-event-location.factory'

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

        if (params.bbox)
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

        if (params.keyWord)
            query.andWhere(
                '(lower(calendar_event_entity.title) like :keyWord OR lower(event_organizer_entity.name) like :keyWord)',
                {
                    keyWord: `%${params.keyWord.toLowerCase()}%`,
                },
            )

        if (params.distanceMax && !params.distanceMin) {
            query.andWhere('trace_entity.distance < :distanceMax', { distanceMax: params.distanceMax })
        }
        if (params.distanceMin && !params.distanceMax) {
            query.andWhere('trace_entity.distance > :distanceMin', { distanceMin: params.distanceMin })
        }
        if (params.distanceMin && params.distanceMax) {
            query.andWhere('trace_entity.distance <= :distanceMax', { distanceMax: params.distanceMax })
            query.andWhere('trace_entity.distance >= :distanceMin', { distanceMin: params.distanceMin })
        }
        if (params.sortBy === 'date') query.orderBy('calendar_event_entity.start_date', 'ASC')
        if (params.sortBy === 'location') query.orderBy('substring(event_location_entity.postcode, 0, 3)', 'ASC')

        return query
    }
}
