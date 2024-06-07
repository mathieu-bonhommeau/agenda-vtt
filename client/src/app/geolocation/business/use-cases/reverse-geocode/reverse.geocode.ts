import { LatLon } from '@/app/calendar-events/business/models/geolocation'
import { LocationsGateway } from '@/app/geolocation/business/ports/locations.gateway'

export type ReverseLatLonCommand = {
    latLon: LatLon
}
export const reverseGeocode =
    ({ locationsGateway }: { locationsGateway: LocationsGateway }) =>
    (command: ReverseLatLonCommand) => {
        return locationsGateway.reverseLatLon(command)
    }
