import { EventsFilters } from '@/app/filters-events/business/models/filter'
import { filtersSlice } from '@/app/filters-events/business/reducers/filters-reducers'
import { EventsBasedFilters } from '@/app/filters-events/client/react/components/events-based-filters'
import { RunsBasedFilters } from '@/app/filters-events/client/react/components/runs-based-filters'
import { Box } from '@mui/material'
import { useDispatch } from 'react-redux'

export function Filters() {
    const dispatch = useDispatch()

    const handleAddFilter = (filters: EventsFilters) => {
        console.log('filters  !!', filters)
        dispatch(filtersSlice.actions.onEventsFiltered(filters))
    }

    return (
        <Box>
            <EventsBasedFilters handleAddFilter={handleAddFilter} />
            <RunsBasedFilters handleAddFilter={handleAddFilter} />
        </Box>
    )
}
