import { RetrieveEvents } from '../retrieve.events'
import { CalendarEventGateway } from '../../../ports/calendar-event.gateway'
import { CalendarEvent } from '../../../models/calendar.event'
import { arbitraryCalendarEvent } from '../../../../../_common/helpers/event-factories.helpers'

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
    private readonly _calendarEventGateway: StubCalendarEventGateway
    private readonly _retrieveEvents: RetrieveEvents

    constructor() {
        this._calendarEventGateway = new StubCalendarEventGateway()
        this._retrieveEvents = new RetrieveEvents({
            calendarEventGateway: this._calendarEventGateway,
        })
    }

    givenSomeEvents(events: CalendarEvent[]) {
        this._calendarEventGateway.feedWith(events)
    }

    async retrieveEvents() {
        return this._retrieveEvents.execute()
    }
}

class StubCalendarEventGateway implements CalendarEventGateway {
    private _calendarEvents: CalendarEvent[] = []

    async retrieveEvents(): Promise<CalendarEvent[]> {
        return this._calendarEvents
    }

    feedWith(events: CalendarEvent[]) {
        this._calendarEvents.push(...events)
    }
}
