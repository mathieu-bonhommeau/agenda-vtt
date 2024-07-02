import { addDays } from 'date-fns'
import {
    CalendarEvent,
    EventLocation,
    EventOrganizer,
    Trace,
} from '../../calendar-event/business/models/calendar.event'
import { v4 } from 'uuid'

export const arbitraryCalendarEvent = (overrides: Partial<CalendarEvent>): CalendarEvent => ({
    id: 'random-event-id',
    title: 'my title',
    description: 'my description',
    createdAt: new Date(),
    startDate: new Date(),
    endDate: addDays(new Date(), 2),
    eventLocation: arbitraryEventLocation({}),
    traces: [arbitraryTrace({})],
    prices: [{ id: v4(), price: '5€ pour les enfants' }],
    organizer: arbitraryEventOrganizer({}),
    ...overrides,
})
export const arbitraryEventLocation = (overrides: Partial<EventLocation>): EventLocation => ({
    id: v4(),
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
    id: v4(),
    name: 'john doe',
    email: 'john@doe.com',
    website: 'https://johndoe.com',
    contacts: [{ id: v4(), name: 'contact-1', phone: '0251565458' }],
    ...overrides,
})
