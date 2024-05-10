import { AppAsyncThunkConfig } from '@/app/_common/business/store/store'
import { eventsSlice } from '@/app/calendar-event/business/reducer/event-reducer'
import { createAsyncThunk } from '@reduxjs/toolkit'

export type RetrieveEventsCommand = {
    startDate?: string
    endDate?: string
}

export const retrieveEvents = createAsyncThunk<void, RetrieveEventsCommand, AppAsyncThunkConfig>(
    'events/fetch',
    async (command, { extra: { eventsGateway }, dispatch }) => {
        const events = await eventsGateway.retrieveEvents(command)
        dispatch(eventsSlice.actions.onEventsRetrieved(events))
    },
)
