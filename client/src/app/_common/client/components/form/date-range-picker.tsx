import { Alert, Box, IconButton } from '@mui/material'
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
    commitDates: (dates: { startDate?: string; endDate?: string }) => void
}

export function InputDateRangePicker({ startDateLabel, endDateLabel, locale, commitDates }: InputDatePickerProps) {
    const [startDate, setStartDate] = useState<Dayjs | null>(null)
    const [endDate, setEndDate] = useState<Dayjs | null>(null)
    const [error, setError] = useState<string | null>(null)

    const handleStartDate = (date: Dayjs | null) => {
        if (endDate && date?.isAfter(endDate)) {
            setError('La date de début doit être inférieur à la date de fin')
            return
        }
        setStartDate(date)
        commitDates({ startDate: date?.toDate().toDateString(), endDate: endDate?.toDate().toDateString() })
        setError(null)
    }

    const handleEndDate = (date: Dayjs | null) => {
        if (startDate && date?.isBefore(startDate)) {
            setError('La date de fin doit être supérieur à la date de début')
            return
        }
        setEndDate(date)
        commitDates({ startDate: startDate?.toDate().toDateString(), endDate: date?.toDate().toDateString() })
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
            <IconButton aria-label="delete" disabled color="primary">
                {/*<DeleteIcon />*/}
            </IconButton>
            {error && <Alert severity="error">{error}</Alert>}
        </LocalizationProvider>
    )
}
