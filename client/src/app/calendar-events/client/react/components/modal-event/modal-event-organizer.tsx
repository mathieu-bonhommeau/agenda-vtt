import { EventOrganizer } from '@/app/calendar-events/business/models/event'
import { Link, ListItem, ListItemText } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { FaPhone } from 'react-icons/fa'
import { MdOutlineMail } from 'react-icons/md'
import { RiChromeLine } from 'react-icons/ri'

export function ModalEventOrganizer(props: { organizer: EventOrganizer }) {
    return (
        <>
            <Typography sx={{ mt: 2 }}>Organisateurs</Typography>
            <ListItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'baseline' }}>
                <Typography sx={{ fontWeight: 'bold', paddingBottom: 1 }} variant={'subtitle1'}>
                    {props.organizer.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <MdOutlineMail style={{ fontSize: 22 }} />
                    <Link href={`mailto:${props.organizer.email}`} variant="body2">
                        {props.organizer.email}
                    </Link>
                </Box>
                {props.organizer.website && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <RiChromeLine style={{ fontSize: 22 }} />
                        <Link href={props.organizer.website} target={'_blank'} variant="body2">
                            {props.organizer.website}
                        </Link>
                    </Box>
                )}
                {props.organizer.contacts &&
                    props.organizer.contacts.map((contact, index) => (
                        <Box key={`${contact.name}-${index}`} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <FaPhone style={{ fontSize: 12 }} />
                            <Box>
                                <ListItemText primary={`${contact.name} - ${contact.phone}`} />
                            </Box>
                        </Box>
                    ))}
            </ListItem>
        </>
    )
}
