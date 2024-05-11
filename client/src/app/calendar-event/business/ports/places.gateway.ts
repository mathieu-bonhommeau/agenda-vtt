import { PlacesSearchCommand, SearchPlaces } from '@/app/calendar-event/business/use-case/search-place/search.places'

export interface PlacesGateway {
    searchBy(command: PlacesSearchCommand): Promise<SearchPlaces[]>
}
