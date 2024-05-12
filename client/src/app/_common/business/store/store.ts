import { buildDependencies } from '@/app/_common/_config/dependencies'
import { AppState } from '@/app/_common/business/store/appState'
import { EventsGateway } from '@/app/calendar-event/business/ports/events.gateway'
import { eventsReducer } from '@/app/calendar-event/business/reducers/event-reducer'
import { PlacesGateway } from '@/app/filters-events/business/ports/places.gateway'
import { filtersReducer } from '@/app/filters-events/business/reducers/filters-reducers'
import { Action, configureStore, Store, ThunkDispatch } from '@reduxjs/toolkit'
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { GetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware'

export interface Dependencies {
    eventsGateway: EventsGateway
    placesGateway: PlacesGateway
}

export const setupStore = (dependencies: Partial<Dependencies>) => {
    return configureStore({
        reducer: {
            eventsState: eventsReducer,
            filtersState: filtersReducer,
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

export const dependencies = buildDependencies()

export const store = setupStore(dependencies)

export type ReduxStore = Store<AppState> & {
    dispatch: AppDispatch
}

export type AppDispatch = ThunkDispatch<AppState, Dependencies, Action>

export type AppAsyncThunkConfig = BaseThunkAPI<AppState, Dependencies, AppDispatch>
