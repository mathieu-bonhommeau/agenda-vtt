import { AppDispatch } from '@/app/_common/business/store/store'
import { AppCalendar } from '@/app/_common/client/modules/calendar/calendar'
import { Filters } from '@/app/_common/client/modules/filters/filters'
import { AppMap } from '@/app/_common/client/modules/map/map'
import { retrieveEvents } from '@/app/calendar-event/business/use-case/retrieve-events'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

export type ViewEvents = 'calendar' | 'map'
export default function Index() {
    const dispatch = useDispatch<AppDispatch>()

    const [view, setView] = useState<ViewEvents>('map')

    useEffect(() => {
        dispatch(retrieveEvents())
    }, [dispatch])

    const toggleView = (event: React.MouseEvent<HTMLElement>, newView: ViewEvents) => {
        setView(newView)
    }

    return (
        <>
            <Filters />
            <hr />
            <ToggleButtonGroup color="primary" value={view} exclusive onChange={toggleView} aria-label="Platform">
                <ToggleButton value="map">Carte</ToggleButton>
                <ToggleButton value="calendar">Calendrier</ToggleButton>
            </ToggleButtonGroup>
            {view === 'calendar' && <AppCalendar />}
            {view === 'map' && <AppMap />}
        </>
    )
}
