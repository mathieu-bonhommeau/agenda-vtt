import { CalendarEvent } from '@/app/calendar-event/business/model/event'
import { RetrieveEventsCommand } from '@/app/calendar-event/business/use-case/retrieve-events/retrieve-events'

export interface EventsGateway {
    retrieveEvents(command: RetrieveEventsCommand): Promise<CalendarEvent[]>
}
