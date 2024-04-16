import { EVENTS_ERROR, EventsError } from '@/app/_common/business/models/errors/events-error'
import { ReduxStore, setupStore } from '@/app/_common/business/store/store'
import { CalendarEvent } from '@/app/calendar-event/business/model/event'
import { CalendarEventBuilder } from '@/app/calendar-event/business/use-case/__test__/calendar-event-builder'
import { retrieveEvents } from '@/app/calendar-event/business/use-case/retrieve-events'

describe('Fetch events', () => {
    let sut: SUT
    let events: CalendarEvent[] = []

    beforeEach(() => {
        sut = new SUT()
    })

    describe('Dispatch action for retrieve events', () => {
        it('and get them from store after request is fullfilled', async () => {
            events = sut.buildDefaultEvents(4)
            sut.givenEvents(events)

            await sut.retrieveEvents()

            expect(sut.eventsFromStore()).toEqual({ events, loading: false, error: null })
        })

        it('and loading is true when request is in pending', () => {
            events = sut.buildDefaultEvents(4)
            sut.givenEvents(events)

            sut.retrieveEvents()

            expect(sut.eventsFromStore()).toEqual({ events: [], loading: true, error: null })
        })

        it('and errors are set when request is rejected', async () => {
            events = sut.buildDefaultEvents(4)
            sut.givenEvents(events)
            sut.setError()

            await sut.retrieveEvents()

            expect(sut.eventsFromStore()).toEqual({
                events: [],
                loading: false,
                error: { code: EVENTS_ERROR, message: 'an events error' },
            })
        })
    })
})

class SUT {
    private _store: ReduxStore
    private readonly _eventsGateway: InMemoryEventsGateway

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

    async retrieveEvents() {
        await this._store.dispatch(retrieveEvents())
    }

    eventsFromStore() {
        return this._store.getState().eventsState
    }

    setError() {
        this._eventsGateway.error = true
    }
}

export interface EventsGateway {
    retrieveEvents(): Promise<CalendarEvent[]>
}

export class InMemoryEventsGateway implements EventsGateway {
    public events: CalendarEvent[] = []
    public error: boolean = false

    async retrieveEvents(): Promise<CalendarEvent[]> {
        if (this.error) throw new EventsError('an events error')
        return this.events
    }
}
