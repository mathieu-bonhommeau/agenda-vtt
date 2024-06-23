import { AppContext } from '@/app/_common/client/context/app-context'
import { EventLocation } from '@/app/calendar-events/business/models/geolocation'
import { CalendarEventVM } from '@/app/calendar-events/client/view-models/retrieve-events-view-model'
import { Chip, Grid, IconButton, Stack } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useMediaQuery, useTheme } from '@mui/system'
import { Dispatch, SetStateAction, useContext } from 'react'
import { IoLogOut } from 'react-icons/io5'

export function ModalEventTitle(props: {
    title: string
    eventLocation: EventLocation
    startDate: string
    endDate: string
    setOpen?: Dispatch<SetStateAction<{ open: boolean; event: CalendarEventVM | undefined }>>
}) {
    const { locale, setErrors } = useContext(AppContext)
    const theme = useTheme()
    const isLg = useMediaQuery(theme.breakpoints.up('lg'))

    return (
        <Grid
            container
            spacing={2}
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                paddingBottom: 2,
                textAlign: 'left',
                position: 'relative',
            }}
        >
            {props.setOpen && (
                <IconButton
                    sx={{
                        position: 'absolute',
                        top: 15,
                        right: 0,
                    }}
                    onClick={() => {
                        props.setOpen!({ open: false, event: undefined })
                        setErrors([])
                    }}
                >
                    <IoLogOut />
                </IconButton>
            )}
            <Grid item lg={6} xs={12} display={'flex'} flexDirection={'column'} alignItems={'flex-start'}>
                <Typography variant="h6" component="h2">
                    {props.title}
                </Typography>
                <Typography variant={'caption'}>
                    {`${props.eventLocation.address} - ${props.eventLocation.city} - ${props.eventLocation.postcode} - ${props.eventLocation.county}`}
                </Typography>
            </Grid>
            <Grid
                item
                lg={6}
                xs={12}
                sx={{ display: 'flex', flexDirection: 'column', alignItems: isLg ? 'flex-end' : 'flex-start' }}
            >
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
            </Grid>
        </Grid>
    )
}
