import { AppContext } from '@/app/_common/client/context/app-context'
import { determineTraceColor } from '@/app/_common/helpers/trace-helpers'
import { CalendarEvent } from '@/app/calendar-events/business/models/event'
import { Trace } from '@/app/traces/business/models/trace'
import { Box, Card, Chip, Typography } from '@mui/material'
import { useContext } from 'react'

export function EventListCard({ event }: { event: CalendarEvent }) {
    const { setOpenModal, locale } = useContext(AppContext)

    return (
        <Card
            key={event.id}
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
                <Box display={'flex'} flexDirection={'column'} justifyContent={'space-around'} alignItems={'flex-end'}>
                    <Typography sx={{ fontSize: '2rem', fontWeight: 'bold', opacity: '0.5' }}>
                        {event.eventLocation.postcode?.slice(0, 2)}
                    </Typography>
                    <Box display={'flex'} gap={1}>
                        <Chip label={event.eventLocation.city} size={'small'} />
                    </Box>
                </Box>
            </Box>
        </Card>
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
