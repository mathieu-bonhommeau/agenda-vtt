import { AppAsyncThunkConfig } from '@/app/_common/business/store/store'
import { eventsSlice } from '@/app/calendar-event/business/reducers/event-reducer'
import { SearchPlace } from '@/app/filters-events/business/models/filter'
import { createAsyncThunk } from '@reduxjs/toolkit'

export type RetrieveEventsCommand = {
    startDate?: string
    endDate?: string
    place?: SearchPlace
}

export const retrieveEvents = createAsyncThunk<void, RetrieveEventsCommand, AppAsyncThunkConfig>(
    'events/fetch',
    async (command, { extra: { eventsGateway }, dispatch }) => {
        const events = await eventsGateway.retrieveEvents(command)
        dispatch(eventsSlice.actions.onEventsRetrieved(events))
    },
)
