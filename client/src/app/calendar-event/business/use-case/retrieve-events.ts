import { AppAsyncThunkConfig } from '@/app/_common/business/store/store'
import { eventsSlice } from '@/app/calendar-event/business/reducer/event-reducer'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const retrieveEvents = createAsyncThunk<void, void, AppAsyncThunkConfig>(
    'events/fetch',
    async (_, { extra: { eventsGateway }, dispatch }) => {
        const events = await eventsGateway.retrieveEvents()
        dispatch(eventsSlice.actions.onEventsRetrieved(events))
    },
)
