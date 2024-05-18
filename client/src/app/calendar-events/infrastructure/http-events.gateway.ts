import { CalendarEvent } from '@/app/calendar-events/business/models/event'
import { EventsGateway } from '@/app/calendar-events/business/ports/events.gateway'

export class HttpEventsGateway implements EventsGateway {
    private readonly _url: string

    constructor(url: string) {
        this._url = url
    }

    retrieveEvents(): Promise<CalendarEvent[]> {
        return Promise.resolve([])
    }
}
