import { EventLocation, EventOrganizer, Trace } from '../../models/calendar.event'
import { CalendarEventRepository } from '../../ports/calendar-event.repository'

export class AddCalendarEvent {
    private readonly _calendarEventRepository: CalendarEventRepository

    constructor({ calendarEventRepository }: { calendarEventRepository: CalendarEventRepository }) {
        this._calendarEventRepository = calendarEventRepository
    }

    async addNewEvent(event: NewCalendarEventCommand): Promise<void> {
        await this._calendarEventRepository.persist(event)
    }
}

export type NewCalendarEventCommand = {
    id: string
    title: string
    description?: string
    startDate: string
    endDate: string
    eventLocation: EventLocation
    traces: Trace[]
    price?: string[]
    services?: string[]
    organizer: EventOrganizer
}
