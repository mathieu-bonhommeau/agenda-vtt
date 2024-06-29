import { CalendarEventGateway } from '../../ports/calendar-event.gateway'
import { CalendarEvent } from '../../models/calendar.event'

export class RetrieveEvents {
    private _calendarEventGateway: CalendarEventGateway

    constructor({ calendarEventGateway }: { calendarEventGateway: CalendarEventGateway }) {
        this._calendarEventGateway = calendarEventGateway
    }

    async execute(): Promise<CalendarEvent[]> {
        return this._calendarEventGateway.retrieveEvents()
    }
}
