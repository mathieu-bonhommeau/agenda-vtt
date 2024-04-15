import { MyCalendar } from '@/app/_common/client/components/calendar'
import { Filters } from '@/app/_common/client/components/filters'
import { Map } from '@/app/_common/client/components/map'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

export type ViewEvents = 'calendar' | 'map'
export default function Index() {
    const router = useRouter()
    const [view, setView] = useState<ViewEvents>('calendar')

    const toggleView = (event: React.MouseEvent<HTMLElement>, newView: ViewEvents) => {
        setView(newView)
    }

    return (
        <>
            <Filters />
            <ToggleButtonGroup color="primary" value={view} exclusive onChange={toggleView} aria-label="Platform">
                <ToggleButton value="calendar">Calendrier</ToggleButton>
                <ToggleButton value="map">Carte</ToggleButton>
            </ToggleButtonGroup>
            {view === 'calendar' && <MyCalendar />}
            {view === 'map' && <Map />}
        </>
    )
}
