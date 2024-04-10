import { setupStore } from '@/app/_common/store/store'
import { CalendarEvent } from '@/app/calendar-event/business/model/event'
import { retrieveEvents } from '@/app/calendar-event/business/use-case/retrieve-events'

describe('Fetch events', () => {
    let sut: SUT

    beforeEach(() => {
        sut = new SUT()
    })

    it('at the beginning, no events are fetched', async () => {})
})

class SUT {
    private _store: ReturnType<typeof setupStore>
    private _eventsGateway: InMemoryEventsGateway

    constructor() {
        this._eventsGateway = new InMemoryEventsGateway()
        this._store = setupStore({ eventsGateway: this._eventsGateway })
    }

    givenEvents(events: CalendarEvent[]) {
        this._eventsGateway.events = events
    }

    retrieveEvents() {
        this._store.dispatch(retrieveEvents())
    }
}

export interface EventsGateway {
    retrieveEvents(): Promise<CalendarEvent[]>
}

export class InMemoryEventsGateway implements EventsGateway {
    public events: CalendarEvent[] = []

    async retrieveEvents(): Promise<CalendarEvent[]> {
        return this.events
    }
}
