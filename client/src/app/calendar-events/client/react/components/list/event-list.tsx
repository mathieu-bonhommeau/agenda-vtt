import { AppDispatch } from '@/app/_common/business/store/store'
import { EventsListByCounty } from '@/app/calendar-events/client/react/components/list/event-list-by-county'
import { EventsListByDate } from '@/app/calendar-events/client/react/components/list/events-list-by-date'
import { filtersSlice } from '@/app/filters-events/business/reducers/filters-reducers'
import { eventsFiltersVM } from '@/app/filters-events/client/view-models/filters-view-models'
import { Badge, BadgeProps } from '@mui/base'
import { Box, FormControlLabel, Switch, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export function AppEventList() {
    const dispatch = useDispatch<AppDispatch>()
    const filters = useSelector(eventsFiltersVM())
    const [eventsListDisplayed, setEventsListDisplayed] = useState<'by-county' | 'by-date'>('by-date')

    const handleAddFilters = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.checked) {
            dispatch(filtersSlice.actions.onEventsFiltered({ ...filters, sortBy: 'date' }))
            setEventsListDisplayed('by-date')
        }
        if (e.target.checked) {
            dispatch(filtersSlice.actions.onEventsFiltered({ ...filters, sortBy: 'location' }))
            setEventsListDisplayed('by-county')
        }
    }

    return (
        <Box sx={{ border: '1px solid rgba(0, 0, 0, .3)', flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', paddingTop: 2, px: 2 }}>
                <Typography>Trier par </Typography>
                <FormControlLabel
                    value="county"
                    control={<Switch color="primary" onChange={handleAddFilters} />}
                    label="département"
                    labelPlacement="start"
                />
            </Box>
            {/* eslint-disable-next-line react/jsx-no-undef */}
            {eventsListDisplayed === 'by-date' && <EventsListByDate />}
            {eventsListDisplayed === 'by-county' && <EventsListByCounty />}
        </Box>
    )
}

export const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid grey`,
        background: '',
        padding: '0 4px',
    },
}))
