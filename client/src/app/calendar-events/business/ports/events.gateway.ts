import { CalendarEvent } from '@/app/calendar-events/business/models/event'
import { RetrieveEventsCommand } from '@/app/calendar-events/business/use-case/retrieve-events/retrieve-events'

export interface EventsGateway {
    retrieveEvents(command: RetrieveEventsCommand): Promise<CalendarEvent[]>
}
