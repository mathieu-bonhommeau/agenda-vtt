import { AppDispatch } from '@/app/_common/business/store/store'
import { newEventSlice } from '@/app/calendar-events/business/reducers/new-event-reducer'
import { AdditionalDataNewEventModal } from '@/app/calendar-events/client/react/components/modal-new-event/additional-data-new-event-modal/additional-data-new-event-modal'
import { MainDataNewEventModal } from '@/app/calendar-events/client/react/components/modal-new-event/main-data-new-event-modal/main-data-new-event-modal'
import { TracesNewEventModal } from '@/app/calendar-events/client/react/components/modal-new-event/traces-new-event-modal/traces-new-event-modal'
import { styleModal } from '@/app/calendar-events/client/react/styles/style-modal'
import {
    newEventDraftCurrentStepVM,
    newEventDraftStepLengthVM,
    newEventDraftStepsVM,
} from '@/app/calendar-events/client/view-models/new-event-view-model'
import { Breadcrumbs, Button, Divider, IconButton, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { useRef } from 'react'
import { IoLogOut } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'

export function ModalNewEvent() {
    const dispatch = useDispatch<AppDispatch>()
    const modalRef = useRef<HTMLDivElement>(null)
    const stepLength = useSelector(newEventDraftStepLengthVM)
    const currentStep = useSelector(newEventDraftCurrentStepVM)
    const steps = useSelector(newEventDraftStepsVM)

    console.log(currentStep)
    console.log()

    const handleClose = () => {
        dispatch(newEventSlice.actions.onCloseEventCreationAsked())
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
                <Box sx={{ py: 1 }} display={'flex'} flexDirection={'column'}>
                    <Box display={'flex'} justifyContent={'space-between'} px={1}>
                        <Typography variant={'h6'}>Partager un événement</Typography>
                        <IconButton onClick={handleClose}>
                            <IoLogOut />
                        </IconButton>
                    </Box>
                    <Breadcrumbs aria-label="breadcrumb" sx={{ px: 1 }}>
                        {steps.map((step) => (
                            <Button
                                sx={{ textTransform: 'none' }}
                                size={'small'}
                                key={step}
                                disabled={step === currentStep}
                                onClick={() => {
                                    dispatch(newEventSlice.actions.onDefineStepAsked(step))
                                }}
                            >
                                {NewEventModalStepsLabel[step]}
                            </Button>
                        ))}
                    </Breadcrumbs>
                </Box>
                <Divider />
                <Box flexGrow={1}>
                    {currentStep === 'MAIN_DATA' && <MainDataNewEventModal />}
                    {currentStep === 'TRACES' && <TracesNewEventModal />}
                    {currentStep === 'ADDITIONAL_DATA' && <AdditionalDataNewEventModal />}
                    {currentStep === 'OVERVIEW' && <Typography>overview</Typography>}
                </Box>
            </Box>
        </Modal>
    )
}

export const NewEventModalStepsLabel = {
    MAIN_DATA: `Infos principales`,
    TRACES: 'Parcours',
    ADDITIONAL_DATA: 'Informations supplémentaires',
    OVERVIEW: 'Aperçu',
}
