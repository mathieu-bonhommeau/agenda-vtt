import { AppState } from '@/app/_common/business/store/appState'
import { AppDispatch } from '@/app/_common/business/store/store'
import { Contact } from '@/app/calendar-events/business/models/event'
import { newEventSlice } from '@/app/calendar-events/business/reducers/new-event-reducer'
import AddBoxIcon from '@mui/icons-material/AddBox'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import {
    Box,
    Divider,
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
import { MdClear } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'

export function AdditionalDataNewEventModal() {
    const dispatch = useDispatch<AppDispatch>()
    const draft = useSelector((state: AppState) => state.newEventState.draft)

    const [price, setPrice] = useState<string>('')
    const [organizerName, setOrganizerName] = useState<string>('')
    const [organizerEmail, setOrganizerEmail] = useState<string>('')
    const [organizerWebsite, setOrganizerWebsite] = useState<string>('')
    const [contact, setContact] = useState<Contact>({ name: '', phone: '' })

    return (
        <>
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
                                onClick={(e) => dispatch(newEventSlice.actions.onAddPrice({ price }))}
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
            <Divider />
            <Box my={2} display={'flex'} flexDirection={'column'} gap={1}>
                <TextField
                    onChange={(e) => setOrganizerName(e.target.value)}
                    placeholder={"Nom de l'organisateur"}
                    id="outlined-basic"
                    label="Nom de l'organisateur"
                    variant="outlined"
                    value={organizerName}
                    InputProps={{
                        endAdornment: organizerName && (
                            <IconButton
                                aria-label="reset-dates"
                                onClick={() => setOrganizerName('')}
                                sx={{ fontSize: '1.3rem' }}
                            >
                                <MdClear />
                            </IconButton>
                        ),
                    }}
                />
                <TextField
                    onChange={(e) => setOrganizerName(e.target.value)}
                    placeholder={"Email de l'organisateur"}
                    id="outlined-basic"
                    label="Email de l'organisateur"
                    variant="outlined"
                    value={organizerEmail}
                    type={'email'}
                    InputProps={{
                        endAdornment: organizerEmail && (
                            <IconButton
                                aria-label="reset-dates"
                                onClick={() => setOrganizerEmail('')}
                                sx={{ fontSize: '1.3rem' }}
                            >
                                <MdClear />
                            </IconButton>
                        ),
                    }}
                />
                <TextField
                    onChange={(e) => setOrganizerWebsite(e.target.value)}
                    placeholder={"Site web de l'organisateur"}
                    id="outlined-basic"
                    label="Site web de l'organisateur"
                    variant="outlined"
                    value={organizerWebsite}
                    type={'url'}
                    InputProps={{
                        endAdornment: organizerWebsite && (
                            <IconButton
                                aria-label="reset-dates"
                                onClick={() => setOrganizerWebsite('')}
                                sx={{ fontSize: '1.3rem' }}
                            >
                                <MdClear />
                            </IconButton>
                        ),
                    }}
                />
                <Box sx={{border: '1px solid '}}>
                    <Box display={'flex'} gap={1}>
                        <TextField
                            sx={{ width: '50%' }}
                            onChange={(e) => setContact({ ...contact, name: e.target.value })}
                            placeholder={'Nom du contact'}
                            id="outlined-basic"
                            label="Nom du contact"
                            variant="outlined"
                            value={contact?.name || ''}
                            InputProps={{
                                endAdornment: contact?.name && (
                                    <IconButton
                                        aria-label="reset-dates"
                                        onClick={() => setContact({ ...contact, name: '' })}
                                        sx={{ fontSize: '1.3rem' }}
                                    >
                                        <MdClear />
                                    </IconButton>
                                ),
                            }}
                        />
                        <TextField
                            sx={{ width: '50%' }}
                            onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                            placeholder={'Numéro de téléphone'}
                            id="outlined-basic"
                            label="Numéro de téléphone"
                            variant="outlined"
                            value={contact?.phone}
                            InputProps={{
                                endAdornment: contact?.phone && (
                                    <IconButton
                                        aria-label="reset-dates"
                                        onClick={() => setContact({ ...contact, phone: '' })}
                                        sx={{ fontSize: '1.3rem' }}
                                    >
                                        <MdClear />
                                    </IconButton>
                                ),
                            }}
                        />
                        <IconButton>
                            <AddBoxIcon fontSize={'large'} />
                        </IconButton>
                    </Box>
                </Box>

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
        </>
    )
}
