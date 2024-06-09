import { DateRangePickers } from '@/app/_common/client/components/form/date-pickers/date-range-pickers'
import { WysiwygEditor } from '@/app/_common/client/components/form/wysiwyg-editor/wysiwyg-editor'
import { AppContext } from '@/app/_common/client/context/app-context'
import { EventLocation } from '@/app/calendar-events/business/models/geolocation'
import { MainDataNewEventGeolocation } from '@/app/calendar-events/client/react/components/modal-new-event/main-data-new-event-modal/main-data-new-event-geolocation'
import { FormControl, IconButton, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import { useContext, useState } from 'react'
import { MdClear } from 'react-icons/md'

export function MainDataNewEventModal() {
    const { locale } = useContext(AppContext)
    const [title, setTitle] = useState<string>('')
    const [newEventDates, setNewEventDates] = useState<{ startDate: string; endDate: string }>()
    const [location, setLocation] = useState<EventLocation | undefined>()

    const handleEventDates = (date: { startDate?: string; endDate?: string }) => {
        setNewEventDates({ startDate: date.startDate || '', endDate: date.endDate || '' })
    }

    return (
        <Box
            component={'form'}
            sx={{
                '& > :not(style)': { m: 1 },
            }}
            noValidate
            autoComplete="off"
        >
            <FormControl variant="standard" sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <TextField
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

                <WysiwygEditor />
            </FormControl>
        </Box>
    )
}
