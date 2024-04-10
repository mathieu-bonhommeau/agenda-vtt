import { AppState } from '@/app/_common/store/appState'
import { EventsGateway } from '@/app/calendar-event/business/use-case/__test__/fetch-events.spec'
import { Action, configureStore, Store, ThunkAction, ThunkDispatch, UnknownAction } from '@reduxjs/toolkit'
import { BaseThunkAPI } from '@reduxjs/toolkit/src/createAsyncThunk'

export interface Dependencies {
    eventsGateway: EventsGateway
}

export const setupStore = (dependencies: Partial<Dependencies>) => {
    return configureStore({
        reducer: {},
    })
}

export type ReduxStore = Store<AppState> & {
    dispatch: ThunkDispatch<AppState, Dependencies, Action>
}

export type AppDispatch = ThunkDispatch<AppState, Dependencies, Action>

export type AppAsyncThunkConfig = BaseThunkAPI<AppState, Dependencies>

//TODO - check if UnknownAction is the corresponding type !
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, Dependencies, UnknownAction>
