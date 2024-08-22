import { CalendarEvent } from '../models/calendar.event'

export type CalendarEventFetchParams = {
    start?: Date
    end?: Date
    bbox?: string[]
    keyWord?: string
    distanceMax?: number
    distanceMin?: number
    sortBy?: string
}

export interface CalendarEventDataSource {
    fetch(params: CalendarEventFetchParams): Promise<CalendarEvent[]>
}
