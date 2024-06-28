import { addDays } from 'date-fns'

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
    private _calendarEventGateway: StubCalendarEventGateway

    constructor() {
        this._calendarEventGateway = new StubCalendarEventGateway()
    }

    givenSomeEvents(events: CalendarEvent[]) {
        this._calendarEventGateway.feedWith(events)
    }
}

export interface CalendarEventGateway {
    retrieveEvents(): Promise<CalendarEvent[]>
}

class StubCalendarEventGateway implements CalendarEventGateway {
    private _calendarEvents: CalendarEvent[] = []

    async retrieveEvents(): Promise<CalendarEvent[]> {
        return Promise.resolve([])
    }

    feedWith(events: CalendarEvent[]) {
        this._calendarEvents.push(...events)
    }
}

export const arbitraryCalendarEvent = (overrides: Partial<CalendarEvent>): CalendarEvent => ({
    id: 'random-event-id',
    title: 'my title',
    description: 'my description',
    createdAt: new Date(),
    startDate: new Date(),
    endDate: addDays(new Date(), 2),
    eventLocation: arbitraryEventLocation({}),
    traces: [arbitraryTrace({})],
    prices: [{ price: '5€ pour les enfants' }],
    organizer: arbitraryEventOrganizer({}),
    ...overrides,
})

export const arbitraryEventLocation = (overrides: Partial<EventLocation>): EventLocation => ({
    country: 'France',
    city: 'Paris',
    address: 'rue de la paix',
    latLon: { lat: 0, lon: 0 },
    ...overrides,
})

export const arbitraryTrace = (overrides: Partial<Trace>): Trace => ({
    id: 'random-trace-id',
    utagawaId: 123456,
    link: 'https://utagawa.com/123456',
    distance: 40,
    positiveElevation: 300,
    traceColor: 'blue',
    ...overrides,
})

export const arbitraryEventOrganizer = (overrides: Partial<EventOrganizer>): EventOrganizer => ({
    name: 'john doe',
    email: 'john@doe.com',
    website: 'https://johndoe.com',
    contacts: [{ name: 'contact-1', phone: '0251565458' }],
    ...overrides,
})

export type CalendarEvent = {
    id: string
    title: string
    description: string
    createdAt: Date
    startDate: Date
    endDate: Date
    eventLocation: EventLocation
    traces: Trace[]
    prices?: EventPrice[]
    services?: string[]
    organizer: EventOrganizer
}

export type EventLocation = {
    country: string
    region?: string
    county?: string
    city: string
    postcode?: string
    housenumber?: string
    address: string
    latLon: LatLon
}

export type LatLon = {
    lat: number
    lon: number
}

export type Trace = {
    id: string
    utagawaId?: number
    link?: string
    distance: number
    positiveElevation?: number
    traceColor?: TraceColor | 'notDefined'
}
export type TraceColor = 'green' | 'blue' | 'red' | 'black'

export type EventPrice = {
    price: string
}

export type EventOrganizer = {
    name: string
    email: string
    website?: string
    contacts?: Contact[]
}

export type Contact = {
    name: string
    phone: string
}
