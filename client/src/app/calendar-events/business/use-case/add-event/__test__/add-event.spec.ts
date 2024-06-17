import { ReduxStore, setupStore } from '@/app/_common/business/store/store'
import { CalendarEvent, EventOrganizer, EventPrice } from '@/app/calendar-events/business/models/event'
import {
    NewCalendarEvent,
    toCalendarEventFromNewCalendarEvent,
} from '@/app/calendar-events/business/models/new-calendar.event'
import { EventCreationRepository } from '@/app/calendar-events/business/ports/event-creation.repository'
import {
    AdditionalDataPayload,
    MainDataPayload,
    NewEventDraftSteps,
    TracesDataPayload,
    newEventSlice,
} from '@/app/calendar-events/business/reducers/new-event-reducer'
import { saveNewEvent } from '@/app/calendar-events/business/use-case/add-event/save-new.event'
import { Trace } from '@/app/traces/business/models/trace'

describe('Add event', () => {
    let sut: SUT
    let newEventMainData: MainDataPayload
    let newEventTracesData: TracesDataPayload
    let newEventAdditionalData: AdditionalDataPayload
    const now = () => new Date('2024-05-26')

    beforeEach(() => {
        sut = new SUT(now)
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

    it('add a new trace in draft', () => {
        sut.startEventCreation()
        sut.goToSecondStep(newEventMainData)

        sut.addTrace(newEventTracesData.traces![0])

        expect(sut.draft.traces).toEqual([newEventTracesData.traces![0]])
    })

    it(`remove a trace from draft`, () => {
        sut.startEventCreation()
        sut.goToSecondStep(newEventMainData)

        sut.addTrace(newEventTracesData.traces![0])
        sut.addTrace(newEventTracesData.traces![1])

        sut.deleteTrace('random-id-1')

        expect(sut.draft.traces).toEqual([newEventTracesData.traces![1]])
    })

    it('add a new price in draft', () => {
        sut.startEventCreation()
        sut.goToSecondStep(newEventMainData)
        sut.goToThirdStep(newEventTracesData)

        sut.addPrices([{ price: '10€ pour les adultes' }, { price: '5€ pour les enfants' }])

        expect(sut.draft.price).toEqual([{ price: '10€ pour les adultes' }, { price: '5€ pour les enfants' }])
    })

    it('remove a price from draft', () => {
        sut.startEventCreation()
        sut.goToSecondStep(newEventMainData)
        sut.goToThirdStep(newEventTracesData)

        sut.addPrices([{ price: '10€ pour les adultes' }, { price: '5€ pour les enfants' }])
        sut.removePrice(0)

        expect(sut.draft.price).toEqual([{ price: '5€ pour les enfants' }])
    })

    it('add a new organizer in draft', () => {
        sut.startEventCreation()
        sut.goToSecondStep(newEventMainData)
        sut.goToThirdStep(newEventTracesData)

        sut.addOrganizer({
            name: 'an organizer',
            email: 'organizer@gmail.com',
            contacts: [
                { name: 'john doe', phone: '+33 06 35 32 31 98' },
                { name: 'marc did', phone: '+33 06 35 32 31 99' },
            ],
        })

        expect(sut.draft.organizer).toEqual({
            name: 'an organizer',
            email: 'organizer@gmail.com',
            contacts: [
                { name: 'john doe', phone: '+33 06 35 32 31 98' },
                { name: 'marc did', phone: '+33 06 35 32 31 99' },
            ],
        })
    })

    it('remove an organizer contact in draft', () => {
        sut.startEventCreation()
        sut.goToSecondStep(newEventMainData)
        sut.goToThirdStep(newEventTracesData)

        sut.addOrganizer({
            name: 'an organizer',
            email: 'organizer@gmail.com',
            contacts: [
                { name: 'john doe', phone: '+33 06 35 32 31 98' },
                { name: 'marc did', phone: '+33 06 35 32 31 99' },
            ],
        })

        sut.removeContact(0)

        expect(sut.draft.organizer).toEqual({
            name: 'an organizer',
            email: 'organizer@gmail.com',
            contacts: [{ name: 'marc did', phone: '+33 06 35 32 31 99' }],
        })
    })

    it('continues with the next step to check with the overview', async () => {
        sut.startEventCreation()
        sut.goToSecondStep(newEventMainData)
        sut.goToThirdStep(newEventTracesData)
        sut.goToOverviewStep(newEventAdditionalData)

        expect(sut.eventCreationStep).toEqual(['MAIN_DATA', 'TRACES', 'ADDITIONAL_DATA', 'OVERVIEW'])
        expect(sut.draft).toEqual({ ...newEventMainData, ...newEventTracesData, ...newEventAdditionalData })
    })

    it('saves the new event and reset the draft if creation has been successful', async () => {
        sut.startEventCreation()
        sut.goToSecondStep(newEventMainData)
        sut.goToThirdStep(newEventTracesData)
        sut.goToOverviewStep(newEventAdditionalData)
        await sut.saveNewEvent()

        expect(sut.eventCreationStep).toEqual([])
        expect(sut.draft).toEqual({})
        expect(sut.eventJustCreated[0]).toEqual({
            ...newEventMainData,
            createdAt: now().toLocaleDateString(),
            traces: newEventTracesData.traces!.map((trace, index) => ({
                ...trace,
                id: 'random-id',
            })),
            ...newEventAdditionalData,
            id: 'random-id',
        })
    })

    it('return to the define step with keeping data already stored', async () => {
        sut.startEventCreation()
        sut.goToSecondStep(newEventMainData)
        sut.goToThirdStep(newEventTracesData)
        sut.goToOverviewStep(newEventAdditionalData)

        sut.backToDefineStep('MAIN_DATA')
        expect(sut.eventCreationStep).toEqual(['MAIN_DATA'])

        expect(sut.draft).toEqual({ ...newEventMainData, ...newEventTracesData, ...newEventAdditionalData })
    })

    it('empty step if the creation is closed', () => {
        sut.startEventCreation()
        sut.goToSecondStep(newEventMainData)

        sut.closeEventCreation()

        expect(sut.eventCreationStep).toEqual([])
    })
})

class SUT {
    private readonly _generatorId: () => string
    private readonly _eventCreationRepository: StubEventCreationRepository
    private _store: ReduxStore

    constructor(private readonly _now: () => Date) {
        this._generatorId = () => 'random-id'
        this._eventCreationRepository = new StubEventCreationRepository(this._now)
        this._store = setupStore({
            generatorId: this._generatorId,
            eventCreationRepository: this._eventCreationRepository,
        })
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
        this._store.dispatch(newEventSlice.actions.onAdditionalDataValidate(payload))
    }

    addTrace(payload: Trace) {
        this._store.dispatch(newEventSlice.actions.onAddTrace(payload))
    }

    deleteTrace(payload: Trace['id']) {
        this._store.dispatch(newEventSlice.actions.onDeleteTrace(payload))
    }

    addPrices(prices: Array<EventPrice>) {
        prices.forEach((price) => this._store.dispatch(newEventSlice.actions.onAddPrice(price)))
    }

    removePrice(index: number) {
        this._store.dispatch(newEventSlice.actions.onRemovePrice(index))
    }

    addOrganizer(organizer: EventOrganizer) {
        this._store.dispatch(newEventSlice.actions.onAddOrganizer(organizer))
    }

    removeContact(index: number) {
        this._store.dispatch(newEventSlice.actions.onRemoveContact(index))
    }

    async saveNewEvent() {
        await this._store.dispatch(saveNewEvent())
    }

    backToDefineStep(step: NewEventDraftSteps) {
        this._store.dispatch(newEventSlice.actions.onDefineStepAsked(step))
    }

    closeEventCreation() {
        this._store.dispatch(newEventSlice.actions.onCloseEventCreationAsked())
    }

    get eventCreationStep() {
        return this._store.getState().newEventState.steps
    }

    get draft() {
        return this._store.getState().newEventState.draft
    }

    get eventJustCreated() {
        return this._eventCreationRepository.eventsJustCreated
    }
}

class StubEventCreationRepository implements EventCreationRepository {
    private _eventsJustCreated: CalendarEvent[] = []

    constructor(private readonly now: () => Date) {}
    async saveNewEvent(newEvent: NewCalendarEvent): Promise<void> {
        this._eventsJustCreated.push(toCalendarEventFromNewCalendarEvent(newEvent, this.now))
    }

    get eventsJustCreated() {
        return this._eventsJustCreated
    }
}
