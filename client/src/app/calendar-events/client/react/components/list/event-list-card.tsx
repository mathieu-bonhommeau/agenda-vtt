import { AppContext } from '@/app/_common/client/context/app-context'
import { determineTraceColor } from '@/app/_common/helpers/trace-helpers'
import { CalendarEvent } from '@/app/calendar-events/business/models/event'
import { Trace } from '@/app/traces/business/models/trace'
import { Box, Card, Chip, Grid, Typography } from '@mui/material'
import { useMediaQuery, useTheme } from '@mui/system'
import { useContext } from 'react'

export function EventListCard({ event }: { event: CalendarEvent }) {
    const { setOpenModal, locale } = useContext(AppContext)
    const theme = useTheme()
    const isMd = useMediaQuery(theme.breakpoints.up('md'))

    return (
        <Card
            key={event.title}
            sx={eventCardStyle}
            onClick={() => {
                setOpenModal({ open: true, event })
            }}
        >
            <Grid container sx={{ display: 'flex', justifyContent: 'space-between', px: 2, py: 1 }}>
                <Grid item md={8} xs={12} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
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
                    <Typography variant={isMd ? 'h6' : 'inherit'}>{event.title}</Typography>
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
                </Grid>
                <Grid
                    item
                    md={8}
                    xs={12}
                    display={'flex'}
                    flexDirection={isMd ? 'column' : 'row'}
                    justifyContent={isMd ? 'space-around' : 'space-between'}
                    alignItems={isMd ? 'flex-end' : 'center'}
                >
                    <Typography sx={{ fontSize: isMd ? '2rem' : '1.5rem', fontWeight: 'bold', opacity: '0.5' }}>
                        {event.eventLocation.postcode?.slice(0, 2)}
                    </Typography>
                    <Box display={'flex'} gap={1}>
                        <Chip label={event.eventLocation.city} size={'small'} />
                    </Box>
                </Grid>
            </Grid>
        </Card>
    )
}

const eventCardStyle = {
    p: 0,
    m: 2,
    maxWidth: '500px',
    scale: 1,
    transition: 'transform 0.3s',
    '&:hover': {
        transform: 'scale(1.02)',
    },
}
