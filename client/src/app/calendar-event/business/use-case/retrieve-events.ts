import { AppAsyncThunkConfig } from '@/app/_common/store/store'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const retrieveEvents = createAsyncThunk<void, void, AppAsyncThunkConfig>(
    'events/fetch',
    async (_, { extra: { eventsGateway } }: AppAsyncThunkConfig) => {
        return await eventsGateway.retrieveEvents()
    },
)
