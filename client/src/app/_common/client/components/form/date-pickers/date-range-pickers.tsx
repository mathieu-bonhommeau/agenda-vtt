import { AppContext } from '@/app/_common/client/context/app-context'
import { Box } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs, { Dayjs } from 'dayjs'
import { useContext, useEffect, useState } from 'react'

export type DateRangePickersProps = {
    initialValues?: { startDate: string; endDate: string }
    startDateLabel: string
    endDateLabel: string
    locale: 'fr' | 'en'
    commitDates: (dates: { startDate?: string; endDate?: string }) => void
    customCss: { [property: string]: string | number }
}

export function DateRangePickers({
    initialValues,
    startDateLabel,
    endDateLabel,
    locale,
    commitDates,
    customCss,
}: DateRangePickersProps) {
    const [startDate, setStartDate] = useState<Dayjs | null>(
        initialValues?.startDate ? dayjs(new Date(initialValues?.startDate)) : dayjs(new Date()),
    )
    const [endDate, setEndDate] = useState<Dayjs | null>(
        initialValues?.endDate ? dayjs(new Date(initialValues?.endDate)) : null,
    )
    const [error, setError] = useState<string | null>(null)
    const { resetFilters, setResetFilters } = useContext(AppContext)

    useEffect(() => {
        if (resetFilters) {
            setStartDate(dayjs(new Date()))
            setEndDate(null)
        }
    }, [resetFilters])

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
            <Box sx={{ display: 'flex', my: 1, width: '100%' }} onFocus={() => resetFilters && setResetFilters(false)}>
                <Box sx={customCss}>
                    <DatePicker
                        label={startDateLabel}
                        value={startDate}
                        onChange={(date) => handleStartDate(date)}
                        slotProps={{ textField: { error: !!error }, field: { clearable: true } }}
                        sx={{ width: '100%' }}
                    />
                    <DatePicker
                        label={endDateLabel}
                        value={endDate}
                        onChange={(date) => handleEndDate(date)}
                        slotProps={{ textField: { error: !!error }, field: { clearable: true } }}
                        sx={{ width: '100%' }}
                    />
                </Box>
            </Box>
        </LocalizationProvider>
    )
}
