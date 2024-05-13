import { SearchPlace } from '@/app/filters-events/business/models/filter'
import { PlacesGateway } from '@/app/filters-events/business/ports/places.gateway'
import { PlacesSearchCommand } from '@/app/filters-events/business/use-cases/search-place/searchPlace'
import axios from 'axios'

export const SEARCH_LOCALITY_ENDPOINT = `https://photon.komoot.io/api/`
export const ELIGIBLE_COUNTRIES = ['FR', 'ES', 'DE', 'CHE']

export class PhotonPlacesGateway implements PlacesGateway {
    async searchBy(command: PlacesSearchCommand): Promise<SearchPlace[]> {
        const params = `?q=${command.search}&layer=city&limit=100`
        try {
            const response = await axios.get<PhotonApiResponse>(SEARCH_LOCALITY_ENDPOINT + params)

            console.log(response.data.features)

            return response.data.features
                .filter(
                    (feature) =>
                        ELIGIBLE_COUNTRIES.includes(feature.properties['countrycode'] || '') &&
                        feature.properties['type'] === 'city',
                )
                .map((feature) => ({
                    country: feature.properties['country']!,
                    city: feature.properties['name']!,
                    department: feature.properties['county']!,
                    region: feature.properties['state']!,
                    postcode: feature.properties['postcode']!,
                    latLon: { lat: feature.geometry.coordinates[0], lon: feature.geometry.coordinates[1] },
                    bbox: feature.properties['extent'],
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

type PhotonApiResponse = {
    features: PhotonProperties[]
}

type PhotonProperties = {
    properties: {
        countrycode?: string
        county?: string
        state?: string
        postcode?: string
        name?: string
        country?: string
        type?: string
        extent: number[]
    }
    geometry: {
        coordinates: number[]
    }
}
