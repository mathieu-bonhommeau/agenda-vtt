import { AppDispatch } from '@/app/_common/business/store/store'
import { AppCalendar } from '@/app/_common/client/modules/calendar/calendar'
import { Filters } from '@/app/_common/client/modules/filters/filters'
import { AppMap } from '@/app/_common/client/modules/map/map'
import { retrieveEvents } from '@/app/calendar-events/business/use-case/retrieve-events/retrieve-events'
import { eventsFiltersVM } from '@/app/filters-events/client/view-models/filters-view-models'
import { Box, Tab, Tabs } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export type ViewEvents = 'calendar' | 'map'

export default function Index() {
    const dispatch = useDispatch<AppDispatch>()
    const filters = useSelector(eventsFiltersVM())

    const [view, setView] = useState<ViewEvents>('map')

    useEffect(() => {
        dispatch(retrieveEvents({ filters }))
    }, [dispatch, filters])

    const toggleView = (event: React.SyntheticEvent, newView: ViewEvents) => {
        setView(newView)
    }

    return (
        <Box height={'100vh'} display={'flex'}>
            <Box sx={{ py: 3, width: '30%' }}>
                <Box sx={{ display: 'flex', px: 3 }}>
                    <Box display={'flex'}>
                        <h1
                            style={{
                                fontWeight: '200',
                                fontSize: '1.8rem',
                            }}
                        >
                            <span style={{ fontSize: '2.2rem' }}>{`L'`}</span>
                            <span style={{ fontWeight: 'bold', letterSpacing: '-2px', fontSize: '2.2rem' }}>
                                Agenda
                            </span>
                            <span style={{ fontSize: '2.2rem' }}>U</span>tagawa
                        </h1>
                    </Box>
                </Box>
                <Box display={'flex'} width={'100%'}>
                    <Filters />
                </Box>
            </Box>
            <Box sx={{ width: '100%', py: 3, display: 'flex', flexDirection: 'column', gap: 2, marginRight: 1 }}>
                <Tabs value={view} aria-label="disabled tabs example" onChange={toggleView}>
                    <Tab label="Carte" value={'map'} />
                    <Tab label="Agenda" value={'calendar'} />
                </Tabs>
                {view === 'calendar' && <AppCalendar />}
                {view === 'map' && <AppMap />}
            </Box>
        </Box>
    )
}
