import { CalendarEvent } from '../models/calendar.event'

export interface CalendarEventDataSource {
    fetch(): Promise<CalendarEvent[]>
}