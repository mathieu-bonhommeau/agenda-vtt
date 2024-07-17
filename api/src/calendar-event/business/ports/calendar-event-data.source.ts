import { CalendarEvent } from '../models/calendar.event'

export type CalendarEventFetchParams = {
    start?: Date
    end?: Date
}

export interface CalendarEventDataSource {
    fetch(params: CalendarEventFetchParams): Promise<CalendarEvent[]>
}
