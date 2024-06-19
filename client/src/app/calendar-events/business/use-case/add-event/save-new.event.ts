import { AppState } from '@/app/_common/business/store/appState'
import { AppAsyncThunkConfig } from '@/app/_common/business/store/store'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { toNewEventFromDraft } from '@/app/calendar-events/business/models/new-calendar.event'

export const saveNewEvent = createAsyncThunk<void, void, AppAsyncThunkConfig>(
    'event/create',
    async (_, { extra: { generatorId, eventCreationRepository }, dispatch, getState }) => {
        const draft = (getState() as AppState).newEventState.draft
        const eventId = generatorId()
        const tracesIds = draft.traces?.map((trace) => generatorId())
        const eventToSave = toNewEventFromDraft({ draft, eventId, tracesIds: tracesIds || [] })
        await eventCreationRepository.saveNewEvent(eventToSave)
    },
)
