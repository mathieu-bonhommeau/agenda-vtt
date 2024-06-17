import { EventLocation } from '@/app/calendar-events/business/models/geolocation'
import { Trace } from '@/app/traces/business/models/trace'
import { TableTraces } from '@/app/traces/client/react/components/table-traces'
import { Link } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export function ModalEventTraces(props: { eventLocation: EventLocation; traces: Trace[] }) {
    return (
        <>
            <Box sx={{ my: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography>Parcours</Typography>
                <Link
                    href={`https:\\maps.google.com/?q=${props.eventLocation.latLon.lat},${props.eventLocation.latLon.lon}`}
                    variant="body2"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    Aller au départ
                </Link>
            </Box>
            <TableTraces traces={props.traces} customCss={{ marginBottom: 2, overflowX: 'visible' }} />
        </>
    )
}
