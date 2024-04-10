import { AppAsyncThunkConfig } from '@/app/_common/store/store'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const retrieveEvents = createAsyncThunk<void, string, AppAsyncThunkConfig>(
    'events/fetch',
    async (_, { extra: { eventsGateway }, getState, dispatch }: AppAsyncThunkConfig) => {
        const events = await eventsGateway.retrieveEvents()
        //dispatch({ type: Actions.EVENTS_RETRIEVED, payload: {} })
    },
)
