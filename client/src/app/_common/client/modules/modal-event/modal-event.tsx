import { AppContext } from '@/app/_common/client/context/app-context'
import { ModalEventFacilities } from '@/app/_common/client/modules/modal-event/modal-event-facilities'
import { ModalEventMap } from '@/app/_common/client/modules/modal-event/modal-event-map'
import { ModalEventOrganizer } from '@/app/_common/client/modules/modal-event/modal-event-organizer'
import { ModalEventPrices } from '@/app/_common/client/modules/modal-event/modal-event-prices'
import { ModalEventTitle } from '@/app/_common/client/modules/modal-event/modal-event-title'
import { ModalEventTraces } from '@/app/_common/client/modules/modal-event/modal-event-traces'
import { Divider } from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'
import { useContext, useEffect, useRef } from 'react'

export default function ModalEvent() {
    const modalRef = useRef<HTMLDivElement>(null)
    const { openModal, setOpenModal } = useContext(AppContext)

    useEffect(() => {
        if (!modalRef.current) return
        modalRef.current.scrollTo(0, 0)
    }, [])

    const handleClose = () => {
        setOpenModal({ open: false, event: undefined })
    }

    return (
        <div>
            {openModal.event && (
                <Modal
                    ref={modalRef}
                    keepMounted
                    open={openModal.open}
                    onClose={handleClose}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box sx={style}>
                        <ModalEventTitle
                            title={openModal.event.title}
                            eventLocation={openModal.event.eventLocation}
                            startDate={openModal.event.startDate}
                            endDate={openModal.event.endDate}
                            setOpen={setOpenModal}
                        />
                        {openModal.open && (
                            <ModalEventMap eventLocation={openModal.event.eventLocation} event={openModal.event} />
                        )}
                        <Divider />
                        <Typography sx={{ my: 2 }}>{openModal.event.description}</Typography>
                        <Divider />
                        <ModalEventTraces
                            eventLocation={openModal.event.eventLocation}
                            traces={openModal.event.traces}
                        />
                        <Divider />
                        <ModalEventPrices price={openModal.event.price} />
                        <Divider />
                        <ModalEventOrganizer organizer={openModal.event.organizer} />
                        <Divider />
                        <ModalEventFacilities services={openModal.event.services} />
                    </Box>
                </Modal>
            )}
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
