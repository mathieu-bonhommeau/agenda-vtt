import { AppContext } from '@/app/_common/client/context/app-context'
import { monthsFr } from '@/app/_common/helpers/date-helpers'
import { IconButton, Paper, Popover, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import { MonthCalendar, YearCalendar } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs, { Dayjs } from 'dayjs'
import { MouseEvent, useContext, useEffect, useState } from 'react'
import { MdOutlineArrowLeft, MdOutlineArrowRight } from 'react-icons/md'

export type YearMonthPickersProps = {
    locale: 'fr' | 'en'
    commitDates: (dates: { startDate?: string; endDate?: string }) => void
}

export function YearMonthPickers({ commitDates, locale }: YearMonthPickersProps) {
    const [monthValue, setMonthValue] = useState<number>(new Date().getMonth())
    const [yearValue, setYearValue] = useState<number>(new Date().getFullYear())
    const [openMonthPicker, setOpenMonthPicker] = useState<HTMLTableRowElement | null>(null)
    const [openYearPicker, setOpenYearPicker] = useState<HTMLTableRowElement | null>(null)
    const { resetFilters, setResetFilters } = useContext(AppContext)

    useEffect(() => {
        if (resetFilters) {
            setMonthValue(dayjs(new Date()).month())
            setYearValue(dayjs(new Date()).year())
        }
    }, [resetFilters])

    const handleMonth = (date: Dayjs | null) => {
        date && setMonthValue(date.month())
        setOpenMonthPicker(null)
        commitDates({ startDate: date?.toDate().toDateString(), endDate: date?.endOf('month').toDate().toDateString() })
    }

    const handleNextPrevMonth = (increment: number) => {
        if (monthValue + increment < 0) return
        if (monthValue + increment > 11) return
        setMonthValue(monthValue + increment)
        handleMonth(dayjs(new Date(yearValue, monthValue + increment, 1)))
    }

    const handleYear = (date: Dayjs | null) => {
        date && setYearValue(date.year())
        setOpenYearPicker(null)
        commitDates({ startDate: date?.toDate().toDateString(), endDate: date?.endOf('month').toDate().toDateString() })
    }

    const handleNextPrevYear = (increment: number) => {
        setYearValue(yearValue + increment)
        const date = dayjs(new Date(yearValue, monthValue, 1))
        handleYear(dayjs(new Date(yearValue + increment, monthValue, 1)))
    }

    const handleOpenYearPicker = (e: MouseEvent<HTMLTableCellElement>) => {
        const target = e.target as HTMLTableCellElement
        const parent = target.parentElement
        setOpenYearPicker(parent as HTMLTableRowElement)
    }

    const handleOpenYMonthPicker = (e: MouseEvent<HTMLTableCellElement>) => {
        const target = e.target as HTMLTableCellElement
        const parent = target.parentElement
        setOpenMonthPicker(parent as HTMLTableRowElement)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
            <TableContainer component={Paper} onFocus={() => resetFilters && setResetFilters(false)}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ textAlign: 'center', p: 1 }}>
                                <IconButton onClick={() => handleNextPrevYear(-1)}>
                                    <MdOutlineArrowLeft />
                                </IconButton>
                            </TableCell>
                            <TableCell
                                onClick={handleOpenYearPicker}
                                sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem' }}
                            >
                                {yearValue}
                            </TableCell>
                            <Popover
                                open={!!openYearPicker}
                                anchorEl={openYearPicker}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                            >
                                <YearCalendar
                                    onChange={handleYear}
                                    value={dayjs(new Date(yearValue, 0, 1))}
                                    sx={{ background: 'white', height: '100px' }}
                                />
                            </Popover>
                            <TableCell sx={{ textAlign: 'center', p: 1 }}>
                                <IconButton onClick={() => handleNextPrevYear(+1)}>
                                    <MdOutlineArrowRight />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{ textAlign: 'center', p: 1 }}>
                                <IconButton onClick={() => handleNextPrevMonth(-1)}>
                                    <MdOutlineArrowLeft />
                                </IconButton>
                            </TableCell>
                            <TableCell
                                sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem' }}
                                onClick={handleOpenYMonthPicker}
                            >
                                {monthsFr[monthValue]}
                            </TableCell>
                            <Popover
                                open={!!openMonthPicker}
                                anchorEl={openMonthPicker}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                            >
                                <MonthCalendar
                                    onChange={handleMonth}
                                    value={dayjs(new Date(yearValue, monthValue, 1))}
                                    sx={{ background: 'white', height: '100px' }}
                                />
                            </Popover>
                            <TableCell sx={{ textAlign: 'center', p: 1 }}>
                                <IconButton onClick={() => handleNextPrevMonth(+1)}>
                                    <MdOutlineArrowRight />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </LocalizationProvider>
    )
}
