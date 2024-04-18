import { buildDependencies } from '@/app/_common/_config/dependencies'
import { AppState } from '@/app/_common/business/store/appState'
import { EventsGateway } from '@/app/calendar-event/business/ports/events.gateway'
import { eventsReducer } from '@/app/calendar-event/business/reducer/event-reducer'
import { Action, configureStore, Store, ThunkDispatch } from '@reduxjs/toolkit'
import { BaseThunkAPI } from '@reduxjs/toolkit/src/createAsyncThunk'
import { GetDefaultMiddleware } from '@reduxjs/toolkit/src/getDefaultMiddleware'

export interface Dependencies {
    eventsGateway: EventsGateway
}

export const setupStore = (dependencies: Partial<Dependencies>) => {
    return configureStore({
        reducer: {
            eventsState: eventsReducer,
        },
        devTools: true,
        middleware: (getDefaultMiddleware: GetDefaultMiddleware<AppState>) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: dependencies,
                },
            }),
    })
}

export const store = setupStore(buildDependencies())

export type ReduxStore = Store<AppState> & {
    dispatch: AppDispatch
}

export type AppDispatch = ThunkDispatch<AppState, Dependencies, Action>

export type AppAsyncThunkConfig = BaseThunkAPI<AppState, Dependencies, AppDispatch>
