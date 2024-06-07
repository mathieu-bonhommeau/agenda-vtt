import { ReduxStore, setupStore } from '@/app/_common/business/store/store'
import { MainDataPayload, newEventSlice } from '@/app/calendar-events/business/reducers/new-event-reducer'
import {
    newEventDraftCurrentStepVM,
    newEventDraftStepLengthVM,
} from '@/app/calendar-events/client/view-models/new-event-view-model'

describe('An retrieve events VM', () => {
    let sut: SUT
    let newEventMainData: MainDataPayload

    beforeEach(() => {
        sut = new SUT()
        newEventMainData = {
            title: 'my event',
            description: 'my description',
            startDate: new Date('2025-02-23').toDateString(),
            endDate: new Date('2025-02-24').toDateString(),
            eventLocation: {
                country: 'France',
                address: '150 place de l étoile',
                city: 'Paris',
                latLon: { lon: 1, lat: 1 },
            },
        }
    })

    it('returns the length of new event draft step', () => {
        sut.startEventCreation()

        expect(sut.stepLength).toEqual(1)
    })

    it('returns the current draft step', () => {
        sut.startEventCreation()
        sut.goToSecondStep(newEventMainData)

        expect(sut.currentStep).toEqual('TRACES')
    })
})

class SUT {
    private _store: ReduxStore

    constructor() {
        this._store = setupStore({})
    }

    startEventCreation() {
        this._store.dispatch(newEventSlice.actions.onStartEventCreation())
    }

    goToSecondStep(payload: MainDataPayload) {
        this._store.dispatch(newEventSlice.actions.onMainDataValidate(payload))
    }

    get stepLength() {
        return newEventDraftStepLengthVM(this._store.getState())
    }

    get currentStep() {
        return newEventDraftCurrentStepVM(this._store.getState())
    }
}
