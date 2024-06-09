import { AppDispatch } from '@/app/_common/business/store/store'
import { newEventSlice } from '@/app/calendar-events/business/reducers/new-event-reducer'
import { MainDataNewEventModal } from '@/app/calendar-events/client/react/components/modal-new-event/main-data-new-event-modal/main-data-new-event-modal'
import { styleModal } from '@/app/calendar-events/client/react/styles/style-modal'
import {
    newEventDraftCurrentStepVM,
    newEventDraftStepLengthVM,
    NewEventDraftSteps,
} from '@/app/calendar-events/client/view-models/new-event-view-model'
import { Divider, IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { SyntheticEvent, useRef } from 'react'
import { GrLinkPrevious } from 'react-icons/gr'
import { IoLogOut } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'

export function ModalNewEvent() {
    const dispatch = useDispatch<AppDispatch>()
    const modalRef = useRef<HTMLDivElement>(null)
    const stepLength = useSelector(newEventDraftStepLengthVM)
    const currentStep = useSelector(newEventDraftCurrentStepVM)

    console.log(currentStep)

    const handleClose = () => {
        dispatch(newEventSlice.actions.onCloseEventCreationAsked())
    }

    const handleStep = (event: SyntheticEvent, newValue: NewEventDraftSteps) => {
        //setCurrentStep(newValue)
    }

    return (
        <Modal
            ref={modalRef}
            keepMounted
            open={stepLength > 0}
            onClose={handleClose}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box sx={styleModal}>
                <Box display={'flex'} justifyContent={'space-between'} sx={{ py: 1 }}>
                    <Box display={'flex'} gap={1} alignItems={'center'}>
                        <IconButton>
                            <GrLinkPrevious />
                        </IconButton>
                        <Typography variant={'h6'}>Partager un évenement</Typography>
                    </Box>
                    <IconButton onClick={handleClose}>
                        <IoLogOut />
                    </IconButton>
                </Box>
                <Divider />
                <Box sx={{ borderBottom: 1, borderColor: 'divider', paddingTop: 1 }}>
                    {currentStep === 'MAIN_DATA' && <MainDataNewEventModal />}
                    {currentStep === 'TRACES' && <Typography>Traces form</Typography>}
                    {currentStep === 'ADDITIONAL_DATA' && <Typography>Additional data form</Typography>}
                    {currentStep === 'OVERVIEW' && <Typography>overview</Typography>}
                </Box>
            </Box>
        </Modal>
    )
}
