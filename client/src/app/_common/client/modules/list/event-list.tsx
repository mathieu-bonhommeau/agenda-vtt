import { AppDispatch } from '@/app/_common/business/store/store'
import { AppContext } from '@/app/_common/client/context/app-context'
import { determineTraceColor } from '@/app/_common/helpers/trace-helpers'
import { eventsVM } from '@/app/calendar-events/client/view-models/retrieve-events-view-model'
import { filtersSlice } from '@/app/filters-events/business/reducers/filters-reducers'
import { eventsFiltersVM } from '@/app/filters-events/client/view-models/filters-view-models'
import { Trace } from '@/app/traces/business/models/trace'
import { Box, Card, Chip, FormControlLabel, Switch, Typography } from '@mui/material'
import { ChangeEvent, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export function AppEventList() {
    const dispatch = useDispatch<AppDispatch>()
    const events = useSelector(eventsVM())
    const { setOpenModal, locale } = useContext(AppContext)

    const filters = useSelector(eventsFiltersVM())

    const handleAddFilters = (e: ChangeEvent<HTMLInputElement>) => {
        e.target.checked && dispatch(filtersSlice.actions.onEventsFiltered({ ...filters, sortBy: 'date' }))
        !e.target.checked && dispatch(filtersSlice.actions.onEventsFiltered({ ...filters, sortBy: 'location' }))
    }

    return (
        <Box sx={{ border: '1px solid rgba(0, 0, 0, .3)', flexGrow: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', paddingTop: 2, px: 2 }}>
                <Typography>Trier par : </Typography>
                <FormControlLabel
                    value="date"
                    control={<Switch color="primary" onChange={handleAddFilters} />}
                    label="Date"
                    labelPlacement="start"
                />
            </Box>
            {events.map((event) => (
                <Box key={event.id}>
                    <Card
                        sx={eventCardStyle}
                        onClick={() => {
                            setOpenModal({ open: true, event })
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2, py: 1 }}>
                            <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
                                {event.startDate === event.endDate && (
                                    <Typography variant={'caption'} sx={{ fontWeight: 'bold' }}>{`Le ${new Date(
                                        event.startDate,
                                    ).toLocaleDateString(locale)}`}</Typography>
                                )}
                                {event.startDate !== event.endDate && (
                                    <Typography variant={'caption'} sx={{ fontWeight: 'bold' }}>{`Du ${new Date(
                                        event.startDate,
                                    ).toLocaleDateString(locale)} au ${new Date(event.endDate).toLocaleDateString(
                                        locale,
                                    )}`}</Typography>
                                )}
                                <Typography variant={'h6'}>{event.title}</Typography>
                                <Box sx={{ my: 1, display: 'flex', gap: 1, alignItems: 'center' }}>
                                    {event.traces.map((trace: Trace) => (
                                        <Typography
                                            key={trace.id}
                                            variant={'caption'}
                                            height={'25px'}
                                            sx={{
                                                fontWeight: 'bold',
                                                color: determineTraceColor(trace),
                                                borderBottom: `5px solid ${determineTraceColor(trace)}`,
                                            }}
                                        >{`${trace.distance} kms`}</Typography>
                                    ))}
                                </Box>
                            </Box>
                            <Box
                                display={'flex'}
                                flexDirection={'column'}
                                justifyContent={'space-around'}
                                alignItems={'flex-end'}
                            >
                                <Typography sx={{ fontSize: '2rem', fontWeight: 'bold', opacity: '0.5' }}>
                                    {event.eventLocation.postcode?.slice(0, 2)}
                                </Typography>
                                <Box display={'flex'} gap={1}>
                                    <Chip label={event.eventLocation.city} size={'small'} />
                                </Box>
                            </Box>
                        </Box>
                    </Card>
                </Box>
            ))}
        </Box>
    )
}

const eventCardStyle = {
    p: 0,
    m: 2,
    width: '500px',
    scale: 1,
    transition: 'transform 0.3s',
    '&:hover': {
        transform: 'scale(1.02)',
    },
}
