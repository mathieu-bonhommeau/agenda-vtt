import { CalendarEvent } from '@/app/calendar-events/business/models/event'
import { retrieveEvents } from '@/app/calendar-events/business/use-case/retrieve-events/retrieve-events'
import { createSlice } from '@reduxjs/toolkit'

export type EventsError = 'RETRIEVE_EVENTS_FAILED'

export type EventsState = {
    events: CalendarEvent[]
    error: EventsError | null
    loading: boolean
}

export const initialState: EventsState = {
    events: [],
    error: null,
    loading: false,
}

export const eventsSlice = createSlice({
    name: 'calendar-events',
    initialState,
    reducers: {
        onEventsRetrieved: (state, { payload }: { payload: CalendarEvent[] }) => {
            state.events = payload || []
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(retrieveEvents.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(retrieveEvents.fulfilled, (state, action) => {
                state.loading = false
                state.error = null
            })
            .addCase(retrieveEvents.rejected, (state) => {
                state.loading = false
                state.error = 'RETRIEVE_EVENTS_FAILED'
                state.events = []
            })
    },
})
export const eventsReducer = eventsSlice.reducer
