import { EventsFilters } from '@/app/filters-events/business/models/filter'
import { createSlice } from '@reduxjs/toolkit'

export type FiltersState = {
    filters: EventsFilters
}

export const initialState: FiltersState = {
    filters: { startDate: new Date().toDateString() },
}

export const filtersSlice = createSlice({
    name: 'filters-events',
    initialState,
    reducers: {
        onEventsFiltered: (state, { payload }: { payload: EventsFilters }) => {
            state.filters = payload
        },
    },
    extraReducers: () => {},
})

export const filtersReducer = filtersSlice.reducer
