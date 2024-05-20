import { CalendarEvent } from '@/app/calendar-events/business/models/event'
import { Trace } from '@/app/traces/business/models/trace'
import {
    Chip,
    Divider,
    Link,
    ListItem,
    ListItemText,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { Dispatch, SetStateAction } from 'react'
import { AiOutlineEuro } from 'react-icons/ai'
import { FaPhone } from 'react-icons/fa'
import { MdOutlineMail } from 'react-icons/md'
import { RiChromeLine } from 'react-icons/ri'

export type ModalEventProps = {
    event: CalendarEvent
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export default function ModalEvent({ event, open, setOpen }: ModalEventProps) {
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <Modal
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 1 }}>
                        <Box>
                            <Typography variant="h6" component="h2">
                                {event.title}
                            </Typography>
                            <Typography variant={'caption'}>
                                {`${event.eventLocation.address} - ${event.eventLocation.city} - ${event.eventLocation.postcode} - ${event.eventLocation.department}`}
                            </Typography>
                        </Box>
                        {event.startDate === event.endDate && (
                            <Stack direction="row" spacing={1}>
                                <Chip
                                    label={`${new Date(event.startDate).toLocaleDateString()}`}
                                    color="warning"
                                    variant={'outlined'}
                                />
                            </Stack>
                        )}
                        {event.startDate !== event.endDate && (
                            <Stack direction="row" spacing={1}>
                                <Chip
                                    label={`Du ${new Date(event.startDate).toLocaleDateString()}`}
                                    color="warning"
                                    variant={'outlined'}
                                />
                                <Chip
                                    label={`au ${new Date(event.endDate).toLocaleDateString()}`}
                                    color="warning"
                                    variant={'outlined'}
                                />
                            </Stack>
                        )}
                    </Box>
                    <Divider />
                    <Typography sx={{ my: 2 }}>{event.description}</Typography>
                    <Divider />
                    <Box sx={{ my: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Typography>Parcours</Typography>
                        <Link
                            href={`https:\\maps.google.com/?q=${event.eventLocation.latLon.lat},${event.eventLocation.latLon.lon}`}
                            variant="body2"
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
                                {event.traces.map((trace: Trace) => (
                                    <TableRow key={trace.id}>
                                        <TableCell>
                                            <Chip label={`${trace.distance} kms`} color={'warning'} />
                                        </TableCell>
                                        <TableCell>{trace.traceColor || 'non communiqué'}</TableCell>
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
                    <Divider />
                    <Typography sx={{ mt: 2 }}>Tarifs</Typography>
                    <ListItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'baseline' }}>
                        {event.price &&
                            event.price.map((p, index) => (
                                <Box key={`${p.price}-${index}`} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <AiOutlineEuro style={{ fontSize: 25 }} />
                                    <ListItemText primary={p.price} />
                                </Box>
                            ))}
                    </ListItem>
                    <Divider />
                    <Typography sx={{ mt: 2 }}>Organisateurs</Typography>
                    <ListItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'baseline' }}>
                        <Typography sx={{ fontWeight: 'bold', paddingBottom: 1 }} variant={'subtitle1'}>
                            {event.organizer.name}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <MdOutlineMail style={{ fontSize: 22 }} />
                            <Link href={`mailto:${event.organizer.email}`} variant="body2">
                                {event.organizer.email}
                            </Link>
                        </Box>
                        {event.organizer.website && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <RiChromeLine style={{ fontSize: 22 }} />
                                <Link href={event.organizer.website} variant="body2">
                                    {event.organizer.website}
                                </Link>
                            </Box>
                        )}
                        {event.organizer.contacts &&
                            event.organizer.contacts.map((contact, index) => (
                                <Box
                                    key={`${contact.name}-${index}`}
                                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                                >
                                    <FaPhone style={{ fontSize: 12 }} />
                                    <Box>
                                        <ListItemText primary={`${contact.name} - ${contact.phone}`} />
                                    </Box>
                                </Box>
                            ))}
                    </ListItem>
                    <Divider />
                    <Typography sx={{ my: 2 }}>Infos pratiques</Typography>
                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        {event.services &&
                            event.services.map((service, index) => (
                                <Chip key={`${service}-${index}`} label={service} variant={'outlined'} />
                                /*<ListItem>
                                    <Box>
                                        <ListItemText  primary={service} />
                                    </Box>
                                </ListItem>*/
                            ))}
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflowY: 'scroll',
    height: '80vh',
}
