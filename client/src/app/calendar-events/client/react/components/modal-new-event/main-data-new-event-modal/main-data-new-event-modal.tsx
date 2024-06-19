import { AppState } from '@/app/_common/business/store/appState'
import { AppDispatch } from '@/app/_common/business/store/store'
import { DateRangePickers } from '@/app/_common/client/components/form/date-pickers/date-range-pickers'
import { WysiwygEditor } from '@/app/_common/client/components/form/wysiwyg-editor/wysiwyg-editor'
import { AppContext } from '@/app/_common/client/context/app-context'
import { EventLocation } from '@/app/calendar-events/business/models/geolocation'
import { newEventSlice } from '@/app/calendar-events/business/reducers/new-event-reducer'
import { MainDataNewEventGeolocation } from '@/app/calendar-events/client/react/components/modal-new-event/main-data-new-event-modal/main-data-new-event-geolocation'
import { NewEventStepsNavigation } from '@/app/calendar-events/client/react/components/modal-new-event/new-event-steps-navigation'
import { IconButton, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import dayjs, { Dayjs } from 'dayjs'
import { ContentState, EditorState, convertFromHTML, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import React, { useContext, useState } from 'react'
import { MdClear } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import sanitizeHtml from 'sanitize-html'

export type NewEventStepButtons = 'NEXT' | 'PREVIOUS'

export function MainDataNewEventModal() {
    const dispatch = useDispatch<AppDispatch>()
    const draft = useSelector((state: AppState) => state.newEventState.draft)
    const { locale } = useContext(AppContext)
    const [title, setTitle] = useState<string>(draft.title || '')
    const [newEventDates, setNewEventDates] = useState<{ startDate: Dayjs; endDate: Dayjs }>({
        startDate: dayjs(draft.startDate) || dayjs(new Date()),
        endDate: dayjs(draft.endDate) || dayjs(new Date()),
    })
    const [location, setLocation] = useState<EventLocation | undefined>(draft.eventLocation)

    const { setErrors } = useContext(AppContext)

    const initializeEditorState = (html: string) => {
        const blocksFromHTML = convertFromHTML(html)
        const contentState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap)
        return EditorState.createWithContent(contentState)
    }

    const [editorState, setEditorState] = useState(() =>
        draft.description ? initializeEditorState(draft.description) : EditorState.createEmpty(),
    )

    const getDescriptionHtmlSanitized = () => {
        const contentState = editorState.getCurrentContent()
        return sanitizeHtml(draftToHtml(convertToRaw(contentState)))
    }

    const handleEventDates = (date: { startDate?: string; endDate?: string }) => {
        if (!date?.startDate) date.startDate = dayjs(new Date()).toDate().toDateString()
        if (!date?.endDate) date.endDate = dayjs(new Date()).toDate().toDateString()
        setNewEventDates({ startDate: dayjs(date.startDate), endDate: dayjs(date.endDate) })
    }

    const validateMainData = () => {
        const errors: string[] = []

        if (!title) errors.push('Le titre est obligatoire')

        if (!newEventDates.endDate || !newEventDates.startDate)
            errors.push('Les dates de début et de fin sont obligatoires')

        if (
            newEventDates.endDate &&
            newEventDates.startDate &&
            newEventDates.endDate.isBefore(newEventDates.startDate)
        ) {
            errors.push('La date de fin doit être supérieur à la date de début')
        }

        if (!location) errors.push(`La localisation de l'événement est obligatoire`)
        return errors
    }

    const handleStep = (e: React.MouseEvent<HTMLElement>, step: NewEventStepButtons) => {
        if (step === 'NEXT') {
            const err = validateMainData()
            if (err.length > 0) {
                setErrors(err)
                return
            }

            dispatch(
                newEventSlice.actions.onMainDataValidate({
                    title,
                    startDate: newEventDates.startDate.toDate().toDateString(),
                    endDate: newEventDates.endDate.toDate().toDateString(),
                    eventLocation: location,
                    description: getDescriptionHtmlSanitized() === '<p></p>' ? '' : getDescriptionHtmlSanitized(),
                }),
            )
            setErrors([])
        }
    }

    return (
        <Box display={'flex'} flexDirection={'column'} gap={1}>
            <Box my={1}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, py: 1 }}>
                    <TextField
                        required
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder={"Titre de l'événement"}
                        id="outlined-basic"
                        label="Titre de l'événement"
                        variant="outlined"
                        value={title}
                        InputProps={{
                            endAdornment: title && (
                                <IconButton
                                    aria-label="reset-dates"
                                    onClick={() => setTitle('')}
                                    sx={{ fontSize: '1.3rem' }}
                                >
                                    <MdClear />
                                </IconButton>
                            ),
                        }}
                    />
                    <DateRangePickers
                        initialValues={{
                            startDate: newEventDates.startDate.toDate().toDateString(),
                            endDate: newEventDates.endDate.toDate().toDateString(),
                        }}
                        commitDates={handleEventDates}
                        startDateLabel={`Début de l'événement`}
                        endDateLabel={`Fin de l'événement`}
                        locale={locale}
                        customCss={{
                            display: 'flex',
                            flexDirection: 'row',
                            flexGrow: 1,
                            gap: 1,
                            justifyContent: 'space-between',
                        }}
                    />

                    <MainDataNewEventGeolocation setLocation={setLocation} location={location} />

                    <Box marginTop={2}>
                        <WysiwygEditor editorState={editorState} setEditorState={setEditorState} />
                    </Box>
                </Box>
            </Box>
            <NewEventStepsNavigation handleStep={handleStep} />
        </Box>
    )
}
