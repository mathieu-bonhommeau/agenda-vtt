import { CalendarEvent, EventLocation, EventOrganizer, Trace } from '../../../business/models/calendar.event'
import { NewCalendarEventCommand } from '../../../business/use-cases/add-event/add-events'

export const toCalendarEventFromResponseBodyDto = (bodyItem: unknown): CalendarEvent => ({
    id: bodyItem['id'],
    title: bodyItem['title'],
    description: bodyItem['description'],
    eventLocation: bodyItem['eventLocation'],
    traces: bodyItem['traces'],
    prices: bodyItem['prices'],
    services: bodyItem['services'],
    organizer: bodyItem['organizer'],
    createdAt: new Date(bodyItem['createdAt']),
    startDate: new Date(bodyItem['startDate']),
    endDate: new Date(bodyItem['endDate']),
})

export const toCalendarEventFromNewCalendarEventCommand =
    (currentDate: Date) =>
    (command: NewCalendarEventCommand): CalendarEvent => ({
        id: command.id,
        title: command.title,
        description: command.description,
        createdAt: currentDate,
        eventLocation: toEventLocationFromNewEventLocation(command.eventLocation),
        traces: command.traces.map((t) => toTracesFromNewTraces(t)),
        prices: command.price,
        services: command.services,
        organizer: toEventOrganizerFromNewEventOrganizer(command.organizer),
        startDate: new Date(command.startDate),
        endDate: new Date(command.endDate),
    })

export const toTracesFromNewTraces = (trace: Trace): Trace => ({
    id: trace.id,
    utagawaId: trace.utagawaId || null,
    link: trace.link || null,
    distance: trace.distance,
    positiveElevation: trace.positiveElevation || null,
    traceColor: trace.traceColor || null,
})

export const toEventLocationFromNewEventLocation = (eventLocation: EventLocation): EventLocation => ({
    id: eventLocation.id,
    country: eventLocation.country,
    region: eventLocation.region || null,
    county: eventLocation.county || null,
    city: eventLocation.city,
    postcode: eventLocation.postcode || null,
    housenumber: eventLocation.housenumber || null,
    address: eventLocation.address,
    latLon: eventLocation.latLon,
})

export const toEventOrganizerFromNewEventOrganizer = (organizer: EventOrganizer): EventOrganizer => ({
    id: organizer.id,
    name: organizer.name,
    email: organizer.email,
    website: organizer.website || null,
    contacts: organizer.contacts || null,
})
