import { AppContext } from '@/app/_common/client/context/app-context'
import { EventLocation } from '@/app/calendar-events/business/models/geolocation'
import { CalendarEventVM } from '@/app/calendar-events/client/view-models/retrieve-events-view-model'
import { Chip, IconButton, Stack } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Dispatch, SetStateAction, useContext } from 'react'
import { IoLogOut } from 'react-icons/io5'

export function ModalEventTitle(props: {
    title: string
    eventLocation: EventLocation
    startDate: string
    endDate: string
    setOpen: Dispatch<SetStateAction<{ open: boolean; event: CalendarEventVM | undefined }>>
}) {
    const { locale } = useContext(AppContext)

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                paddingBottom: 2,
                textAlign: 'left',
            }}
        >
            <Box display={'flex'} flexDirection={'column'} alignItems={'flex-start'}>
                <Typography variant="h6" component="h2">
                    {props.title}
                </Typography>
                <Typography variant={'caption'}>
                    {`${props.eventLocation.address} - ${props.eventLocation.city} - ${props.eventLocation.postcode} - ${props.eventLocation.county}`}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <IconButton onClick={() => props.setOpen({ open: false, event: undefined })}>
                    <IoLogOut />
                </IconButton>
                {props.startDate === props.endDate && (
                    <Stack direction="row" spacing={1}>
                        <Chip
                            label={`${new Date(props.startDate).toLocaleDateString(locale)}`}
                            color="warning"
                            variant={'outlined'}
                        />
                    </Stack>
                )}
                {props.startDate !== props.endDate && (
                    <Stack direction="row" spacing={1}>
                        <Chip
                            label={`Du ${new Date(props.startDate).toLocaleDateString(locale)}`}
                            color="warning"
                            variant={'outlined'}
                        />
                        <Chip
                            label={`au ${new Date(props.endDate).toLocaleDateString(locale)}`}
                            color="warning"
                            variant={'outlined'}
                        />
                    </Stack>
                )}
            </Box>
        </Box>
    )
}
