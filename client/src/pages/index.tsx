import { Calendar } from '@/app/_common/components/calendar'
import { Filters } from '@/app/_common/components/filters'
import { Map } from '@/app/_common/components/map'
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
            {view === 'calendar' && <Calendar />}
            {view === 'map' && <Map />}
        </>
    )
}
