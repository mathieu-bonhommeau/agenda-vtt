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

export function AdditionalDataNewEventModalPrice() {
    const dispatch = useDispatch<AppDispatch>()
    const draft = useSelector((state: AppState) => state.newEventState.draft)
    const [price, setPrice] = useState<string>('')

    return (
        <Box my={2} display={'flex'} flexDirection={'column'} gap={1}>
            <TextField
                fullWidth
                onChange={(e) => setPrice(e.target.value)}
                placeholder={'Ex: 5€, gratuit moins 16ans...'}
                id="outlined-basic"
                label="Prix de l'événement"
                variant="outlined"
                value={price}
                InputProps={{
                    endAdornment: price && (
                        <IconButton
                            onClick={(e) => {
                                dispatch(newEventSlice.actions.onAddPrice({ price }))
                                setPrice('')
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
                            <TableCell sx={{ width: '80%' }}>Prix</TableCell>
                            <TableCell sx={{ textAlign: 'center', width: '20%' }}>Supprimer</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {draft.price &&
                            draft.price.map((price, index) => (
                                <TableRow key={price.price}>
                                    <TableCell sx={{ width: '80%' }}>{price.price}</TableCell>
                                    <TableCell
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <IconButton
                                            onClick={() => dispatch(newEventSlice.actions.onRemovePrice(index))}
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
