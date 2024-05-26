import { DateRangePickers } from '@/app/_common/client/components/form/date-pickers/date-range-pickers'
import { YearMonthPickers } from '@/app/_common/client/components/form/date-pickers/year-month-pickers'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Card, Tab } from '@mui/material'
import dayjs from 'dayjs'
import 'dayjs/locale/en'
import 'dayjs/locale/fr'
import { SyntheticEvent, useState } from 'react'

export type InputDatePickerProps = {
    startDateLabel: string
    endDateLabel: string
    locale: 'fr' | 'en'
    commitDates: (dates: { startDate?: string; endDate?: string }) => void
}

export type DateFilterType = 'month' | 'dates-range'

export function InputDatePickers({ startDateLabel, endDateLabel, locale, commitDates }: InputDatePickerProps) {
    const [dateFilter, setDateFilter] = useState<DateFilterType>('dates-range')

    const handleChange = (_: SyntheticEvent, filterType: DateFilterType) => {
        setDateFilter(filterType)
        const now = dayjs(new Date())
        filterType === 'month' &&
            commitDates({
                startDate: dayjs(now)?.toDate().toDateString(),
                endDate: now.endOf('month').toDate().toDateString(),
            })
        filterType === 'dates-range' &&
            commitDates({ startDate: dayjs(now)?.toDate().toDateString(), endDate: undefined })
    }

    return (
        <Card sx={{ p: 0, height: '230px' }}>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={dateFilter}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange}>
                            <Tab label="Par dates" value="dates-range" />
                            <Tab label="Par mois" value="month" />
                        </TabList>
                    </Box>
                    <TabPanel value="month">
                        <YearMonthPickers commitDates={commitDates} locale={'fr'} />
                    </TabPanel>
                    <TabPanel value="dates-range">
                        <DateRangePickers
                            startDateLabel={startDateLabel}
                            endDateLabel={endDateLabel}
                            locale={locale}
                            commitDates={commitDates}
                        />
                    </TabPanel>
                </TabContext>
            </Box>
        </Card>
    )
}
