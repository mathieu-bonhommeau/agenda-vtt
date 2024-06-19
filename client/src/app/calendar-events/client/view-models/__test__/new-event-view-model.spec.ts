import { ReduxStore, setupStore } from '@/app/_common/business/store/store'
import {
    AdditionalDataPayload,
    MainDataPayload,
    TracesDataPayload,
    newEventSlice,
} from '@/app/calendar-events/business/reducers/new-event-reducer'
import {
    newEventDraftCurrentStepVM,
    newEventDraftStepLengthVM,
    overviewCalendarEventFromNewEventDraft,
} from '@/app/calendar-events/client/view-models/new-event-view-model'

describe('An retrieve events VM', () => {
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
                    id: 'random-id-1',
                    utagawaId: 123456,
                    link: 'https://utagawavtt.com/trace/123456',
                    distance: 20,
                    traceColor: 'blue',
                },
                {
                    id: 'random-id-2',
                    utagawaId: 123457,
                    link: 'https://utagawavtt.com/trace/123457',
                    distance: 40,
                    positiveElevation: 1200,
                },
            ],
        }
        newEventAdditionalData = {
            price: [{ price: 'Gratuit pour les - de 16 ans' }, { price: '10€' }],
            organizer: {
                name: 'VTT des Landes',
                email: 'vtt-landes@gmail.com',
                website: 'https://vtt-landes.com',
                contacts: [{ name: 'jean dupond', phone: '0645635212' }],
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

    it('returns a calendar event from new event draft', () => {
        sut.startEventCreation()
        sut.goToSecondStep(newEventMainData)
        sut.goToThirdStep(newEventTracesData)
        sut.goToOverviewStep(newEventAdditionalData)

        expect(sut.overviewCalendarEventFromNewEventDraft).toEqual({
            ...newEventMainData,
            ...newEventTracesData,
            ...newEventAdditionalData,
        })
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
        payload.traces?.forEach((trace) => this._store.dispatch(newEventSlice.actions.onAddTrace(trace)))
        this._store.dispatch(newEventSlice.actions.onTracesDataValidate())
    }

    goToOverviewStep(payload: AdditionalDataPayload) {
        payload.price!.forEach((price) => this._store.dispatch(newEventSlice.actions.onAddPrice(price)))
        this._store.dispatch(newEventSlice.actions.onAddOrganizer(payload.organizer))
        this._store.dispatch(newEventSlice.actions.onAdditionalDataValidate())
    }

    get stepLength() {
        return newEventDraftStepLengthVM(this._store.getState())
    }

    get currentStep() {
        return newEventDraftCurrentStepVM(this._store.getState())
    }

    get overviewCalendarEventFromNewEventDraft() {
        return overviewCalendarEventFromNewEventDraft(this._store.getState())
    }
}
