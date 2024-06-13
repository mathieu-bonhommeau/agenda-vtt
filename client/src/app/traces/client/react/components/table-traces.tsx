import { AppDispatch } from '@/app/_common/business/store/store'
import { newEventSlice } from '@/app/calendar-events/business/reducers/new-event-reducer'
import {
    TraceLevelLabel,
    traceLevelLabel,
} from '@/app/calendar-events/client/react/components/modal-new-event/traces-new-event-modal/traces-new-event-modal'
import { Trace } from '@/app/traces/business/models/trace'
import { DifficultyColorsStyle, difficultyColorsStyle } from '@/theme/theme'
import DeleteIcon from '@mui/icons-material/Delete'
import {
    Chip,
    IconButton,
    Link,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import { useDispatch } from 'react-redux'

export function TableTraces({
    traces,
    customCss,
    deleteBtn,
}: {
    traces: Partial<Trace>[] | undefined
    customCss: { [key: string]: string | number }
    deleteBtn: boolean
}) {
    const dispatch = useDispatch<AppDispatch>()

    return (
        <TableContainer component={Paper} sx={customCss}>
            <Table aria-label="customized table">
                <TableHead sx={{ background: '#F2F2F2' }}>
                    <TableRow>
                        <TableCell>Distance</TableCell>
                        <TableCell>Difficulté</TableCell>
                        <TableCell>Dénivelé+</TableCell>
                        <TableCell>Trace Gpx</TableCell>
                        {deleteBtn && <TableCell>Supprimer</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {traces &&
                        traces.map((trace) => (
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
                                <TableCell
                                    sx={{
                                        color: difficultyColorsStyle[trace.traceColor as keyof DifficultyColorsStyle],
                                    }}
                                >
                                    {traceLevelLabel[trace.traceColor as keyof TraceLevelLabel] || 'non communiqué'}
                                </TableCell>
                                <TableCell>{trace.positiveElevation || 'non communiqué'}</TableCell>
                                <TableCell>
                                    {trace.link ? (
                                        <Link href={trace.link} target={'_blank'} variant="body2">
                                            Lien vers la trace Gpx
                                        </Link>
                                    ) : (
                                        <Typography variant={'caption'} color={'gray'}>
                                            Trace Gpx indisponible
                                        </Typography>
                                    )}
                                </TableCell>
                                <TableCell sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <IconButton onClick={() => dispatch(newEventSlice.actions.onDeleteTrace(trace.id))}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
