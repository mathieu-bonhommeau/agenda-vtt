import { Contact, EventOrganizer, EventPrice } from '@/app/calendar-events/business/models/event'
import { EventLocation, LatLon } from '@/app/calendar-events/business/models/geolocation'
import { saveNewEvent } from '@/app/calendar-events/business/use-case/add-event/save-new.event'
import { Trace, TraceColor } from '@/app/traces/business/models/trace'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const newEventDraftSteps = ['MAIN_DATA', 'TRACES', 'ADDITIONAL_DATA', 'OVERVIEW'] as const
export type NewEventDraftSteps = (typeof newEventDraftSteps)[number]

export type NewEventDraft = {
    id?: string
    title?: string
    description?: string
    startDate?: string
    endDate?: string
    eventLocation?: EventLocation
    traces?: Partial<Trace>[]
    price?: EventPrice[]
    services?: string[]
    organizer?: EventOrganizer
}

export type MainDataPayload = {
    title: string
    description: string
    startDate: string
    endDate: string
    eventLocation: {
        country: string
        address: string
        city: string
        region?: string
        county?: string
        latLon: LatLon
    }
}

export type TraceDataPayload = {
    id: string
    utagawaId?: number
    link?: string
    distance: number
    traceColor?: TraceColor
    positiveElevation?: number
}

export type TracesDataPayload = {
    traces?: TraceDataPayload[]
}

export type NewEventState = {
    draft: NewEventDraft
    steps: Array<NewEventDraftSteps>
}

export type AdditionalDataPayload = {
    price?: EventPrice[]
    organizer: {
        name: string
        email: string
        website?: string
        contacts?: Contact[]
    }
}

const initialState: NewEventState = {
    draft: {},
    steps: [],
}

export const newEventSlice = createSlice({
    name: 'new-events',
    initialState,
    reducers: {
        onStartEventCreation: (state) => {
            state.steps = ['MAIN_DATA']
        },
        onMainDataValidate: (state, { payload }: { payload: NewEventMainDraft }) => {
            state.steps = [...state.steps, 'TRACES']
            state.draft = { ...payload }
        },
        onAddTrace: (state, { payload }: { payload: Trace }) => {
            if (state.draft.traces) {
                state.draft.traces.push(payload)
                return
            }
            state.draft.traces = [payload]
        },
        onDeleteTrace: (state, { payload }: { payload: Trace['id'] }) => {
            if (state.draft.traces) state.draft.traces = state.draft.traces.filter((trace) => trace.id !== payload)
        },
        onTracesDataValidate: (state) => {
            state.steps = [...state.steps, 'ADDITIONAL_DATA']
        },
        onAddPrice: (state, { payload }: { payload: EventPrice }) => {
            if (state.draft.price) {
                state.draft.price = [...state.draft.price, payload]
                return
            }
            state.draft.price = [payload]
        },
        onRemovePrice: (state, { payload }: { payload: number }) => {
            if (!state.draft.price || payload < 0) return
            state.draft.price.splice(payload, 1)
        },
        onAddOrganizer: (state, { payload }: { payload: EventOrganizer }) => {
            state.draft.organizer = payload
        },
        onRemoveContact: (state, { payload }: { payload: number }) => {
            if (!state.draft.organizer?.contacts || payload < 0) return
            state.draft.organizer?.contacts.splice(payload, 1)
        },
        onAdditionalDataValidate: (state, { payload }) => {
            state.steps = [...state.steps, 'OVERVIEW']
            state.draft = { ...state.draft, ...payload }
        },
        onDefineStepAsked: (state, { payload }: PayloadAction<NewEventDraftSteps>) => {
            const index = state.steps.indexOf(payload)
            state.steps = state.steps.slice(0, index + 1)
        },
        onCloseEventCreationAsked: (state) => {
            state.steps = []
        },
    },
    extraReducers: (builder) => {
        builder.addCase(saveNewEvent.fulfilled, () => {
            return initialState
        })
    },
})

export type NewEventMainDraft = {
    title?: string
    description?: string
    startDate?: string
    endDate?: string
    eventLocation?: EventLocation
}

export const newEventReducer = newEventSlice.reducer
