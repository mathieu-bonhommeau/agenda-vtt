import { CalendarEvent, Contact, EventLocation, EventOrganizer, Trace } from '../../business/models/calendar.event'
import { CalendarEventEntity } from '../../../_common/db/pg/entities/calendar-event.entity'
import { TraceEntity } from '../../../_common/db/pg/entities/trace.entity'
import { EventLocationEntity } from '../../../_common/db/pg/entities/event-location.entity'

export const toCalendarEventDbDTO = (event: CalendarEvent): CalendarEventEntity => ({
    id: event.id,
    title: event.title,
    description: event.description,
    createdAt: event.createdAt,
    startDate: event.startDate,
    endDate: event.endDate,
    traces: [],
    prices: event.prices,
    services: event.services,
})
export const toEventLocationDbDTO = (
    eventLocation: EventLocation,
    event: CalendarEventEntity,
): EventLocationEntity => ({
    id: eventLocation.id,
    country: eventLocation.country,
    region: eventLocation.region,
    county: eventLocation.county,
    city: eventLocation.city,
    postcode: eventLocation.postcode,
    housenumber: eventLocation.housenumber,
    address: eventLocation.address,
    geometry: {
        type: 'Point',
        coordinates: [eventLocation.latLon.lon, eventLocation.latLon.lat],
    },
    calendarEvents: [event],
})
export const toTraceDbDTO = (trace: Trace, calendarEvent: CalendarEventEntity): TraceEntity => ({
    id: trace.id,
    utagawaId: trace.utagawaId,
    link: trace.link,
    distance: trace.distance,
    positiveElevation: trace.positiveElevation,
    traceColor: trace.traceColor,
    calendarEvent,
})
export const toEventOrganizerDbDTO = (eventOrganizer: EventOrganizer) => ({
    id: eventOrganizer.id,
    name: eventOrganizer.name,
    email: eventOrganizer.email,
    website: eventOrganizer.website,
})
export const toContactDbDTO = (contact: Contact) => ({
    id: contact.id,
    name: contact.name,
    phone: contact.phone,
})