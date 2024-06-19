import { EventLocation } from '@/app/calendar-events/business/models/geolocation'
import { SearchPlace } from '@/app/geolocation/business/models/search-place'
import { LocationsGateway } from '@/app/geolocation/business/ports/locations.gateway'
import { FindByAddressCommand } from '@/app/geolocation/business/use-cases/find-locations-by-address/find-locations-by.address'
import { ReverseLatLonCommand } from '@/app/geolocation/business/use-cases/reverse-geocode/reverse.geocode'
import { PlacesSearchCommand } from '@/app/geolocation/business/use-cases/search-place/searchPlace'

export class StubLocationsGateway implements LocationsGateway {
    public searchPlaces: SearchPlace[] = []
    public fullLocations: EventLocation[] = []

    async searchBy(command: PlacesSearchCommand): Promise<SearchPlace[]> {
        return this.searchPlaces.filter((searchPlace) => command.search === searchPlace.city) || null
    }

    async findByAddress(command: FindByAddressCommand): Promise<EventLocation[]> {
        return this.fullLocations.filter((location) => location.address === command.address)
    }

    async reverseLatLon(command: ReverseLatLonCommand): Promise<EventLocation[]> {
        return this.fullLocations.filter((location) => {
            return location.latLon.lat === command.latLon.lat && location.latLon.lon === command.latLon.lon
        })
    }
}
