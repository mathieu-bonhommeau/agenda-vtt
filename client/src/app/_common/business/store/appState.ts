import { EventsState } from '@/app/calendar-events/business/reducers/event-reducer'
import { FiltersState } from '@/app/filters-events/business/reducers/filters-reducers'
import { TracesState } from '@/app/traces/business/reducers/traces.reducers'

export interface AppState {
    eventsState: EventsState
    filtersState: FiltersState
    tracesState: TracesState
}
