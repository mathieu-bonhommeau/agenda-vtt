import { ReduxStore, setupStore } from '@/app/_common/business/store/store'
import { PlacesGateway } from '@/app/calendar-event/business/ports/places.gateway'
import {
    PlacesSearchCommand,
    SearchPlaces,
    searchPlaces,
} from '@/app/calendar-event/business/use-case/search-place/search.places'

describe('Search place', () => {
    let sut: SUT
    let searchPlaces: SearchPlaces[]

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

        const locations = await sut.searchPlaces(searchPlaces[0].city!)

        expect(locations).toEqual([searchPlaces[0]])
    })
})

class SUT {
    private readonly _placesGateway: StubPlacesGateway
    private readonly _store: ReduxStore

    constructor() {
        this._placesGateway = new StubPlacesGateway()
        this._store = setupStore({
            placesGateway: this._placesGateway,
        })
    }

    givenPlaces(searchPlaces: SearchPlaces[]) {
        this._placesGateway.searchPlaces = searchPlaces
    }

    async searchPlaces(search: string) {
        return await searchPlaces({
            placesGateway: this._placesGateway,
        })({ search })
    }
}

class StubPlacesGateway implements PlacesGateway {
    public searchPlaces: SearchPlaces[] = []

    async searchBy(command: PlacesSearchCommand): Promise<SearchPlaces[]> {
        return this.searchPlaces.filter((searchPlace) => command.search === searchPlace.city) || null
    }
}

const searchPlaceFactory = (overrides: Partial<SearchPlaces> = {}): SearchPlaces => ({
    ...defaultLocation(),
    ...overrides,
})

const defaultLocation = (): SearchPlaces => ({
    latLon: { lat: 0, lon: 0 },
    country: 'France',
    city: 'Arbitrary',
})
