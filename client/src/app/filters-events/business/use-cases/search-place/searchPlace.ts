import { PlacesGateway } from '@/app/filters-events/business/ports/places.gateway'

export type PlacesSearchCommand = {
    search: string
}
export const searchPlaces =
    ({ placesGateway }: { placesGateway: PlacesGateway }) =>
    async (command: PlacesSearchCommand): Promise<SearchPlace[]> => {
        return await placesGateway.searchBy(command)
    }

export type SearchPlace = {
    country: string
    city: string
    latLon: { lat: number; lon: number }
}
