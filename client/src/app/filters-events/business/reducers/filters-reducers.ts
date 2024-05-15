import { EventsFilters, SearchPlace } from '@/app/filters-events/business/models/filter'
import { createSlice } from '@reduxjs/toolkit'

export type FiltersState = {
    startDate: string | null
    endDate: string | null
    place: SearchPlace | null
}

export const initialState: FiltersState = {
    startDate: new Date().toDateString(),
    endDate: null,
    place: null,
}

export const filtersSlice = createSlice({
    name: 'filters-events',
    initialState,
    reducers: {
        onEventsFiltered: (state, { payload }: { payload: EventsFilters }) => {
            if (payload.startDate) state.startDate = payload.startDate
            if (payload.endDate) state.endDate = payload.endDate
            if (payload.place) state.place = payload.place
        },
    },
    extraReducers: () => {},
})

export const filtersReducer = filtersSlice.reducer
