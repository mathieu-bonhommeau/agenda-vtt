import { EventLocation } from '@/app/calendar-events/business/models/geolocation'
import { SearchPlace } from '@/app/geolocation/business/models/search-place'
import { FindByAddressCommand } from '@/app/geolocation/business/use-cases/find-locations-by-address/find-locations-by.address'
import { ReverseLatLonCommand } from '@/app/geolocation/business/use-cases/reverse-geocode/reverse.geocode'
import { PlacesSearchCommand } from '@/app/geolocation/business/use-cases/search-place/searchPlace'

export interface LocationsGateway {
    searchBy(command: PlacesSearchCommand): Promise<SearchPlace[]>
    findByAddress(command: FindByAddressCommand): Promise<EventLocation[]>
    reverseLatLon(command: ReverseLatLonCommand): Promise<EventLocation[]>
}
