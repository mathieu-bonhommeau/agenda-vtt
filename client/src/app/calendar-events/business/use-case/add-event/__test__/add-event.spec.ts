import { ReduxStore, setupStore } from '@/app/_common/business/store/store'
import {
    AdditionalDataPayload,
    MainDataPayload,
    TracesDataPayload,
    newEventSlice,
} from '@/app/calendar-events/business/reducers/new-event-reducer'
describe('Add event', () => {
    let sut: SUT
    let newEventMainData: MainDataPayload
    let newEventTracesData: TracesDataPayload
    let newEventAdditionalData: AdditionalDataPayload

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
        newEventTracesData = {
            traces: [
                {
                    utagawaId: '123456',
                    link: 'https://utagawavtt.com/trace/123456',
                    distance: 20,
                    traceColor: 'blue',
                },
                {
                    utagawaId: '123457',
                    link: 'https://utagawavtt.com/trace/123457',
                    distance: 40,
                    positiveElevation: 1200,
                },
            ],
        }
        newEventAdditionalData = {
            prices: [{ price: 'Gratuit pour les - de 16 ans' }, { price: '10€' }],
            organizer: {
                name: 'VTT des Landes',
                email: 'vtt-landes@gmail.com',
                website: 'https://vtt-landes.com',
                contacts: [{ name: 'jean dupond', phone: '0645635212' }],
            },
        }
    })

    it('has no step initially, the creation is not started', async () => {
        expect(sut.eventCreationStep).toEqual([])
        expect(sut.draft).toEqual({})
    })

    it('starts the event creation by the first step', async () => {
        sut.startEventCreation()

        expect(sut.eventCreationStep).toEqual(['MAIN_DATA'])
        expect(sut.draft).toEqual({})
    })

    it('continues with the next step to add traces data', async () => {
        sut.startEventCreation()
        sut.goToSecondStep(newEventMainData)

        expect(sut.eventCreationStep).toEqual(['MAIN_DATA', 'TRACES'])
        expect(sut.draft).toEqual(newEventMainData)
    })

    it('continues with the next step to add additional data', async () => {
        sut.startEventCreation()
        sut.goToSecondStep(newEventMainData)
        sut.goToThirdStep(newEventTracesData)

        expect(sut.eventCreationStep).toEqual(['MAIN_DATA', 'TRACES', 'ADDITIONAL_DATA'])
        expect(sut.draft).toEqual({ ...newEventMainData, ...newEventTracesData })
    })

    it('continues with the next step to check with the overview', async () => {
        sut.startEventCreation()
        sut.goToSecondStep(newEventMainData)
        sut.goToThirdStep(newEventTracesData)
        sut.goToOverviewStep(newEventAdditionalData)

        expect(sut.eventCreationStep).toEqual(['MAIN_DATA', 'TRACES', 'ADDITIONAL_DATA', 'OVERVIEW'])
        expect(sut.draft).toEqual({ ...newEventMainData, ...newEventTracesData, ...newEventAdditionalData })
    })

    it('saves the new event and reset the draft if creation success', async () => {
        sut.startEventCreation()
        sut.goToSecondStep(newEventMainData)
        sut.goToThirdStep(newEventTracesData)
        sut.goToOverviewStep(newEventAdditionalData)
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

    goToThirdStep(payload: TracesDataPayload) {
        this._store.dispatch(newEventSlice.actions.onTracesDataValidate(payload))
    }

    goToOverviewStep(payload: AdditionalDataPayload) {
        this._store.dispatch(newEventSlice.actions.onAdditionalDataValidate(payload))
    }
    get eventCreationStep() {
        return this._store.getState().newEventState.steps
    }

    get draft() {
        return this._store.getState().newEventState.draft
    }
}
