import { AppState } from '@/app/_common/business/store/appState'
import { AppDispatch } from '@/app/_common/business/store/store'
import { newEventSlice } from '@/app/calendar-events/business/reducers/new-event-reducer'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import {
    Box,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from '@mui/material'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export function AdditionalDataNewEventModalServices() {
    const dispatch = useDispatch<AppDispatch>()
    const draft = useSelector((state: AppState) => state.newEventState.draft)

    const [service, setService] = useState<string>('')

    return (
        <Box my={2} display={'flex'} flexDirection={'column'} gap={1}>
            <TextField
                onChange={(e) => setService(e.target.value)}
                placeholder={'Ex: Parking gratuit, Station de lavage, ...'}
                id="outlined-basic"
                label="Services disponibles"
                variant="outlined"
                value={service}
                InputProps={{
                    endAdornment: service && (
                        <IconButton
                            onClick={(e) => {
                                dispatch(newEventSlice.actions.onAddService(service))
                                setService('')
                            }}
                            sx={{ fontSize: '1.3rem' }}
                        >
                            <AddCircleIcon />
                        </IconButton>
                    ),
                }}
            />
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead sx={{ background: '#F2F2F2' }}>
                        <TableRow>
                            <TableCell sx={{ width: '80%' }}>Service</TableCell>
                            <TableCell sx={{ textAlign: 'center', width: '20%' }}>Supprimer</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {draft.services &&
                            draft.services.map((service, index) => (
                                <TableRow key={service}>
                                    <TableCell sx={{ width: '40%' }}>{service}</TableCell>
                                    <TableCell
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <IconButton
                                            onClick={() => dispatch(newEventSlice.actions.onRemoveService(index))}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}
