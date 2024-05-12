import { EventsState } from '@/app/calendar-event/business/reducers/event-reducer'
import { FiltersState } from '@/app/filters-events/business/reducers/filters-reducers'

export interface AppState {
    eventsState: EventsState
    filtersState: FiltersState
}
