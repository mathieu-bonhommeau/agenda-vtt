import { departmentsList } from '@/app/_common/helpers/deparment-helpers'
import { StyledBadge } from '@/app/calendar-events/client/react/components/list/event-list'
import { EventListCard } from '@/app/calendar-events/client/react/components/list/event-list-card'
import { eventsVMByCounty } from '@/app/calendar-events/client/view-models/retrieve-events-view-model'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Typography } from '@mui/material'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import PinXC from '../../../../../../assets/icons/pin_xc.svg'

export function EventsListByCounty() {
    const events = useSelector(eventsVMByCounty())

    return (
        <Box sx={{ p: 2 }}>
            {Object.keys(events).map((county: string, index: number) => (
                <Accordion key={`${county}-${index}`}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="county">
                        {county !== 'not-defined' && (
                            <Box display={'flex'} justifyContent={'space-between'} width={'100%'} paddingRight={2}>
                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                    <Chip
                                        label={county}
                                        variant="outlined"
                                        sx={{ fontWeight: 'bold', fontSize: '1.3rem' }}
                                    />
                                    <Typography
                                        variant={'caption'}
                                    >{`${departmentsList[county].dep_name} - ${departmentsList[county].region_name}`}</Typography>
                                </Box>
                                <StyledBadge badgeContent={events[county].length} color="secondary">
                                    <Image src={PinXC.src} width={30} height={30} alt="Picture of the author" />
                                </StyledBadge>
                            </Box>
                        )}
                        {county === 'not-defined' && <Typography>Non défini</Typography>}
                    </AccordionSummary>
                    <AccordionDetails>
                        {events[county].map((event, i) => (
                            <EventListCard event={event} key={`${event.title}-${i}`} />
                        ))}
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    )
}
