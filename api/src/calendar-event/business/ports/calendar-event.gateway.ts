import { CalendarEvent } from '../models/calendar.event'

export interface CalendarEventGateway {
    retrieveEvents(): Promise<CalendarEvent[]>
}
