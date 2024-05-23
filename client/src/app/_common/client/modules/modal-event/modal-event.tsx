import { ModalEventFacilities } from '@/app/_common/client/modules/modal-event/modal-event-facilities'
import { ModalEventMap } from '@/app/_common/client/modules/modal-event/modal-event-map'
import { ModalEventOrganizer } from '@/app/_common/client/modules/modal-event/modal-event-organizer'
import { ModalEventPrices } from '@/app/_common/client/modules/modal-event/modal-event-prices'
import { ModalEventTitle } from '@/app/_common/client/modules/modal-event/modal-event-title'
import { ModalEventTraces } from '@/app/_common/client/modules/modal-event/modal-event-traces'
import { CalendarEvent } from '@/app/calendar-events/business/models/event'
import { Divider } from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { Dispatch, SetStateAction, useEffect, useRef } from 'react'

export type ModalEventProps = {
    event: CalendarEvent
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export default function ModalEvent({ event, open, setOpen }: ModalEventProps) {
    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!modalRef.current) return
        modalRef.current.scrollTo(0, 0)
    }, [])

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <Modal
                ref={modalRef}
                keepMounted
                open={open}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    <ModalEventTitle
                        title={event.title}
                        eventLocation={event.eventLocation}
                        startDate={event.startDate}
                        endDate={event.endDate}
                        setOpen={setOpen}
                    />
                    {open && <ModalEventMap eventLocation={event.eventLocation} event={event} />}
                    <Divider />
                    <Typography sx={{ my: 2 }}>{event.description}</Typography>
                    <Divider />
                    <ModalEventTraces eventLocation={event.eventLocation} traces={event.traces} />
                    <Divider />
                    <ModalEventPrices price={event.price} />
                    <Divider />
                    <ModalEventOrganizer organizer={event.organizer} />
                    <Divider />
                    <ModalEventFacilities services={event.services} />
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
    padding: '12px 32px 32px 32px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    overflowY: 'scroll',
    height: '80vh',
}
