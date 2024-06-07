import { buildDependencies } from '@/app/_common/_config/dependencies'
import { AppState } from '@/app/_common/business/store/appState'
import { EventCreationRepository } from '@/app/calendar-events/business/ports/event-creation.repository'
import { EventsGateway } from '@/app/calendar-events/business/ports/events.gateway'
import { eventsReducer } from '@/app/calendar-events/business/reducers/event-reducer'
import { newEventReducer } from '@/app/calendar-events/business/reducers/new-event-reducer'
import { filtersReducer } from '@/app/filters-events/business/reducers/filters-reducers'
import { LocationsGateway } from '@/app/geolocation/business/ports/locations.gateway'
import { tracesReducer } from '@/app/traces/business/reducers/traces.reducers'
import { TracesApiGateway } from '@/app/traces/business/use-cases/retrieve-traces/__test__/retrieve-traces.spec'
import { Action, configureStore, Store, ThunkDispatch } from '@reduxjs/toolkit'
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { GetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware'

export interface Dependencies {
    eventsGateway: EventsGateway
    locationsGateway: LocationsGateway
    tracesApiGateway: TracesApiGateway
    generatorId: () => string
    eventCreationRepository: EventCreationRepository
}

export const setupStore = (dependencies: Partial<Dependencies>) => {
    return configureStore({
        reducer: {
            eventsState: eventsReducer,
            filtersState: filtersReducer,
            tracesState: tracesReducer,
            newEventState: newEventReducer,
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
