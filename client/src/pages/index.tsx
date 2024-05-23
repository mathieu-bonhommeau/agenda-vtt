import { AppDispatch } from '@/app/_common/business/store/store'
import { AppCalendar } from '@/app/_common/client/modules/calendar/calendar'
import { Filters } from '@/app/_common/client/modules/filters/filters'
import { AppMap } from '@/app/_common/client/modules/map/map'
import { retrieveEvents } from '@/app/calendar-events/business/use-case/retrieve-events/retrieve-events'
import { eventsFiltersVM } from '@/app/filters-events/client/view-models/filters-view-models'
import { Box } from '@mui/material'
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

    const toggleView = (event: React.MouseEvent<HTMLElement>, newView: ViewEvents) => {
        setView(newView)
    }

    return (
        <div>
            <Box height={'100vh'}>
                <Box sx={{ display: 'flex', px: 3 }}>
                    <Box display={'flex'}>
                        <h1
                            style={{
                                fontWeight: '200',
                                fontSize: '1.8rem',
                            }}
                        >
                            <span style={{ fontSize: '2.2rem' }}>L'</span>
                            <span style={{ fontWeight: 'bold', letterSpacing: '-2px', fontSize: '2.2rem' }}>
                                Agenda
                            </span>
                            <span style={{ fontSize: '2.2rem' }}>U</span>tagawa
                        </h1>
                    </Box>
                </Box>
                <Box display={'flex'}>
                    <Filters view={view} setView={setView} />
                    {view === 'calendar' && <AppCalendar />}
                    {view === 'map' && <AppMap />}
                </Box>
            </Box>
        </div>
    )
}
