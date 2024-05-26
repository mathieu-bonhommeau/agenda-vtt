import { Box } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs, { Dayjs } from 'dayjs'
import { useState } from 'react'

export type DateRangePickersProps = {
    startDateLabel: string
    endDateLabel: string
    locale: 'fr' | 'en'
    commitDates: (dates: { startDate?: string; endDate?: string }) => void
}

export function DateRangePickers({ startDateLabel, endDateLabel, locale, commitDates }: DateRangePickersProps) {
    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(new Date()))
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
            <Box sx={{ display: 'flex', my: 1, width: '100%' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, gap: 1 }}>
                    <DatePicker
                        label={startDateLabel}
                        value={startDate}
                        onChange={(date) => handleStartDate(date)}
                        slotProps={{ textField: { error: !!error }, field: { clearable: true } }}
                    />
                    <DatePicker
                        label={endDateLabel}
                        value={endDate}
                        onChange={(date) => handleEndDate(date)}
                        slotProps={{ textField: { error: !!error }, field: { clearable: true } }}
                    />
                </Box>
            </Box>
        </LocalizationProvider>
    )
}
