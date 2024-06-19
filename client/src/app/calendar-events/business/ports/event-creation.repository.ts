import { NewEventDraft } from '@/app/calendar-events/business/reducers/new-event-reducer'

export interface EventCreationRepository {
    saveNewEvent(newEvent: NewEventDraft): Promise<void>
}