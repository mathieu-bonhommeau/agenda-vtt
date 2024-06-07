import { CalendarEvent, EventOrganizer, EventPrice } from '@/app/calendar-events/business/models/event'
import { EventLocation } from '@/app/calendar-events/business/models/geolocation'
import { NewEventDraft } from '@/app/calendar-events/business/reducers/new-event-reducer'
import { Trace } from '@/app/traces/business/models/trace'

export type NewCalendarEvent = {
    id: string
    title: string
    description?: string
    startDate: string
    endDate: string
    eventLocation: EventLocation
    traces: Trace[]
    price?: EventPrice[]
    services?: string[]
    organizer: EventOrganizer
}
export const toNewEventFromDraft = ({
    draft,
    eventId,
    tracesIds,
}: {
    draft: NewEventDraft
    eventId: string
    tracesIds: string[]
}): NewCalendarEvent => ({
    id: eventId,
    title: draft.title!,
    description: draft.description || '',
    startDate: draft.startDate!,
    endDate: draft.endDate!,
    eventLocation: {
        country: draft.eventLocation!.country,
        region: draft.eventLocation!.region,
        county: draft.eventLocation!.county,
        city: draft.eventLocation!.city,
        postcode: draft.eventLocation!.postcode,
        address: draft.eventLocation!.address,
        latLon: { lon: draft.eventLocation!.latLon.lon, lat: draft.eventLocation!.latLon.lat },
    },
    traces: draft.traces!.map((trace, index) => ({
        id: tracesIds[index],
        utagawaId: trace.utagawaId,
        link: trace.link,
        distance: trace.distance!,
        positiveElevation: trace.positiveElevation,
        traceColor: trace.traceColor,
    })),
    price: draft.price,
    services: draft.services,
    organizer: {
        name: draft.organizer!.name,
        email: draft.organizer!.email,
        website: draft.organizer!.website,
        contacts: draft.organizer!.contacts?.map((contact, index) => ({
            name: contact.name,
            phone: contact.phone,
        })),
    },
})
export const toCalendarEventFromNewCalendarEvent = (newEvent: NewCalendarEvent, now: () => Date): CalendarEvent => ({
    ...newEvent,
    createdAt: now().toLocaleDateString(),
})
