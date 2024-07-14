import { RetrieveEvents } from '../retrieve.events'
import { CalendarEvent } from '../../../models/calendar.event'
import { arbitraryCalendarEvent } from '../../../../../_common/helpers/event-factories.helpers'
import { CalendarEventDataSource } from '../../../ports/calendar-event-data.source'

describe('Retrieve calendar events', () => {
    let sut: SUT

    beforeEach(() => {
        sut = new SUT()
    })

    it('retrieves all events without any filters', async () => {
        const expectedEvents = [
            arbitraryCalendarEvent({ id: 'calendar-event-1' }),
            arbitraryCalendarEvent({ id: 'calendar-event-2' }),
        ]
        sut.givenSomeEvents(expectedEvents)
        const events = await sut.retrieveEvents()

        expect(events).toEqual(expectedEvents)
    })
})

class SUT {
    private readonly _calendarEventDataSource: StubCalendarEventDataSource
    private readonly _retrieveEvents: RetrieveEvents

    constructor() {
        this._calendarEventDataSource = new StubCalendarEventDataSource()
        this._retrieveEvents = new RetrieveEvents({
            calendarEventDataSource: this._calendarEventDataSource,
        })
    }

    givenSomeEvents(events: CalendarEvent[]) {
        this._calendarEventDataSource.feedWith(events)
    }

    async retrieveEvents() {
        return this._retrieveEvents.retrieveEvents()
    }
}

class StubCalendarEventDataSource implements CalendarEventDataSource {
    private _calendarEvents: CalendarEvent[] = []

    async fetch(): Promise<CalendarEvent[]> {
        return this._calendarEvents
    }

    feedWith(events: CalendarEvent[]) {
        this._calendarEvents.push(...events)
    }
}
