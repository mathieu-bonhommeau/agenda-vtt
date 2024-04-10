import { createAsyncThunk } from '@reduxjs/toolkit'

// IN PROGRESS
export const fetchEvents = createAsyncThunk('events/fetch', async () => {
    const events = await eventsGateway.retrieveEvents()
    dispatch({ type: Actions.EVENTS_RETRIEVED, payload: {} })
})
