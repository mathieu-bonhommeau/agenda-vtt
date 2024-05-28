import { AppContext } from '@/app/_common/client/context/app-context'
import { determineTraceColor } from '@/app/_common/helpers/trace-helpers'
import { CalendarEvent } from '@/app/calendar-events/business/models/event'
import { Trace } from '@/app/traces/business/models/trace'
import { Box, Typography } from '@mui/material'
import { Dispatch, SetStateAction, useContext } from 'react'

export type PopupEventEventProps = {
    event: CalendarEvent
    setOpen: Dispatch<SetStateAction<boolean>>
}

export default function PopupEvent({ event, setOpen }: PopupEventEventProps) {
    const { locale } = useContext(AppContext)
    return (
        <Box sx={style} onPointerLeave={() => setOpen(false)}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: 'bold' }} component="h4">
                    {event.title}
                </Typography>
            </Box>
            <Box>
                {event.startDate === event.endDate && (
                    <Typography variant={'caption'}>{`${new Date(event.startDate).toLocaleDateString(
                        locale,
                    )}`}</Typography>
                )}
                {event.startDate !== event.endDate && (
                    <Typography variant={'caption'}>{`Du ${new Date(event.startDate).toLocaleDateString(
                        locale,
                    )} au ${new Date(event.endDate).toLocaleDateString(locale)}`}</Typography>
                )}
            </Box>
            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
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
                <Typography sx={{ fontWeight: 'bold', opacity: '0.5', alignSelf: 'flex-end' }}>
                    {event.eventLocation.postcode?.slice(0, 2)}
                </Typography>
            </Box>
        </Box>
    )
}

const style = {
    position: 'relative',
    left: '-50%',
    top: '100%',
    transform: 'translateY(10%)',
    background: 'white',
    boxSizing: 'border-box',
    display: 'inline-block',
    fontSize: '16px',
    px: 1,
    py: 0,
    verticalAlign: 'middle',
    width: '100%',
    minWidth: '250px',
    boxShadow: '0 0 8px rgba(0, 0, 0, .3)',
    borderRadius: '5px',
    '&:before': {
        content: "''",
        position: 'absolute',
        top: '-11px',
        left: '50%',
        transform: 'translateX(-50%)',
        borderLeft: '11px solid transparent',
        borderRight: '11px solid transparent',
        borderBottom: '11px solid white',
    },
}
