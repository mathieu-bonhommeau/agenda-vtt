import { ReduxStore, setupStore } from '@/app/_common/business/store/store'
import { CalendarEvent } from '@/app/calendar-event/business/model/event'
import { CalendarEventBuilder } from '@/app/calendar-event/business/use-case/__test__/calendar-event-builder'
import { retrieveEvents } from '@/app/calendar-event/business/use-case/retrieve-events'
import { InMemoryEventsGateway } from '@/app/calendar-event/infrastructure/in-memory-events.gateway'

describe('Fetch events', () => {
    let sut: SUT
    let events: CalendarEvent[] = []

    beforeEach(() => {
        sut = new SUT()
    })

    describe('Dispatch action for retrieve events', () => {
        it('retrieve calendar events', async () => {
            events = sut.buildDefaultEvents(4)
            sut.givenEvents(events)

            await sut.retrieveEvents()

            expect(sut.eventsFromStore()).toEqual({ events, loading: false, error: null })
        })

        it('retrieve nothing if events are not found', async () => {
            events = sut.buildDefaultEvents(0)
            sut.givenEvents(events)

            await sut.retrieveEvents()

            expect(sut.eventsFromStore()).toEqual({ events: [], loading: false, error: null })
        })

        it('retrieve nothing if get events from api return an error', async () => {
            events = sut.buildDefaultEvents(4)
            sut.givenEvents(events)
            sut.setError()

            await sut.retrieveEvents()

            expect(sut.eventsFromStore()).toEqual({
                events: [],
                loading: false,
                error: 'RETRIEVE_EVENTS_FAILED',
            })
        })

        it('waiting if retrieve event is in pending', async () => {
            events = sut.buildDefaultEvents(4)
            sut.givenEvents(events)

            await sut.retrieveEvents()

            expect(sut.eventsFromStore()).toEqual({
                events: [],
                loading: true,
                error: null,
            })
        })

        describe('filter events by date', () => {
            it('retrieve all events after a define date', async () => {
                const events = [
                    sut.buildEvent({
                        startDate: new Date('2024-05-15').toDateString(),
                        endDate: new Date('2024-05-17').toDateString(),
                    }),
                    sut.buildEvent({
                        startDate: new Date('2024-05-25').toDateString(),
                        endDate: new Date('2024-05-27').toDateString(),
                    }),
                    sut.buildEvent({
                        startDate: new Date('2024-06-02').toDateString(),
                        endDate: new Date('2024-06-04').toDateString(),
                    }),
                    sut.buildEvent({
                        startDate: new Date('2024-06-14').toDateString(),
                        endDate: new Date('2024-06-16').toDateString(),
                    }),
                ]

                sut.givenEvents(events)

                await sut.retrieveEvents({ startDate: new Date('2024-05-26') })
            })
        })
    })
})

class SUT {
    private _store: ReduxStore
    private _calendarEventBuilder: CalendarEventBuilder
    private readonly _eventsGateway: InMemoryEventsGateway

    constructor() {
        this._eventsGateway = new InMemoryEventsGateway()
        this._calendarEventBuilder = new CalendarEventBuilder()
        this._store = setupStore({ eventsGateway: this._eventsGateway })
    }

    buildDefaultEvents(count: number) {
        const events: CalendarEvent[] = []
        while (count--) {
            events.push(this._calendarEventBuilder.build())
        }
        return events
    }

    buildEvent({ startDate, endDate }: { startDate: string; endDate: string }) {
        return new CalendarEventBuilder().setStartDate(startDate).setEndDate(endDate).build()
    }

    givenEvents(events: CalendarEvent[]) {
        this._eventsGateway.events = events
    }

    async retrieveEvents({ startDate, endDate }: { startDate?: string; endDate?: string }) {
        await this._store.dispatch(retrieveEvents())
    }

    eventsFromStore() {
        return this._store.getState().eventsState
    }

    setError() {
        this._eventsGateway.error = true
    }
}
