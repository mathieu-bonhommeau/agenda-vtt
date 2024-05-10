import { CalendarEvent } from '@/app/calendar-event/business/model/event'
import { EventsFilters } from '@/app/calendar-event/business/model/filter'
import { retrieveEvents } from '@/app/calendar-event/business/use-case/retrieve-events'
import { createSlice } from '@reduxjs/toolkit'

export type EventsError = 'RETRIEVE_EVENTS_FAILED'

export type EventsState = {
    events: CalendarEvent[]
    filters: EventsFilters | null
    error: EventsError | null
    loading: boolean
}

export const initialState: EventsState = {
    events: [],
    filters: null,
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
        onEventsFiltered: (state, { payload }: { payload: EventsFilters }) => {
            state.filters = { ...state.filters, ...payload }
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
