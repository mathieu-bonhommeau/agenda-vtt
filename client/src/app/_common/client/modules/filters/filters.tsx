import { AppContext } from '@/app/_common/client/context/app-context'
import { EventsFilters } from '@/app/filters-events/business/models/filter'
import { filtersSlice } from '@/app/filters-events/business/reducers/filters-reducers'
import { EventsBasedFilters } from '@/app/filters-events/client/react/components/events-based-filters'
import { eventsFiltersVM } from '@/app/filters-events/client/view-models/filters-view-models'
import { Box, Button } from '@mui/material'
import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export function Filters() {
    const dispatch = useDispatch()
    const filters = useSelector(eventsFiltersVM())
    const { setResetFilters } = useContext(AppContext)

    const handleAddFilter = (partialFilters: Partial<EventsFilters>) => {
        dispatch(filtersSlice.actions.onEventsFiltered({ ...filters, ...partialFilters }))
    }

    const handleReset = () => {
        dispatch(filtersSlice.actions.onEventsFiltered({}))
        setResetFilters(true)
    }

    return (
        <Box display={'flex'} flexDirection={'column'} width={'100%'}>
            <EventsBasedFilters handleAddFilter={handleAddFilter} />
            <Button size="small" onClick={handleReset}>
                Reinitialiser
            </Button>
        </Box>
    )
}
