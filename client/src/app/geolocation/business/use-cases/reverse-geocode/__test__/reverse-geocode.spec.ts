import { EventLocation, LatLon } from '@/app/calendar-events/business/models/geolocation'
import { StubLocationsGateway } from '@/app/geolocation/business/use-cases/__test__/doubles/stub-locations.gateway'
import { reverseGeocode } from '@/app/geolocation/business/use-cases/reverse-geocode/reverse.geocode'

describe('Find locations by lat lon', () => {
    let sut: SUT

    beforeEach(() => {
        sut = new SUT()
    })

    it('should return all geolocation data from lat/lon', async () => {
        sut.givenFullGeolocation(defaultLocations())

        const locations = await sut.reverseLatLon({ lon: 1.2, lat: 1.2 })

        expect(locations).toEqual([defaultLocations()[0], defaultLocations()[1]])
    })

    it('should return an empty array if any lat/lon matched', async () => {
        sut.givenFullGeolocation(defaultLocations())

        const locations = await sut.reverseLatLon({ lon: 3, lat: 3 })

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

    async reverseLatLon(latLon: LatLon) {
        return reverseGeocode({ locationsGateway: this._locationGateway })({ latLon })
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
        latLon: { lat: 1.2, lon: 1.2 },
        region: 'Pays de la Loire',
        county: 'Vendée',
        postcode: '85000',
        country: 'France',
        city: 'La Roche sur Yon',
        address: '165 allée de la Mairie',
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
