import { AppContext } from '@/app/_common/client/context/app-context'
import { Box, Slider, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'

export type SliderRangeProps = {
    min: number
    max: number
    minLabel?: string
    maxLabel?: string
    labelsStep?: string
    commitValues: ({ min, max }: { min?: number; max?: number }) => void
}

export function SliderRange({ min, max, minLabel, maxLabel, commitValues }: SliderRangeProps) {
    const [rangeValue, setRangeValue] = useState<number[]>([min, max])
    const { resetFilters, setResetFilters } = useContext(AppContext)

    const handleChange = (_: Event, newValue: number | number[]) => {
        setRangeValue(newValue as number[])
        if (newValue instanceof Array) {
            commitValues({ min: newValue[0], max: newValue[1] !== 60 ? newValue[1] : undefined })
        }
    }

    useEffect(() => {
        resetFilters && setRangeValue([min, max])
    }, [max, min, resetFilters])

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ px: 4, marginTop: 6 }} onFocus={() => resetFilters && setResetFilters(false)}>
                <Slider
                    value={rangeValue}
                    valueLabelDisplay="on"
                    min={min}
                    max={max}
                    onChange={handleChange}
                    valueLabelFormat={(value) => value}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" onClick={() => setRangeValue([min, min])} sx={{ cursor: 'pointer' }}>
                        {minLabel}
                    </Typography>
                    <Typography variant="body2" onClick={() => setRangeValue([max, max])} sx={{ cursor: 'pointer' }}>
                        {maxLabel}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}
