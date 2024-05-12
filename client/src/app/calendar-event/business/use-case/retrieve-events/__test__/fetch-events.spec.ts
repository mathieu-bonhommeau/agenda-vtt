import { ReduxStore, setupStore } from '@/app/_common/business/store/store'
import { CalendarEvent } from '@/app/calendar-event/business/models/event'
import { CalendarEventBuilder } from '@/app/calendar-event/business/use-case/retrieve-events/__test__/calendar-event-builder'
import { retrieveEvents } from '@/app/calendar-event/business/use-case/retrieve-events/retrieve-events'
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

            await sut.retrieveEvents({})

            expect(sut.events).toEqual(events)
        })

        it('retrieve nothing if events are not found', async () => {
            events = sut.buildDefaultEvents(0)
            sut.givenEvents(events)

            await sut.retrieveEvents({})

            expect(sut.events).toEqual([])
        })

        it('retrieve nothing if get events from api return an error', async () => {
            events = sut.buildDefaultEvents(4)
            sut.givenEvents(events)
            sut.setError()

            await sut.retrieveEvents({})

            expect(sut.events).toEqual([])
            expect(sut.error).toEqual('RETRIEVE_EVENTS_FAILED')
        })

        describe('filter events by date', () => {
            beforeEach(() => {
                events = [
                    sut.buildEvent({
                        id: 'b37d37e5-2691-4378-8066-6b8415f60d41',
                        startDate: new Date('2024-05-15').toDateString(),
                        endDate: new Date('2024-05-17').toDateString(),
                    }),
                    sut.buildEvent({
                        id: 'b37d37e5-2691-4378-8066-6b8415f60d42',
                        startDate: new Date('2024-05-25').toDateString(),
                        endDate: new Date('2024-05-27').toDateString(),
                    }),
                    sut.buildEvent({
                        id: 'b37d37e5-2691-4378-8066-6b8415f60d43',
                        startDate: new Date('2024-06-07').toDateString(),
                        endDate: new Date('2024-06-07').toDateString(),
                    }),
                    sut.buildEvent({
                        id: 'b37d37e5-2691-4378-8066-6b8415f60d44',
                        startDate: new Date('2024-06-02').toDateString(),
                        endDate: new Date('2024-06-04').toDateString(),
                    }),
                    sut.buildEvent({
                        id: 'b37d37e5-2691-4378-8066-6b8415f60d45',
                        startDate: new Date('2024-06-14').toDateString(),
                        endDate: new Date('2024-06-16').toDateString(),
                    }),
                ]
            })
            it('retrieve all events after a define date', async () => {
                sut.givenEvents(events)

                await sut.retrieveEvents({ startDate: new Date('2024-05-26').toDateString() })

                expect(sut.events).toEqual([events[1], events[2], events[3], events[4]])
            })

            it('retrieve events in a specific date range', async () => {
                sut.givenEvents(events)

                await sut.retrieveEvents({
                    startDate: new Date('2024-05-16').toDateString(),
                    endDate: new Date('2024-06-14').toDateString(),
                })

                expect(sut.events).toEqual([events[0], events[1], events[2], events[3]])
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

    buildEvent({ id, startDate, endDate }: { id: string; startDate: string; endDate: string }) {
        return new CalendarEventBuilder().setId(id).setStartDate(startDate).setEndDate(endDate).build()
    }

    givenEvents(events: CalendarEvent[]) {
        this._eventsGateway.events = events
    }

    async retrieveEvents({ startDate, endDate }: { startDate?: string; endDate?: string }) {
        await this._store.dispatch(retrieveEvents({ startDate, endDate }))
    }

    get events() {
        return this._store.getState().eventsState.events
    }

    get error() {
        return this._store.getState().eventsState.error
    }

    setError() {
        this._eventsGateway.error = true
    }
}
