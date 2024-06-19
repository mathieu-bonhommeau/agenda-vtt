import { EventLocation } from '@/app/calendar-events/business/models/geolocation'
import { StubLocationsGateway } from '@/app/geolocation/business/use-cases/__test__/doubles/stub-locations.gateway'
import { findLocationsByAddress } from '@/app/geolocation/business/use-cases/find-locations-by-address/find-locations-by.address'

describe('Find locations by address', () => {
    let sut: SUT

    beforeEach(() => {
        sut = new SUT()
    })

    it('should return all geolocation data from address', async () => {
        sut.givenFullGeolocation(defaultLocations())

        const locations = await sut.findLocationsByAddress('155 allée de la Mairie')

        expect(locations).toEqual([defaultLocations()[0], defaultLocations()[1]])
    })

    it('should return an empty array if any location matched', async () => {
        sut.givenFullGeolocation(defaultLocations())

        const locations = await sut.findLocationsByAddress(`3 rue de l'église`)

        expect(locations).toEqual([])
    })
})

class SUT {
    private readonly _locationGateway: StubLocationsGateway

    constructor() {
        this._locationGateway = new StubLocationsGateway()
    }
    givenFullGeolocation(locations: EventLocation[]) {
        this._locationGateway.fullLocations = locations
    }

    async findLocationsByAddress(address: string) {
        return findLocationsByAddress({ locationsGateway: this._locationGateway })({ address })
    }
}

const defaultLocations = (): EventLocation[] => [
    {
        latLon: { lat: 1.2, lon: 1.2 },
        region: 'Nouvelle Aquitaine',
        county: 'Landes',
        postcode: '75000',
        country: 'France',
        city: 'Dax',
        address: '155 allée de la Mairie',
    },
    {
        latLon: { lat: 1.4, lon: 1.4 },
        region: 'Pays de la Loire',
        county: 'Vendée',
        postcode: '85000',
        country: 'France',
        city: 'La Roche sur Yon',
        address: '155 allée de la Mairie',
    },
    {
        latLon: { lat: 2, lon: 2 },
        region: 'Pays de la Loire',
        county: 'Vendée',
        postcode: '85000',
        country: 'France',
        city: 'La Roche sur Yon',
        address: '155 allée des chasseurs',
    },
]
