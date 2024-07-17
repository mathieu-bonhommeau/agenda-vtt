import { CalendarEvent } from '../../models/calendar.event'

import { CalendarEventDataSource } from '../../ports/calendar-event-data.source'

export type RetrieveEventsCommand = {
    start?: Date
    end?: Date
    bbox?: string[]
}

export class RetrieveEvents {
    private readonly _calendarEventDataSource: CalendarEventDataSource

    constructor({ calendarEventDataSource }: { calendarEventDataSource: CalendarEventDataSource }) {
        this._calendarEventDataSource = calendarEventDataSource
    }

    async retrieveEvents(command: RetrieveEventsCommand): Promise<CalendarEvent[]> {
        return await this._calendarEventDataSource.fetch(command)
    }
}
