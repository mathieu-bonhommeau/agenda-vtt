import { Contact, EventOrganizer, EventPrice } from '@/app/calendar-events/business/models/event'
import { EventLocation, LatLon } from '@/app/calendar-events/business/models/geolocation'
import { saveNewEvent } from '@/app/calendar-events/business/use-case/add-event/save-new.event'
import { Trace, TraceColor } from '@/app/traces/business/models/trace'
import { createSlice } from '@reduxjs/toolkit'

export type NewEventDraftSteps = 'MAIN_DATA' | 'TRACES' | 'ADDITIONAL_DATA' | 'OVERVIEW'

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
    utagawaId?: string
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
        onMainDataValidate: (state, { payload }) => {
            state.steps = [...state.steps, 'TRACES']
            state.draft = { ...payload }
        },
        onTracesDataValidate: (state, { payload }) => {
            state.steps = [...state.steps, 'ADDITIONAL_DATA']
            state.draft = { ...state.draft, ...payload }
        },
        onAdditionalDataValidate: (state, { payload }) => {
            state.steps = [...state.steps, 'OVERVIEW']
            state.draft = { ...state.draft, ...payload }
        },
        onLastStepAsked: (state) => {
            state.steps = state.steps.slice(0, -1)
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

export const newEventReducer = newEventSlice.reducer
