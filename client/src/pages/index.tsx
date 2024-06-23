import { AppDispatch } from '@/app/_common/business/store/store'
import AppSnackbar from '@/app/_common/client/components/snack-bar'
import { AppContext } from '@/app/_common/client/context/app-context'
import { newEventSlice } from '@/app/calendar-events/business/reducers/new-event-reducer'
import { retrieveEvents } from '@/app/calendar-events/business/use-case/retrieve-events/retrieve-events'
import { AppEventList } from '@/app/calendar-events/client/react/components/list/event-list'
import { AppMap } from '@/app/calendar-events/client/react/components/map/map'
import ModalEvent from '@/app/calendar-events/client/react/components/modal-event/modal-event'
import { ModalNewEvent } from '@/app/calendar-events/client/react/components/modal-new-event/modal-new-event'
import { styleModal } from '@/app/calendar-events/client/react/styles/style-modal'
import { filtersSlice } from '@/app/filters-events/business/reducers/filters-reducers'
import { Filters } from '@/app/filters-events/client/react/components/filters/filters'
import { eventsFiltersVM } from '@/app/filters-events/client/view-models/filters-view-models'
import AddIcon from '@mui/icons-material/Add'
import LoginIcon from '@mui/icons-material/Login'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import { Box, Button, Fab, Grid, IconButton, Tab, Tabs } from '@mui/material'
import Modal from '@mui/material/Modal'
import { useMediaQuery, useTheme } from '@mui/system'
import 'ol/ol.css'
import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export type ViewEvents = 'calendar' | 'map'

export default function Index() {
    const dispatch = useDispatch<AppDispatch>()
    const filters = useSelector(eventsFiltersVM())
    const { errors } = useContext(AppContext)
    const theme = useTheme()
    const isLg = useMediaQuery(theme.breakpoints.up('lg'))
    const { setResetFilters } = useContext(AppContext)

    const [view, setView] = useState<ViewEvents>('map')
    const [openFilters, setOpenFilters] = useState(false)

    useEffect(() => {
        dispatch(retrieveEvents({ filters }))
    }, [dispatch, filters])

    const toggleView = (_: React.SyntheticEvent, newView: ViewEvents) => {
        setView(newView)
    }

    const handleReset = () => {
        dispatch(filtersSlice.actions.onEventsFiltered({}))
        setResetFilters(true)
    }

    return (
        <>
            <Grid container spacing={2} height={isLg ? '100vh' : 'auto'}>
                <IconButton sx={{ position: 'absolute', top: 20, right: 10 }}>
                    <LoginIcon />
                </IconButton>
                <Grid item lg={4} xs={12} sx={{ pt: 3, width: '30%', flexDirection: 'column' }}>
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
                        {isLg && <Filters />}
                    </Box>
                </Grid>
                <Grid
                    item
                    lg={8}
                    xs={12}
                    sx={{
                        width: '100%',
                        minHeight: '800px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        paddingTop: 1,
                    }}
                >
                    <Box
                        display={'flex'}
                        justifyContent={'space-between'}
                        alignItems={'flex-end'}
                        mt={isLg ? 4 : 0}
                        paddingRight={1}
                    >
                        <Tabs value={view} aria-label="disabled tabs example" onChange={toggleView}>
                            <Tab label="Carte" value={'map'} />
                            <Tab label="Liste" value={'calendar'} />
                        </Tabs>
                        {!isLg && (
                            <Box display={'flex'} gap={1}>
                                <Button variant={'outlined'} onClick={() => setOpenFilters(true)}>
                                    Filtres
                                </Button>
                                <Button variant={'outlined'} onClick={handleReset} sx={{ minWidth: 0 }}>
                                    X
                                </Button>
                            </Box>
                        )}
                    </Box>
                    {view === 'calendar' && <AppEventList />}
                    {view === 'map' && <AppMap />}
                </Grid>
                <ModalEvent />
            </Grid>
            <Fab
                color="primary"
                aria-label="add"
                sx={floatStyleButton}
                onClick={() => dispatch(newEventSlice.actions.onStartEventCreation())}
            >
                <AddIcon />
            </Fab>
            <ModalFilters openFilters={openFilters} setOpenFilters={setOpenFilters} />
            <ModalNewEvent />
            <AppSnackbar errors={errors} />
        </>
    )
}

export function ModalFilters({
    openFilters,
    setOpenFilters,
}: {
    openFilters: boolean
    setOpenFilters: Dispatch<SetStateAction<boolean>>
}) {
    return (
        <Modal
            open={openFilters}
            keepMounted
            onClose={() => setOpenFilters(false)}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={styleModal}>
                <Box display={'flex'} justifyContent={'flex-end'}>
                    <IconButton onClick={() => setOpenFilters(false)}>
                        <TravelExploreIcon />
                    </IconButton>
                </Box>
                <Filters />
            </Box>
        </Modal>
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
