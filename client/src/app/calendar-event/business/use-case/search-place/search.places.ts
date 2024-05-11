import { PlacesGateway } from '@/app/calendar-event/business/ports/places.gateway'

export type PlacesSearchCommand = {
    search: string
}
export const searchPlaces =
    ({ placesGateway }: { placesGateway: PlacesGateway }) =>
    async (command: PlacesSearchCommand) => {
        return await placesGateway.searchBy(command)
    }

export type SearchPlaces = {
    country: string
    city: string
    latLon: { lat: number; lon: number }
}
