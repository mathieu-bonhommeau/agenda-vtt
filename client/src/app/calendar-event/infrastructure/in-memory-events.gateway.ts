import { EventsError } from '@/app/_common/business/models/errors/events-error'
import { CalendarEvent } from '@/app/calendar-event/business/model/event'
import { EventsGateway } from '@/app/calendar-event/business/ports/events.gateway'

export class InMemoryEventsGateway implements EventsGateway {
    public events: CalendarEvent[] = []
    public error: boolean = false

    async retrieveEvents(): Promise<CalendarEvent[]> {
        if (this.error) throw new EventsError('an events error')
        return this.events
    }
}
