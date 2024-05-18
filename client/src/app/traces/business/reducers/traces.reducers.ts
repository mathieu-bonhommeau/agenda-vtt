import { Trace } from '@/app/traces/business/models/trace'
import { createSlice } from '@reduxjs/toolkit'

export type TracesState = {
    traces: Trace[]
}

export const initialState: TracesState = {
    traces: [],
}

export const tracesSlice = createSlice({
    name: 'traces',
    initialState,
    reducers: {},
    extraReducers: () => {},
})

export const tracesReducer = tracesSlice.reducer
