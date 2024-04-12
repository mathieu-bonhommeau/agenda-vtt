import { AppState } from '@/app/_common/store/appState'
import { eventsReducer } from '@/app/calendar-event/business/reducer/event-reducer'
import { EventsGateway } from '@/app/calendar-event/business/use-case/__test__/fetch-events.spec'
import { Action, configureStore, Store, ThunkAction, ThunkDispatch, UnknownAction } from '@reduxjs/toolkit'
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

export type ReduxStore = Store<AppState> & {
    dispatch: ThunkDispatch<AppState, Dependencies, Action>
}

export type AppDispatch = ThunkDispatch<AppState, Dependencies, Action>

export type AppAsyncThunkConfig = BaseThunkAPI<AppState, Dependencies>

//TODO - check if UnknownAction is the corresponding type !
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, Dependencies, UnknownAction>
