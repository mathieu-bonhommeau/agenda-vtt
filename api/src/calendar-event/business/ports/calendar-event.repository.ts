import { NewCalendarEventCommand } from '../use-cases/add-event/add-events'

export interface CalendarEventRepository {
    persist(newEvent: NewCalendarEventCommand): Promise<void>
}
