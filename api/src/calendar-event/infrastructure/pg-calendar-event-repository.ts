import { CalendarEventRepository } from '../business/ports/calendar-event.repository'
import { NewCalendarEventCommand } from '../business/use-cases/add-event/add-events'
import { DataSource } from 'typeorm'
import { CalendarEventEntity } from '../../_common/db/pg/entities/calendar-event.entity'
import { EventLocationEntity } from '../../_common/db/pg/entities/event-location.entity'
import { EventLocation, Trace } from '../business/models/calendar.event'
import { TraceEntity } from '../../_common/db/pg/entities/trace.entity'

export class PgCalendarEventRepository implements CalendarEventRepository {
    private readonly _pg: DataSource

    constructor({ pg }: { pg: DataSource }) {
        this._pg = pg
    }

    async persist(newEvent: NewCalendarEventCommand): Promise<void> {
        //await this._pg.createQueryBuilder(EventLocationEntity, 'event_location_entity')
        const request = this._pg.createQueryBuilder(CalendarEventEntity, 'calendar_event_entity')
    }

    private async persistEventLocation(eventLocation: EventLocation): Promise<void> {
        const qb = this._pg.createQueryBuilder(EventLocationEntity, 'event_location_entity')

        await qb
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
                geometry: `ST_SRID(ST_MakePoint(${eventLocation.latLon.lon}, ${eventLocation.latLon.lat}),4326);`,
            })
            .execute()
    }

    private async persistTraces(traces: Trace[]): Promise<void> {
        for (const trace of traces) {
            await this._pg
                .createQueryBuilder(TraceEntity, 'trace_entity')
                .insert()
                .values({
                    ...trace,
                })
                .execute()
        }
    }
}
