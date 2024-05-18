import { ReduxStore, setupStore } from '@/app/_common/business/store/store'
import { EventsFilters } from '@/app/filters-events/business/models/filter'
import { filtersSlice } from '@/app/filters-events/business/reducers/filters-reducers'
import { eventsFiltersVM } from '@/app/filters-events/client/view-models/filters-view-models'

describe('A filters VM generator', () => {
    let sut: SUT

    beforeEach(() => {
        sut = new SUT()
    })

    describe('Event filters VM generator', () => {
        it('returns events filters by default initially', () => {
            expect(sut.filtersEventsVM()).toEqual({
                startDate: new Date().toDateString(),
            })
        })

        it('returns events filters', () => {
            sut.givenFilters({
                startDate: new Date('2024-08-25').toDateString(),
                endDate: new Date('2024-08-30').toDateString(),
            })
            expect(sut.filtersEventsVM()).toEqual({
                startDate: new Date('2024-08-25').toDateString(),
                endDate: new Date('2024-08-30').toDateString(),
            })
        })
    })
})

class SUT {
    private _store: ReduxStore

    constructor() {
        this._store = setupStore({})
    }

    getState() {
        return this._store.getState()
    }

    givenFilters(filters: EventsFilters) {
        this._store.dispatch(filtersSlice.actions.onEventsFiltered(filters))
    }

    filtersEventsVM() {
        return eventsFiltersVM()(this.getState())
    }
}
