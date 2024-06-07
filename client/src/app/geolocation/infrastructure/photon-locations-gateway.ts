import { EventLocation } from '@/app/calendar-events/business/models/geolocation'
import { PlaceType } from '@/app/filters-events/business/models/filter'
import { SearchPlace } from '@/app/geolocation/business/models/search-place'
import { LocationsGateway } from '@/app/geolocation/business/ports/locations.gateway'
import { FindByAddressCommand } from '@/app/geolocation/business/use-cases/find-locations-by-address/find-locations-by.address'
import { ReverseLatLonCommand } from '@/app/geolocation/business/use-cases/reverse-geocode/reverse.geocode'
import { PlacesSearchCommand } from '@/app/geolocation/business/use-cases/search-place/searchPlace'
import axios from 'axios'

export const SEARCH_LOCALITY_ENDPOINT = `https://photon.komoot.io/api/`
export const ELIGIBLE_COUNTRIES = ['FR', 'ES', 'DE', 'CHE']

export class PhotonLocationsGateway implements LocationsGateway {
    async searchBy(command: PlacesSearchCommand): Promise<SearchPlace[]> {
        const params = `?q=${command.search}&limit=100`
        try {
            const response = await axios.get<PhotonApiResponse>(SEARCH_LOCALITY_ENDPOINT + params)
            return response.data.features
                .filter(
                    (feature) =>
                        ELIGIBLE_COUNTRIES.includes(feature.properties['countrycode'] || '') &&
                        ['city', 'state', 'county', 'country'].includes(feature.properties?.type || ''),
                )
                .map((feature) => ({
                    type: feature.properties['type']!,
                    country: feature.properties['country']!,
                    city: feature.properties['name']!,
                    county: feature.properties['county']!,
                    region: feature.properties['state']!,
                    postcode: feature.properties['postcode']!,
                    latLon: { lon: feature.geometry.coordinates[0], lat: feature.geometry.coordinates[1] },
                    bbox: feature.properties['extent']!,
                }))
                .sort((a, b) => {
                    if (a.city < b.city) return -1
                    if (a.city > b.city) return 1
                    return 0
                })
        } catch (e) {
            console.error(e)
            return []
        }
    }

    async findByAddress(command: FindByAddressCommand): Promise<EventLocation[]> {
        const params = `?q=${command.address}&limit=100`
        try {
            const response = await axios.get<PhotonApiResponse>(SEARCH_LOCALITY_ENDPOINT + params)
            return response.data.features
                .filter(
                    (feature) =>
                        ELIGIBLE_COUNTRIES.includes(feature.properties['countrycode'] || '') &&
                        ['street', 'housenumber'].includes(feature.properties?.type || ''),
                )
                .map((feature) => ({
                    type: feature.properties['type']!,
                    country: feature.properties['country']!,
                    address: feature.properties['street']!,
                    housenumber: feature.properties['housenumber']!,
                    city: feature.properties['name']!,
                    county: feature.properties['county']!,
                    region: feature.properties['state']!,
                    postcode: feature.properties['postcode']!,
                    latLon: { lon: feature.geometry.coordinates[0], lat: feature.geometry.coordinates[1] },
                }))
                .sort((a, b) => {
                    if (a.city < b.city) return -1
                    if (a.city > b.city) return 1
                    return 0
                })
        } catch (e) {
            console.error(e)
            return []
        }
    }

    async reverseLatLon(command: ReverseLatLonCommand): Promise<EventLocation[]> {
        return Promise.resolve([])
    }
}

type PhotonApiResponse = {
    features: PhotonProperties[]
}

type PhotonProperties = {
    properties: {
        countrycode?: string
        county?: string
        state?: string
        postcode?: string
        street?: string
        housenumber?: string
        name?: string
        country?: string
        type?: PlaceType
        extent?: number[]
    }
    geometry: {
        coordinates: number[]
    }
}
