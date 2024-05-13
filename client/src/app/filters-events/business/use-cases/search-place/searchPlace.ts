import { SearchPlace } from '@/app/filters-events/business/models/filter'
import { PlacesGateway } from '@/app/filters-events/business/ports/places.gateway'

export type PlacesSearchCommand = {
    search: string
}
export const searchPlaces =
    ({ placesGateway }: { placesGateway: PlacesGateway }) =>
    async (command: PlacesSearchCommand): Promise<SearchPlace[]> => {
        return await placesGateway.searchBy(command)
    }
