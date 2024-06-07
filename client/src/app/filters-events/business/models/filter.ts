import { SearchPlace } from '@/app/geolocation/business/models/search-place'

export type PlaceType = 'country' | 'state' | 'county' | 'city'

export type EventsFilters = {
    startDate?: string
    endDate?: string
    place?: SearchPlace
    keyWord?: string
    distanceMin?: number
    distanceMax?: number
    sortBy?: 'location' | 'date'
}
