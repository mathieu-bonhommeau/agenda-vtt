import { EventLocation } from '@/app/calendar-events/business/models/geolocation'
import { Trace } from '@/app/traces/business/models/trace'

export type CalendarEvent = {
    id: string
    title: string
    description?: string
    createdAt: string
    startDate: string
    endDate: string
    eventLocation: EventLocation
    traces: Trace[]
    price?: EventPrice[]
    services?: string[]
    organizer: EventOrganizer
}

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
