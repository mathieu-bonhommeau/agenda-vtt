import { ReduxStore, setupStore } from '@/app/_common/business/store/store'
import { SearchPlace } from '@/app/filters-events/business/models/filter'
import { PlacesGateway } from '@/app/filters-events/business/ports/places.gateway'
import { PlacesSearchCommand, searchPlaces } from '@/app/filters-events/business/use-cases/search-place/searchPlace'

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
    private readonly _placesGateway: StubPlacesGateway
    private readonly _store: ReduxStore

    constructor() {
        this._placesGateway = new StubPlacesGateway()
        this._store = setupStore({
            placesGateway: this._placesGateway,
        })
    }

    givenPlaces(searchPlaces: SearchPlace[]) {
        this._placesGateway.searchPlaces = searchPlaces
    }

    async searchPlaces(search: string) {
        return await searchPlaces({
            placesGateway: this._placesGateway,
        })({ search })
    }
}

class StubPlacesGateway implements PlacesGateway {
    public searchPlaces: SearchPlace[] = []

    async searchBy(command: PlacesSearchCommand): Promise<SearchPlace[]> {
        return this.searchPlaces.filter((searchPlace) => command.search === searchPlace.city) || null
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
})
