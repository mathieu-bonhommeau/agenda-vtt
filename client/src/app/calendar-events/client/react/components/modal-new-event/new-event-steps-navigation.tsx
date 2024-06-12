import { NewEventStepButtons } from '@/app/calendar-events/client/react/components/modal-new-event/main-data-new-event-modal/main-data-new-event-modal'
import { newEventDraftCurrentStepVM } from '@/app/calendar-events/client/view-models/new-event-view-model'
import ArrowBackIosSharpIcon from '@mui/icons-material/ArrowBackIosSharp'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import { IconButton } from '@mui/material'
import Box from '@mui/material/Box'
import React from 'react'
import { useSelector } from 'react-redux'

export function NewEventStepsNavigation({
    handleStep,
}: {
    handleStep: (e: React.MouseEvent<HTMLElement>, step: NewEventStepButtons) => void
}) {
    const currentStep = useSelector(newEventDraftCurrentStepVM)
    return (
        <Box display={'flex'} justifyContent={'space-between'}>
            <IconButton
                aria-label="next"
                size={'small'}
                disabled={currentStep === 'MAIN_DATA'}
                color="primary"
                sx={{ border: '1px solid rgb(231, 221, 221)', borderRadius: '5px' }}
                onClick={(e) => handleStep(e, 'PREVIOUS')}
            >
                <ArrowBackIosSharpIcon />
            </IconButton>
            <IconButton
                aria-label="next"
                size={'small'}
                disabled={currentStep === 'OVERVIEW'}
                sx={{ border: '1px solid rgb(231, 221, 221)', borderRadius: '5px' }}
                onClick={(e) => handleStep(e, 'NEXT')}
            >
                <ArrowForwardIosSharpIcon />
            </IconButton>
        </Box>
    )
}
