import { PlacesGateway } from '@/app/filters-events/business/ports/places.gateway'
import { PlacesSearchCommand, SearchPlace } from '@/app/filters-events/business/use-cases/search-place/searchPlace'
import axios from 'axios'

export const SEARCH_LOCALITY_ENDPOINT = `https://photon.komoot.io/api/`
export const ELIGIBLE_COUNTRIES = ['FR', 'ES', 'DE', 'CHE']

export class NominatimPlacesGateway implements PlacesGateway {
    async searchBy(command: PlacesSearchCommand): Promise<SearchPlace[]> {
        const params = `?q=${command.search}&layer=city&limit=100`
        try {
            const response = await axios.get<PhotonApiResponse>(SEARCH_LOCALITY_ENDPOINT + params)

            return response.data.features
                .filter(
                    (feature) =>
                        ELIGIBLE_COUNTRIES.includes(feature.properties['countrycode'] || '') &&
                        feature.properties['type'] === 'city',
                )
                .map((feature) => ({
                    country: feature.properties['country']!,
                    city: feature.properties['name']!,
                    latLon: { lat: feature.geometry.coordinates[0], lon: feature.geometry.coordinates[1] },
                }))
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
        name?: string
        country?: string
        type?: string
    }
    geometry: {
        coordinates: number[]
    }
}
