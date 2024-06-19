import { SearchPlace } from '@/app/geolocation/business/models/search-place'
import { LocationsGateway } from '@/app/geolocation/business/ports/locations.gateway'

export type PlacesSearchCommand = {
    search: string
}
export const searchPlaces =
    ({ locationsGateway }: { locationsGateway: LocationsGateway }) =>
    async (command: PlacesSearchCommand): Promise<SearchPlace[]> => {
        return await locationsGateway.searchBy(command)
    }
