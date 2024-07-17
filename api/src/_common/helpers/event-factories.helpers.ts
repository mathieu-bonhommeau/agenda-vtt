import { addDays } from 'date-fns'
import {
    CalendarEvent,
    Contact,
    EventLocation,
    EventOrganizer,
    Trace,
} from '../../calendar-event/business/models/calendar.event'
import { v4 } from 'uuid'

export const arbitraryCalendarEvent = (overrides: Partial<CalendarEvent>): CalendarEvent => ({
    id: v4(),
    title: 'my title',
    description: 'my description',
    createdAt: new Date(),
    startDate: new Date(),
    endDate: addDays(new Date(), 2),
    eventLocation: arbitraryEventLocation({}),
    traces: [arbitraryTrace({})],
    prices: ['5€ pour les enfants'],
    services: ['Parking, Station de lavage'],
    organizer: arbitraryEventOrganizer({}),
    ...overrides,
})
export const arbitraryEventLocation = (overrides: Partial<EventLocation>): EventLocation => ({
    id: v4(),
    country: 'France',
    region: 'Nouvelle Aquitaine',
    housenumber: '125',
    county: 'Aquitaine',
    postcode: '40330',
    city: 'Paris',
    address: 'rue de la paix',
    latLon: { lat: 0, lon: 0 },
    ...overrides,
})
export const arbitraryTrace = (overrides: Partial<Trace>): Trace => ({
    id: v4(),
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
    contacts: [arbitraryContact({})],
    ...overrides,
})

export const arbitraryContact = (overrides: Partial<Contact>): Contact => ({
    name: 'john doe',
    phone: '0675452636',
    ...overrides,
})
