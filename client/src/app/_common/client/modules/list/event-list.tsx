import { AppContext } from '@/app/_common/client/context/app-context'
import { determineTraceColor } from '@/app/_common/helpers/trace-helpers'
import { eventsVM } from '@/app/calendar-events/client/view-models/retrieve-events-view-model'
import { Trace } from '@/app/traces/business/models/trace'
import { Box, Card, Typography } from '@mui/material'
import { useContext } from 'react'
import { useSelector } from 'react-redux'

export function AppEventList() {
    const events = useSelector(eventsVM())
    const { setOpenModal } = useContext(AppContext)

    return (
        <Box sx={{ border: '1px solid rgba(0, 0, 0, .3)', flexGrow: 1 }}>
            {events.map((event) => (
                <Box key={event.id}>
                    <Card
                        sx={eventCardStyle}
                        onClick={() => {
                            setOpenModal({ open: true, event })
                        }}
                    >
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
                            <Box>
                                <Typography variant={'h6'}>{event.title}</Typography>
                                {event.startDate === event.endDate && (
                                    <Typography variant={'caption'}>{`${new Date(
                                        event.startDate,
                                    ).toLocaleDateString()}`}</Typography>
                                )}
                                {event.startDate !== event.endDate && (
                                    <Typography variant={'caption'}>{`Du ${new Date(
                                        event.startDate,
                                    ).toLocaleDateString()} au ${new Date(
                                        event.endDate,
                                    ).toLocaleDateString()}`}</Typography>
                                )}
                            </Box>
                            <Box sx={{ my: 1, display: 'flex', gap: 1 }}>
                                {event.traces.map((trace: Trace) => (
                                    <Typography
                                        key={trace.id}
                                        variant={'caption'}
                                        sx={{
                                            fontWeight: 'bold',
                                            color: determineTraceColor(trace),
                                            borderBottom: `5px solid ${determineTraceColor(trace)}`,
                                        }}
                                    >{`${trace.distance} kms`}</Typography>
                                ))}
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
    transition: 'transform 0.5s',
    '&:hover': {
        transform: 'scale(1.02)',
    },
}
