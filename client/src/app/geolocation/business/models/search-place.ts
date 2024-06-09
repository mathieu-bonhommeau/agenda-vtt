import { LatLon } from '@/app/calendar-events/business/models/geolocation'
import { PlaceType } from '@/app/filters-events/business/models/filter'

export type SearchPlace = {
    type: PlaceType
    country: string
    county?: string
    city: string
    postcode?: string
    latLon: LatLon
    bbox: number[]
}
