import { PlacesSearchCommand, SearchPlace } from '@/app/filters-events/business/use-cases/search-place/searchPlace'

export interface PlacesGateway {
    searchBy(command: PlacesSearchCommand): Promise<SearchPlace[]>
}
