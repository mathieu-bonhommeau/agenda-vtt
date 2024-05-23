import { EventLocation } from '@/app/calendar-events/business/models/geolocation'
import { Trace } from '@/app/traces/business/models/trace'
import { Chip, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
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
            <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
                <Table aria-label="customized table">
                    <TableHead sx={{ background: '#F2F2F2' }}>
                        <TableRow>
                            <TableCell>Distance</TableCell>
                            <TableCell>Difficulté</TableCell>
                            <TableCell>Dénivelé+</TableCell>
                            <TableCell>Trace Gpx</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.traces.map((trace) => (
                            <TableRow key={trace.id}>
                                <TableCell>
                                    <Chip
                                        label={`${trace.distance} kms`}
                                        sx={{
                                            color: trace.traceColor || 'grey',
                                            background: 'white',
                                            border: `1px solid ${trace.traceColor || 'grey'}`,
                                        }}
                                    />
                                </TableCell>
                                <TableCell sx={{ color: trace.traceColor }}>
                                    {trace.traceColor || 'non communiqué'}
                                </TableCell>
                                <TableCell>{trace.positiveElevation || 'non communiqué'}</TableCell>
                                <TableCell>
                                    <Link href={trace.link} variant="body2">
                                        Lien vers la trace Gpx
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
