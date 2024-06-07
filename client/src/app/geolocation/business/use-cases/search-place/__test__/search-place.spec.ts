import { ReduxStore, setupStore } from '@/app/_common/business/store/store'
import { SearchPlace } from '@/app/geolocation/business/models/search-place'
import { StubLocationsGateway } from '@/app/geolocation/business/use-cases/__test__/doubles/stub-locations.gateway'
import { searchPlaces } from '@/app/geolocation/business/use-cases/search-place/searchPlace'

describe('Search place', () => {
    let sut: SUT
    let searchPlaces: SearchPlace[]

    beforeEach(() => {
        sut = new SUT()
        searchPlaces = [
            searchPlaceFactory({ city: 'Paris' }),
            searchPlaceFactory({ city: 'Lyon' }),
            searchPlaceFactory(),
        ]
    })

    it('should return places based on user search', async () => {
        sut.givenPlaces(searchPlaces)

        const places = await sut.searchPlaces(searchPlaces[0].city!)

        expect(places).toEqual([searchPlaces[0]])
    })

    it('should not return places if no match is found with user input', async () => {
        sut.givenPlaces(searchPlaces)

        const places = await sut.searchPlaces('NoExistingCity')

        expect(places).toEqual([])
    })
})

class SUT {
    private readonly _placesGateway: StubLocationsGateway
    private readonly _store: ReduxStore

    constructor() {
        this._placesGateway = new StubLocationsGateway()
        this._store = setupStore({
            locationsGateway: this._placesGateway,
        })
    }

    givenPlaces(searchPlaces: SearchPlace[]) {
        this._placesGateway.searchPlaces = searchPlaces
    }

    async searchPlaces(search: string) {
        return await searchPlaces({
            locationsGateway: this._placesGateway,
        })({ search })
    }
}

const searchPlaceFactory = (overrides: Partial<SearchPlace> = {}): SearchPlace => ({
    ...defaultLocation(),
    ...overrides,
})

const defaultLocation = (): SearchPlace => ({
    latLon: { lat: 0, lon: 0 },
    postcode: '75000',
    country: 'France',
    city: 'Arbitrary',
    bbox: [0, 0, 0, 0],
    type: 'city',
})
