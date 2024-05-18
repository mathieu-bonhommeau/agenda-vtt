import { SearchPlace } from '@/app/filters-events/business/models/filter'
import { PlacesSearchCommand } from '@/app/filters-events/business/use-cases/search-place/searchPlace'

export interface PlacesGateway {
    searchBy(command: PlacesSearchCommand): Promise<SearchPlace[]>
}
