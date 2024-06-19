import { EventCreationRepository } from '@/app/calendar-events/business/ports/event-creation.repository'
import { NewEventDraft } from '@/app/calendar-events/business/reducers/new-event-reducer'

export class HttpEventCreationRepository implements EventCreationRepository {
    saveNewEvent(newEvent: NewEventDraft): Promise<void> {
        return Promise.resolve(undefined)
    }
}
