import { ReduxStore, setupStore } from '@/app/_common/business/store/store'
import { CalendarEvent } from '@/app/calendar-event/business/model/event'
import { EventsState } from '@/app/calendar-event/business/reducer/event-reducer'
import { CalendarEventBuilder } from '@/app/calendar-event/business/use-case/__test__/calendar-event-builder'
import { retrieveEventsVM } from '@/app/calendar-event/client/view-model/retrieve-events-view-model'

describe('An retrieve events VM', () => {
    let sut: SUT
    let events: CalendarEvent[]

    beforeEach(() => {
        sut = new SUT()
        events = [new CalendarEventBuilder().build()]
    })

    it('Initial EventState', () => {
        expect(sut.retrieveEventsSelector()).toEqual({ events: [], loading: false, error: null })
    })

    it('retrieve EventsState', () => {
        const state = { events, loading: false, error: null }
        sut.setState(state)
        expect(sut.retrieveEventsSelector()).toEqual(state)
    })
})

class SUT {
    private _store: ReduxStore

    constructor() {
        this._store = setupStore({})
    }

    getState() {
        return this._store.getState()
    }

    setState(actionPayload: EventsState) {
        this._store.getState().eventsState = actionPayload
    }

    retrieveEventsSelector() {
        return retrieveEventsVM()(this.getState())
    }
}
