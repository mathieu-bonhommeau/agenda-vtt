import { AppDispatch } from '@/app/_common/business/store/store'
import { Filters } from '@/app/_common/client/modules/filters/filters'
import { AppEventList } from '@/app/_common/client/modules/list/event-list'
import { AppMap } from '@/app/_common/client/modules/map/map'
import ModalEvent from '@/app/_common/client/modules/modal-event/modal-event'
import { retrieveEvents } from '@/app/calendar-events/business/use-case/retrieve-events/retrieve-events'
import { eventsFiltersVM } from '@/app/filters-events/client/view-models/filters-view-models'
import AddIcon from '@mui/icons-material/Add'
import LoginIcon from '@mui/icons-material/Login'
import { Box, Fab, IconButton, Tab, Tabs } from '@mui/material'
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
        <>
            <Box height={'100vh'} display={'flex'}>
                <Box sx={{ py: 3, width: '30%', flexDirection: 'column' }}>
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
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Box display={'flex'} justifyContent={'space-between'}>
                        <Tabs value={view} aria-label="disabled tabs example" onChange={toggleView}>
                            <Tab label="Carte" value={'map'} />
                            <Tab label="Liste" value={'calendar'} />
                        </Tabs>
                        <IconButton>
                            <LoginIcon />
                        </IconButton>
                    </Box>
                    {view === 'calendar' && <AppEventList />}
                    {view === 'map' && <AppMap />}
                </Box>
                <ModalEvent />
            </Box>
            <Fab color="primary" aria-label="add" sx={floatStyleButton}>
                <AddIcon />
            </Fab>
        </>
    )
}

const floatStyleButton = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1000,
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
}
