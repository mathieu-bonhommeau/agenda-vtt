import { CalendarEvent } from '@/app/calendar-event/business/model/event'
import { EventsGateway } from '@/app/calendar-event/business/ports/events.gateway'

export class HttpEventsGateway implements EventsGateway {
    private readonly _url: string

    constructor(url: string) {
        this._url = url
    }

    retrieveEvents(): Promise<CalendarEvent[]> {
        return Promise.resolve([])
    }
}
