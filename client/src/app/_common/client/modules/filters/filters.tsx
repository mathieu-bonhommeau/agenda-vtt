import { EventsBasedFilters } from '@/app/_common/client/modules/filters/events-based-filters'
import { RunsBasedFilters } from '@/app/_common/client/modules/filters/runs-based-filters'
import { EventsFilters } from '@/app/calendar-event/business/model/filter'
import { eventsSlice } from '@/app/calendar-event/business/reducer/event-reducer'
import { Box } from '@mui/material'
import { useDispatch } from 'react-redux'

export function Filters() {
    const dispatch = useDispatch()

    const handleAddFilter = (filters: EventsFilters) => {
        dispatch(eventsSlice.actions.onEventsFiltered(filters))
    }

    return (
        <Box>
            <EventsBasedFilters handleAddFilter={handleAddFilter} />
            <RunsBasedFilters handleAddFilter={handleAddFilter} />
        </Box>
    )
}
