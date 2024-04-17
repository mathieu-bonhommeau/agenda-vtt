import { EventsError } from '@/app/_common/business/models/errors/events-error'
import { CalendarEvent } from '@/app/calendar-event/business/model/event'
import { retrieveEvents } from '@/app/calendar-event/business/use-case/retrieve-events'
import { createSlice } from '@reduxjs/toolkit'

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
        resetError: (state) => {
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(retrieveEvents.pending, (state) => {
                state.loading = true
            })
            .addCase(retrieveEvents.fulfilled, (state, action) => {
                state.loading = false
                state.events = action.payload || []
            })
            .addCase(retrieveEvents.rejected, (state, action) => {
                state.loading = false
                state.error = action.error as EventsError
            })
    },
})

export const { resetError } = eventsSlice.actions
export const eventsReducer = eventsSlice.reducer
