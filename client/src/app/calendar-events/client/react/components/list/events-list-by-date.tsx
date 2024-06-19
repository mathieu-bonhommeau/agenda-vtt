import { getWeeks } from '@/app/_common/helpers/date-helpers'
import { StyledBadge } from '@/app/calendar-events/client/react/components/list/event-list'
import { EventListCard } from '@/app/calendar-events/client/react/components/list/event-list-card'
import { eventsVMByDate } from '@/app/calendar-events/client/view-models/retrieve-events-view-model'
import PinXC from '@/assets/icons/pin_xc.svg'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, AccordionSummary, Box, Chip, Typography } from '@mui/material'
import Image from 'next/image'
import { useSelector } from 'react-redux'

export function EventsListByDate() {
    const events = useSelector(eventsVMByDate())

    const weeks = getWeeks(new Date(), 52)

    return (
        <Box sx={{ p: 2 }}>
            {Object.keys(events).map((weekNumber: string, index) => (
                <Accordion key={`${weekNumber}-${index}`}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="county">
                        <Box display={'flex'} justifyContent={'space-between'} width={'100%'} paddingRight={2}>
                            <Box display={'flex'} alignItems={'center'} gap={2}>
                                <Chip
                                    label={`S. ${weekNumber}`}
                                    variant="outlined"
                                    sx={{ fontWeight: 'bold', fontSize: '1.3rem' }}
                                />
                                <Box display={'flex'} flexDirection={'column'}>
                                    <Typography variant={'caption'}>
                                        Du
                                        <span style={{ fontWeight: 'bold' }}>{` ${weeks[weekNumber].startDate}`}</span>
                                    </Typography>
                                    <Typography variant={'caption'}>
                                        Au<span style={{ fontWeight: 'bold' }}>{` ${weeks[weekNumber].endDate}`}</span>
                                    </Typography>
                                </Box>
                            </Box>
                            <StyledBadge badgeContent={events[weekNumber].length} color="secondary">
                                <Image src={PinXC.src} width={30} height={30} alt="Picture of the author" />
                            </StyledBadge>
                        </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                        {events[weekNumber].map((event, i) => (
                            <EventListCard event={event} key={`${event.title}-${i}`} />
                        ))}
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    )
}
