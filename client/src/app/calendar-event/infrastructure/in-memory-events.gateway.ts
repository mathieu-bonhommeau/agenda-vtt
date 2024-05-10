import { CalendarEvent } from '@/app/calendar-event/business/model/event'
import { EventsGateway } from '@/app/calendar-event/business/ports/events.gateway'
import { RetrieveEventsCommand } from '@/app/calendar-event/business/use-case/retrieve-events'

export class InMemoryEventsGateway implements EventsGateway {
    public events: CalendarEvent[] = []
    public error: boolean = false

    async retrieveEvents(command: RetrieveEventsCommand): Promise<CalendarEvent[]> {
        if (this.error) throw 'failed'
        if (command.startDate && command.endDate)
            return this.events.filter((event) => {
                return (
                    new Date(command.startDate!) <= new Date(event.endDate) &&
                    new Date(command.endDate!) >= new Date(event.endDate)
                )
            })
        if (command.startDate)
            return this.events.filter((event) => {
                return new Date(command.startDate!) <= new Date(event.endDate)
            })
        return this.events
    }
}
