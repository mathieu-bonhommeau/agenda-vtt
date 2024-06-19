import { AppState } from '@/app/_common/business/store/appState'
import { AppDispatch } from '@/app/_common/business/store/store'
import { AppContext } from '@/app/_common/client/context/app-context'
import { newEventSlice } from '@/app/calendar-events/business/reducers/new-event-reducer'
import { AdditionalDataNewEventModalContacts } from '@/app/calendar-events/client/react/components/modal-new-event/additional-data-new-event-modal/additional-data-new-event-modal-contacts'
import { AdditionalDataNewEventModalPrice } from '@/app/calendar-events/client/react/components/modal-new-event/additional-data-new-event-modal/additional-data-new-event-modal-price'
import { AdditionalDataNewEventModalServices } from '@/app/calendar-events/client/react/components/modal-new-event/additional-data-new-event-modal/additional-data-new-event-modal-services'
import { NewEventStepButtons } from '@/app/calendar-events/client/react/components/modal-new-event/main-data-new-event-modal/main-data-new-event-modal'
import { NewEventStepsNavigation } from '@/app/calendar-events/client/react/components/modal-new-event/new-event-steps-navigation'
import { Box, Divider, IconButton, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { MdClear } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'

export function AdditionalDataNewEventModal() {
    const dispatch = useDispatch<AppDispatch>()
    const draft = useSelector((state: AppState) => state.newEventState.draft)

    const [organizerName, setOrganizerName] = useState<string>(draft.organizer?.name || '')
    const [organizerEmail, setOrganizerEmail] = useState<string>(draft.organizer?.email || '')
    const [organizerWebsite, setOrganizerWebsite] = useState<string>(draft.organizer?.website || '')

    const { setErrors } = useContext(AppContext)

    const validateOrganizerData = () => {
        const errors: string[] = []

        if (!organizerName) errors.push(`L'organisateur est obligatoire`)
        if (!organizerEmail) errors.push(`L'email de l'organisateur' est obligatoire`)
        return errors
    }

    const handleStep = (e: React.MouseEvent<HTMLElement>, step: NewEventStepButtons) => {
        if (step === 'NEXT') {
            const err = validateOrganizerData()
            if (err.length > 0) {
                setErrors(err)
                return
            }
            if (!draft.organizer)
                dispatch(
                    newEventSlice.actions.onAddOrganizer({
                        name: organizerName,
                        email: organizerEmail,
                        website: organizerWebsite,
                    }),
                )
            dispatch(newEventSlice.actions.onAdditionalDataValidate())
            setErrors([])
        }
        if (step === 'PREVIOUS') {
            dispatch(newEventSlice.actions.onDefineStepAsked('TRACES'))
        }
    }

    return (
        <Box
            component={'form'}
            sx={{ my: 2 }}
            noValidate
            autoComplete="off"
            display={'flex'}
            flexDirection={'column'}
            height={'100%'}
        >
            <AdditionalDataNewEventModalPrice />
            <Divider />
            <Box my={2} display={'flex'} flexDirection={'column'} gap={1}>
                <TextField
                    required
                    onChange={(e) => setOrganizerName(e.target.value)}
                    placeholder={"Nom de l'organisateur"}
                    id="outlined-basic"
                    label="Nom de l'organisateur"
                    variant="outlined"
                    value={organizerName}
                    InputProps={{
                        endAdornment: organizerName && (
                            <IconButton
                                aria-label="reset-dates"
                                onClick={() => setOrganizerName('')}
                                sx={{ fontSize: '1.3rem' }}
                            >
                                <MdClear />
                            </IconButton>
                        ),
                    }}
                />
                <TextField
                    required
                    onChange={(e) => setOrganizerEmail(e.target.value)}
                    placeholder={"Email de l'organisateur"}
                    id="outlined-basic"
                    label="Email de l'organisateur"
                    variant="outlined"
                    value={organizerEmail}
                    InputProps={{
                        type: 'email',
                        endAdornment: organizerEmail && (
                            <IconButton
                                aria-label="reset-dates"
                                onClick={() => setOrganizerEmail('')}
                                sx={{ fontSize: '1.3rem' }}
                            >
                                <MdClear />
                            </IconButton>
                        ),
                    }}
                />
                <TextField
                    onChange={(e) => setOrganizerWebsite(e.target.value)}
                    placeholder={"Site web de l'organisateur"}
                    id="outlined-basic"
                    label="Site web de l'organisateur"
                    variant="outlined"
                    value={organizerWebsite}
                    InputProps={{
                        type: 'url',
                        endAdornment: organizerWebsite && (
                            <IconButton
                                aria-label="reset-dates"
                                onClick={() => setOrganizerWebsite('')}
                                sx={{ fontSize: '1.3rem' }}
                            >
                                <MdClear />
                            </IconButton>
                        ),
                    }}
                />
                <AdditionalDataNewEventModalContacts
                    organizerEmail={organizerEmail}
                    organizerName={organizerName}
                    organizerWebsite={organizerWebsite}
                />
            </Box>

            <Divider />
            <AdditionalDataNewEventModalServices />
            <NewEventStepsNavigation handleStep={handleStep} />
        </Box>
    )
}
