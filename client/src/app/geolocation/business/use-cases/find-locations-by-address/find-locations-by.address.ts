import { LocationsGateway } from '@/app/geolocation/business/ports/locations.gateway'

export type FindByAddressCommand = {
    address: string
}
export const findLocationsByAddress =
    ({ locationsGateway }: { locationsGateway: LocationsGateway }) =>
    async (command: FindByAddressCommand) => {
        return locationsGateway.findByAddress(command)
    }
