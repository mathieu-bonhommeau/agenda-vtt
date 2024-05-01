import { DateRangePicker } from '@mui/x-date-pickers-pro'
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
}

export function InputDateRangePicker({ startDateLabel, endDateLabel, locale }: InputDatePickerProps) {
    const [dateRange, setDateRange] = useState<Array<Dayjs | null>>([])

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
            <DateRangePicker
                localeText={{ start: startDateLabel, end: endDateLabel }}
                onChange={(e) => setDateRange(e)}
            />
        </LocalizationProvider>
    )
}
