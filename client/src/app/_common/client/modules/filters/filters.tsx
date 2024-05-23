import { EventsFilters } from '@/app/filters-events/business/models/filter'
import { filtersSlice } from '@/app/filters-events/business/reducers/filters-reducers'
import { EventsBasedFilters } from '@/app/filters-events/client/react/components/events-based-filters'
import { eventsFiltersVM } from '@/app/filters-events/client/view-models/filters-view-models'
import { ViewEvents } from '@/pages'
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material'
import React, { Dispatch, SetStateAction } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export function Filters({ view, setView }: { view: ViewEvents; setView: Dispatch<SetStateAction<ViewEvents>> }) {
    const dispatch = useDispatch()
    const filters = useSelector(eventsFiltersVM())

    const toggleView = (event: React.MouseEvent<HTMLElement>, newView: ViewEvents) => {
        setView(newView)
    }

    const handleAddFilter = (partialFilters: Partial<EventsFilters>) => {
        dispatch(filtersSlice.actions.onEventsFiltered({ ...filters, ...partialFilters }))
    }

    return (
        <Box display={'flex'} flexDirection={'column'}>
            <Box p={3}>
                <ToggleButtonGroup color="primary" value={view} exclusive onChange={toggleView} aria-label="Platform">
                    <ToggleButton value="map">Carte</ToggleButton>
                    <ToggleButton value="calendar">Calendrier</ToggleButton>
                </ToggleButtonGroup>
            </Box>
            <EventsBasedFilters handleAddFilter={handleAddFilter} />
        </Box>
    )
}
