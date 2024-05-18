import { LatLon } from '@/app/calendar-events/business/models/geolocation'

export type SearchPlace = {
    country: string
    city: string
    postcode?: string
    latLon: LatLon
    bbox: number[]
}
export type EventsFilters = {
    startDate?: string
    endDate?: string
    place?: SearchPlace
    keyWord?: string
}
