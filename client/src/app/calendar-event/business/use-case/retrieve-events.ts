import { AppAsyncThunkConfig } from '@/app/_common/store/store'
import { CalendarEvent } from '@/app/calendar-event/business/model/event'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const retrieveEvents = createAsyncThunk<CalendarEvent[], void, AppAsyncThunkConfig>(
    'events/fetch',
    async (_, { extra: { eventsGateway } }) => {
        return await eventsGateway.retrieveEvents()
    },
)
