import { EventsFilters } from '@/app/calendar-event/business/model/filter'
import { Alert, Box } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Dayjs } from 'dayjs'
import 'dayjs/locale/en'
import 'dayjs/locale/fr'
import { useState } from 'react'

export type InputDatePickerProps = {
    startDateLabel: string
    endDateLabel: string
    locale: 'fr' | 'en'
    handleAddFilter: (events: EventsFilters) => void
}

export function InputDateRangePicker({ startDateLabel, endDateLabel, locale, handleAddFilter }: InputDatePickerProps) {
    const [startDate, setStartDate] = useState<Dayjs | null>(null)
    const [endDate, setEndDate] = useState<Dayjs | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleStartDate = (date: Dayjs | null) => {
        if (endDate && date?.isAfter(endDate)) {
            setError('La date de début doit être inférieur à la date de fin')
            return
        }
        setStartDate(date)
        handleAddFilter({ startDate: date?.toDate().toDateString() })
        setError(null)
    }

    const handleEndDate = (date: Dayjs | null) => {
        if (startDate && date?.isBefore(startDate)) {
            setError('La date de fin doit être supérieur à la date de début')
            return
        }
        setEndDate(date)
        handleAddFilter({ endDate: date?.toDate().toDateString() })
        setError(null)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
            <Box sx={{ display: 'flex', gap: 2, my: 1 }}>
                <DatePicker
                    label={startDateLabel}
                    onChange={(date) => handleStartDate(date)}
                    disablePast
                    slotProps={{ textField: { error: !!error } }}
                />
                <DatePicker
                    label={endDateLabel}
                    onChange={(date) => handleEndDate(date)}
                    disablePast
                    slotProps={{ textField: { error: !!error } }}
                />
            </Box>
            {error && <Alert severity="error">{error}</Alert>}
        </LocalizationProvider>
    )
}
