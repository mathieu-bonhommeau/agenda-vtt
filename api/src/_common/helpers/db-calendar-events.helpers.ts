import {
    CalendarEvent,
    EventLocation,
    EventOrganizer,
    Trace,
} from '../../calendar-event/business/models/calendar.event'
import { CalendarEventEntity } from '../db/pg/entities/calendar-event.entity'
import {
    toCalendarEventDbDTO,
    toEventLocationDbDTO,
    toEventOrganizerDbDTO,
    toTraceDbDTO,
} from '../../calendar-event/infrastructure/dtos/calendar-event-dto'
import { TraceEntity } from '../db/pg/entities/trace.entity'
import { EventLocationEntity } from '../db/pg/entities/event-location.entity'
import { EventOrganizerEntity } from '../db/pg/entities/event-organizer.entity'
import { DataSource, InsertResult, UpdateResult } from 'typeorm'

export class DbCalendarEventsBuilders {
    private readonly _promises: Array<() => Promise<InsertResult | UpdateResult>> = []

    constructor(private readonly _pg: DataSource) {}

    buildCalendarEvent(event: CalendarEvent) {
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

    async executePromises() {
        for (const promise of this._promises) {
            await promise()
        }
    }
}
