import { setupStore } from '@/app/_common/store/store'
import { CalendarEvent } from '@/app/calendar-event/business/model/event'
import { CalendarEventBuilder } from '@/app/calendar-event/business/use-case/__test__/calendar-event-builder'
import { retrieveEvents } from '@/app/calendar-event/business/use-case/retrieve-events'

describe('Fetch events', () => {
    let sut: SUT
    let events: CalendarEvent[]

    beforeEach(() => {
        sut = new SUT()
    })

    it('at the beginning, no events are fetched', async () => {
        events = sut.buildDefaultEvents(4)
        sut.givenEvents(events)

        sut.retrieveEvents()

        expect(sut.eventsFromStore()).toEqual(events)
    })
})

class SUT {
    private _store: ReturnType<typeof setupStore>
    private _eventsGateway: InMemoryEventsGateway

    constructor() {
        this._eventsGateway = new InMemoryEventsGateway()
        this._store = setupStore({ eventsGateway: this._eventsGateway })
    }

    buildDefaultEvents(count: number) {
        const events: CalendarEvent[] = []
        while (--count) {
            events.push(this.buildEvent())
        }
        return events
    }

    buildEvent() {
        return new CalendarEventBuilder().build()
    }

    givenEvents(events: CalendarEvent[]) {
        this._eventsGateway.events = events
    }

    retrieveEvents() {
        this._store.dispatch(retrieveEvents())
    }

    eventsFromStore() {
        return this._store.getState().eventsReducer.events
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
