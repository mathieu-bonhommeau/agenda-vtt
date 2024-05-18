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
    traces?: Trace[] // id des traces dispo sur l'api
    price?: Price[]
    equipments?: string[] //equipements obligatoire comme casque ou certification medical
    organizer?: EventOrganizer
}

export type CustomerType = 'all' | 'licensee' | 'noLicensee'

export type Price = {
    customerType: CustomerType
}

export type EventOrganizer = {
    name: string
    email: string
    phone: string
}
