import { Box, Slider, Typography } from '@mui/material'
import { useState } from 'react'

export type SliderRangeProps = {
    label: string
    min: number
    max: number
    minLabel: string
    maxLabel: string
}

export function SliderRange({ label, min, max, minLabel, maxLabel }: SliderRangeProps) {
    const marks = [
        {
            value: min,
            label: '',
        },
        {
            value: max,
            label: '',
        },
    ]
    const [rangeValue, setRangeValue] = useState<number>(30)

    const handleChange = (_: Event, newValue: number | number[]) => {
        setRangeValue(newValue as number)
    }

    return (
        <Box sx={{ width: 500, gap: 2, my: 2 }}>
            <Typography>{label}</Typography>
            <Box sx={{ width: '100%' }}>
                <Slider
                    marks={marks}
                    step={10}
                    value={rangeValue}
                    valueLabelDisplay="auto"
                    min={0}
                    max={max}
                    onChange={handleChange}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" onClick={() => setRangeValue(min)} sx={{ cursor: 'pointer' }}>
                        {minLabel}
                    </Typography>
                    <Typography variant="body2" onClick={() => setRangeValue(max)} sx={{ cursor: 'pointer' }}>
                        {maxLabel}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}
