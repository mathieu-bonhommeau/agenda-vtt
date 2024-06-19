import { EventsState } from '@/app/calendar-events/business/reducers/event-reducer'
import { NewEventState } from '@/app/calendar-events/business/reducers/new-event-reducer'
import { FiltersState } from '@/app/filters-events/business/reducers/filters-reducers'

export interface AppState {
    eventsState: EventsState
    filtersState: FiltersState
    newEventState: NewEventState
}
