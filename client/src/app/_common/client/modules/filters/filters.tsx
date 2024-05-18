import { EventsFilters } from '@/app/filters-events/business/models/filter'
import { filtersSlice } from '@/app/filters-events/business/reducers/filters-reducers'
import { EventsBasedFilters } from '@/app/filters-events/client/react/components/events-based-filters'
import { RunsBasedFilters } from '@/app/filters-events/client/react/components/runs-based-filters'
import { eventsFiltersVM } from '@/app/filters-events/client/view-models/filters-view-models'
import { Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

export function Filters() {
    const dispatch = useDispatch()
    const filters = useSelector(eventsFiltersVM())

    const handleAddFilter = (partialFilters: Partial<EventsFilters>) => {
        dispatch(filtersSlice.actions.onEventsFiltered({ ...filters, ...partialFilters }))
    }

    return (
        <Box>
            <EventsBasedFilters handleAddFilter={handleAddFilter} />
            <RunsBasedFilters handleAddFilter={handleAddFilter} />
        </Box>
    )
}
