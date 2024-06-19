import { EventLocation } from '@/app/calendar-events/business/models/geolocation'
import { AddressType, PlaceType } from '@/app/filters-events/business/models/filter'
import { SearchPlace } from '@/app/geolocation/business/models/search-place'
import { LocationsGateway } from '@/app/geolocation/business/ports/locations.gateway'
import { FindByAddressCommand } from '@/app/geolocation/business/use-cases/find-locations-by-address/find-locations-by.address'
import { ReverseLatLonCommand } from '@/app/geolocation/business/use-cases/reverse-geocode/reverse.geocode'
import { PlacesSearchCommand } from '@/app/geolocation/business/use-cases/search-place/searchPlace'
import axios from 'axios'

export const SEARCH_LOCALITY_ENDPOINT = `https://photon.komoot.io/`
export const ELIGIBLE_COUNTRIES = ['FR', 'ES', 'DE', 'CHE']

export class PhotonLocationsGateway implements LocationsGateway {
    async searchBy(command: PlacesSearchCommand): Promise<SearchPlace[]> {
        const params = `api?q=${command.search}&limit=100`
        try {
            const response = await axios.get<SearchByPhotonApiResponse>(SEARCH_LOCALITY_ENDPOINT + params)
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
                    const typeOrder = ['country', 'state', 'county', 'city']
                    const typeComparison = typeOrder.indexOf(a.type) - typeOrder.indexOf(b.type)
                    if (typeComparison !== 0) return typeComparison
                    return a.city.localeCompare(b.city)
                })
        } catch (e) {
            console.error(e)
            return []
        }
    }

    async findByAddress(command: FindByAddressCommand): Promise<EventLocation[]> {
        const params = `api?q=${command.address}&limit=100`
        try {
            const response = await axios.get<FindByAddressPhotonApiResponse>(SEARCH_LOCALITY_ENDPOINT + params)
            return response.data.features
                .filter(
                    (feature) =>
                        ELIGIBLE_COUNTRIES.includes(feature.properties['countrycode'] || '') &&
                        ['street', 'house'].includes(feature.properties?.type || ''),
                )
                .map((feature) => ({
                    country: feature.properties['country']!,
                    address:
                        feature.properties?.type === 'street'
                            ? feature.properties['name']!
                            : feature.properties['street']!,
                    housenumber: feature.properties['housenumber']!,
                    city: feature.properties['city']!,
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
        const params = `reverse?lon=${command.latLon.lon}&lat=${command.latLon.lat}&radius=50000&limit=10`
        try {
            const response = await axios.get<FindByGeocodePhotonApiResponse>(SEARCH_LOCALITY_ENDPOINT + params)
            return response.data.features
                .filter(
                    (feature) =>
                        ELIGIBLE_COUNTRIES.includes(feature.properties['countrycode'] || '') &&
                        ['street', 'house'].includes(feature.properties?.type || ''),
                )
                .map((feature) => ({
                    country: feature.properties['country']!,
                    address:
                        feature.properties?.type === 'street'
                            ? feature.properties['name']!
                            : feature.properties['street']!,
                    housenumber: feature.properties['housenumber']!,
                    city: feature.properties['city']!,
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
}

type SearchByPhotonApiResponse = {
    features: SearchByPhotonProperties[]
}

type SearchByPhotonProperties = {
    properties: {
        countrycode?: string
        county?: string
        state?: string
        postcode?: string
        name?: string
        country?: string
        type?: PlaceType
        extent?: number[]
    }
    geometry: {
        coordinates: number[]
    }
}

type FindByAddressPhotonApiResponse = {
    features: FindByAddressPhotonProperties[]
}

type FindByAddressPhotonProperties = {
    properties: {
        type?: AddressType
        countrycode?: string
        county?: string
        city?: string
        state?: string
        street?: string
        postcode?: string
        name?: string
        housenumber?: string
        country?: string
    }
    geometry: {
        coordinates: number[]
    }
}

type FindByGeocodePhotonApiResponse = {
    features: FindByGeocodePhotonProperties[]
}

type FindByGeocodePhotonProperties = {
    properties: {
        type?: AddressType
        countrycode?: string
        county?: string
        city?: string
        state?: string
        street?: string
        postcode?: string
        name?: string
        housenumber?: string
        country?: string
    }
    geometry: {
        coordinates: number[]
    }
}
