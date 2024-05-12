import { PlacesGateway } from '@/app/filters-events/business/ports/places.gateway'
import { PlacesSearchCommand, SearchPlace } from '@/app/filters-events/business/use-cases/search-place/searchPlace'
import axios from 'axios'

export const SEARCH_LOCALITY_ENDPOINT = `https://nominatim.openstreetmap.org/search`

export class NominatimPlacesGateway implements PlacesGateway {
    async searchBy(command: PlacesSearchCommand): Promise<SearchPlace[]> {
        const params = `?format=json&q=${command.search}&addressdetails=1&countrycodes=FR&featureType=city`
        try {
            const response = await axios.get<NominatimResponse>(SEARCH_LOCALITY_ENDPOINT + params)
            return response.data
                .filter(
                    (location) =>
                        location.address['country'] === 'France' &&
                        (location.address['village'] || location.address['city']),
                )
                .map((location) => ({
                    country: location.address['country']!,
                    city: (location.address['village'] || location.address['city'])!,
                    postalCode: location.address['postCode'] || '',
                    latLon: { lat: location.lat, lon: location.lon },
                }))
        } catch (e) {
            console.error(e)
            return []
        }
    }
}

type NominatimResponse = Array<{
    address: {
        country?: string
        city?: string
        village?: string
        postCode?: string
    }
    lat: number
    lon: number
}>
