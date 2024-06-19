import { CalendarEvent } from '@/app/calendar-events/business/models/event'
import {
    NewCalendarEvent,
    toCalendarEventFromNewCalendarEvent,
} from '@/app/calendar-events/business/models/new-calendar.event'
import { EventCreationRepository } from '@/app/calendar-events/business/ports/event-creation.repository'

export class InMemoryEventCreationRepository implements EventCreationRepository {
    private _eventsJustCreated: CalendarEvent[] = []

    constructor(private readonly now: () => Date) {}
    async saveNewEvent(newEvent: NewCalendarEvent): Promise<void> {
        this._eventsJustCreated.push(toCalendarEventFromNewCalendarEvent(newEvent, this.now))
    }

    get eventsJustCreated() {
        return this._eventsJustCreated
    }
}
