import { CalendarEvent } from '@/app/calendar-event/business/model/event'
import { retrieveEvents } from '@/app/calendar-event/business/use-case/retrieve-events'
import { createSlice } from '@reduxjs/toolkit'

export type EventsState = {
    events: CalendarEvent[]
    error: boolean
    loading: boolean
}

export const initialState: EventsState = {
    events: [],
    error: false,
    loading: false,
}

export const eventsSlice = createSlice({
    name: 'calendar-events',
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(retrieveEvents.pending, (state) => {
                state.loading = true
            })
            .addCase(retrieveEvents.fulfilled, (state, action) => {
                state.loading = false
                console.log(action)
                state.events = action.payload || []
            })
            .addCase(retrieveEvents.rejected, (state) => {
                state.loading = false
                state.error = true
            })
    },
})

export const { resetError } = eventsSlice.actions
export const eventsReducer = eventsSlice.reducer
