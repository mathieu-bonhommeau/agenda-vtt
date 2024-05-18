import { Box, IconButton, Slider, Typography } from '@mui/material'
import { useState } from 'react'
import { TiDelete } from 'react-icons/ti'

export type SliderRangeProps = {
    label: string
    min: number
    max: number
    minLabel?: string
    maxLabel?: string
    labelsStep?: string
    commitValues: ({ min, max }: { min?: number; max?: number }) => void
}

export function SliderRange({ label, min, max, minLabel, maxLabel, commitValues }: SliderRangeProps) {
    const [rangeValue, setRangeValue] = useState<number[]>([min, max])

    const handleChange = (_: Event, newValue: number | number[]) => {
        setRangeValue(newValue as number[])
        if (newValue instanceof Array) {
            commitValues({ min: newValue[0], max: newValue[1] !== 60 ? newValue[1] : undefined })
        }
    }

    const handleReset = () => {
        setRangeValue([0, 60])
        commitValues({ min: 0, max: 0 })
    }

    return (
        <Box sx={{ my: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 6 }}>
                <Typography>{label}</Typography>
                {JSON.stringify(rangeValue) !== JSON.stringify([0, 60]) && (
                    <IconButton sx={{ p: 0 }} aria-label="reset-dates" color="error" onClick={handleReset}>
                        <TiDelete />
                    </IconButton>
                )}
            </Box>
            <Box sx={{ px: 4 }}>
                <Slider
                    marks
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
