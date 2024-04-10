import { configureStore } from '@reduxjs/toolkit'

export const setupStore = () => {
    return configureStore({
        reducer: {},
    })
}

export const store = setupStore()

// Infer the `RootState` and `AppDispatch` types from the tips itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
