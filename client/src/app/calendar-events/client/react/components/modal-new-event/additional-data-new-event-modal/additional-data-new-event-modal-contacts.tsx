import { AppState } from '@/app/_common/business/store/appState'
import { AppDispatch } from '@/app/_common/business/store/store'
import { Contact } from '@/app/calendar-events/business/models/event'
import { newEventSlice } from '@/app/calendar-events/business/reducers/new-event-reducer'
import AddBoxIcon from '@mui/icons-material/AddBox'
import DeleteIcon from '@mui/icons-material/Delete'
import {
    Box,
    Card,
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

export function AdditionalDataNewEventModalContacts({
    organizerName,
    organizerEmail,
    organizerWebsite,
}: {
    organizerName: string
    organizerEmail: string
    organizerWebsite: string
}) {
    const dispatch = useDispatch<AppDispatch>()
    const draft = useSelector((state: AppState) => state.newEventState.draft)

    const [contact, setContact] = useState<Contact>({ name: '', phone: '' })

    return (
        <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
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
                <IconButton
                    onClick={() => {
                        dispatch(
                            newEventSlice.actions.onAddOrganizer({
                                name: organizerName,
                                email: organizerEmail,
                                website: organizerWebsite,
                                contacts: [...(draft.organizer?.contacts || []), contact],
                            }),
                        )
                        setContact({ name: '', phone: '' })
                    }}
                >
                    <AddBoxIcon fontSize={'large'} />
                </IconButton>
            </Box>
            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead sx={{ background: '#F2F2F2' }}>
                        <TableRow>
                            <TableCell sx={{ width: '40%' }}>Nom du contact</TableCell>
                            <TableCell sx={{ width: '40%' }}>Téléphone du contact</TableCell>
                            <TableCell sx={{ textAlign: 'center', width: '20%' }}>Supprimer</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {draft.organizer?.contacts &&
                            draft.organizer?.contacts.map((contact, index) => (
                                <TableRow key={contact.name}>
                                    <TableCell sx={{ width: '40%' }}>{contact.name}</TableCell>
                                    <TableCell sx={{ width: '40%' }}>{contact.phone}</TableCell>
                                    <TableCell
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <IconButton
                                            onClick={() => dispatch(newEventSlice.actions.onRemoveContact(index))}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Card>
    )
}
