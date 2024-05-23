import { ReduxStore, setupStore } from '@/app/_common/business/store/store'
import { CalendarEvent } from '@/app/calendar-events/business/models/event'
import { EventsState, eventsSlice } from '@/app/calendar-events/business/reducers/event-reducer'
import {
    CalendarEventBuilder,
    TraceBuilder,
} from '@/app/calendar-events/business/use-case/retrieve-events/__test__/calendar-event-builder'
import { retrieveEvents } from '@/app/calendar-events/business/use-case/retrieve-events/retrieve-events'
import {
    eventsErrorsVM,
    eventsLoadingVM,
    eventsReactBigCalendarVM,
    eventsVM,
} from '@/app/calendar-events/client/view-models/retrieve-events-view-model'

describe('An retrieve events VM', () => {
    let sut: SUT
    let events: CalendarEvent[]

    beforeEach(() => {
        sut = new SUT()
        events = [new CalendarEventBuilder().build()]
    })

    describe('Events for react big calendar VM generator', () => {
        it('not returns events initially', () => {
            expect(sut.eventsReactBigCalendarVM()).toEqual([])
        })

        it('returns events for react big calendar if events are retrieved', () => {
            sut.givenEvents(events)
            expect(sut.eventsReactBigCalendarVM()).toEqual(sut.transformEventsForReactBigCalendar(events))
        })
    })

    describe('Events VM generator', () => {
        it('not returns events initially', () => {
            expect(sut.eventsVM()).toEqual([])
        })

        it('returns events if events are retrieved', () => {
            sut.givenEvents(events)
            expect(sut.eventsVM()).toEqual(events)
        })

        it('returns events with traces which are ordered by difficulty', () => {
            const trace1 = new TraceBuilder()
                .setTraceColor('red')
                .setId('randomTrace1')
                .setPositiveElevation(450)
                .setDistance(50)
                .build()
            const trace2 = new TraceBuilder()
                .setTraceColor('green')
                .setId('randomTrace2')
                .setPositiveElevation(450)
                .setDistance(50)
                .build()
            const trace3 = new TraceBuilder()
                .setTraceColor('black')
                .setId('randomTrace3')
                .setPositiveElevation(450)
                .setDistance(50)
                .build()
            const trace4 = new TraceBuilder()
                .setTraceColor('blue')
                .setId('randomTrace4')
                .setPositiveElevation(450)
                .setDistance(50)
                .build()

            const eventsWithTraces = [new CalendarEventBuilder().setTraces([trace1, trace2, trace3, trace4]).build()]
            sut.givenEvents(eventsWithTraces)
            expect(sut.eventsVM()[0].traces).toEqual([trace2, trace4, trace1, trace3])
        })
    })

    describe('Event errors VM generator', () => {
        it('not returns errors initially', () => {
            expect(sut.eventsErrorsVM()).toEqual(null)
        })

        it('returns the error if an error occured', () => {
            sut.givenAnError()
            expect(sut.eventsErrorsVM()).toEqual('RETRIEVE_EVENTS_FAILED')
        })
    })

    describe('Event loading VM generator', () => {
        it('not loading initially', () => {
            expect(sut.eventsLoadingVM()).toEqual(false)
        })

        it('pending while events are retrieved', () => {
            sut.givenARetrieveActionInPending()
            expect(sut.eventsLoadingVM()).toBe(true)
        })
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

    eventsReactBigCalendarVM() {
        return eventsReactBigCalendarVM()(this.getState())
    }

    givenEvents(events: CalendarEvent[]) {
        this._store.dispatch(eventsSlice.actions.onEventsRetrieved(events))
    }

    givenAnError() {
        this._store.dispatch({
            type: retrieveEvents.rejected.type,
        })
    }

    givenARetrieveActionInPending() {
        this._store.dispatch({
            type: retrieveEvents.pending.type,
        })
    }

    eventsVM() {
        return eventsVM()(this.getState())
    }

    transformEventsForReactBigCalendar(events: CalendarEvent[]) {
        return events.map((event) => ({
            title: event.title,
            start: new Date(event.startDate),
            end: new Date(event.endDate),
        }))
    }

    eventsErrorsVM() {
        return eventsErrorsVM()(this.getState())
    }

    eventsLoadingVM() {
        return eventsLoadingVM()(this.getState())
    }
}
