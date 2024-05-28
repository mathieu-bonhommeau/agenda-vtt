import { LatLon } from '@/app/calendar-events/business/models/geolocation'

export type PlaceType = 'country' | 'state' | 'county' | 'city'

export type SearchPlace = {
    type: PlaceType
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
    distanceMin?: number
    distanceMax?: number
    sortBy?: 'location' | 'date'
}
