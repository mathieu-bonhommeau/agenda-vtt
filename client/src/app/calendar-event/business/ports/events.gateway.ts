import { CalendarEvent } from '@/app/calendar-event/business/model/event'

export interface EventsGateway {
    retrieveEvents(): Promise<CalendarEvent[]>
}
