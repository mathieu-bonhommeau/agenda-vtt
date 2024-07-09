import { Controller, Get, HttpCode, Inject } from '@nestjs/common'
import { CalendarEvent } from '../business/models/calendar.event'
import { DataSource } from 'typeorm'
import { CalendarEventEntity } from '../../_common/db/pg/entities/calendar-event.entity'

@Controller('calendar-events')
export class CalendarEventController {
    constructor(@Inject('RetrieveEventsUseCase') private readonly _retrieveEvents: RetrieveEvents) {}

    @Get()
    @HttpCode(200)
    async retrieveEvents(): Promise<CalendarEvent[]> {
        return await this._retrieveEvents.retrieveEvents()
    }
}

export class RetrieveEvents {
    private readonly _calendarEventDataSource: CalendarEventDataSource

    constructor({ calendarEventDataSource }: { calendarEventDataSource: CalendarEventDataSource }) {
        this._calendarEventDataSource = calendarEventDataSource
    }
    async retrieveEvents(): Promise<CalendarEvent[]> {
        return await this._calendarEventDataSource.fetch()
    }
}

export interface CalendarEventDataSource {
    fetch(): Promise<CalendarEvent[]>
}

export class PgCalendarEventDataSource implements CalendarEventDataSource {
    private readonly _pg: DataSource

    constructor({ pg }: { pg: DataSource }) {
        this._pg = pg
    }

    async fetch(): Promise<CalendarEvent[]> {
        const eventsDB = this._pg
            .createQueryBuilder()
            .select('calendar_event_entity')
            .from(CalendarEventEntity, 'calendar_event_entity')
            .getMany()
        //TODO transform eventsDB in CalendarEvents (maybe create a VM...)
    }
}
