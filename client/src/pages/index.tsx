import { buildDependencies } from '@/app/_common/_config/dependencies'
import { setupStore } from '@/app/_common/business/store/store'
import { AppCalendar } from '@/app/_common/client/components/calendar'
import { Filters } from '@/app/_common/client/components/filters'
import { Map } from '@/app/_common/client/components/map'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import React, { useState } from 'react'
import { Provider } from 'react-redux'

export type ViewEvents = 'calendar' | 'map'
export default function Index() {
    const store = setupStore(buildDependencies())
    const [view, setView] = useState<ViewEvents>('calendar')

    const toggleView = (event: React.MouseEvent<HTMLElement>, newView: ViewEvents) => {
        setView(newView)
    }

    return (
        <Provider store={store}>
            <Filters />
            <ToggleButtonGroup color="primary" value={view} exclusive onChange={toggleView} aria-label="Platform">
                <ToggleButton value="calendar">Calendrier</ToggleButton>
                <ToggleButton value="map">Carte</ToggleButton>
            </ToggleButtonGroup>
            {view === 'calendar' && <AppCalendar />}
            {view === 'map' && <Map />}
        </Provider>
    )
}
