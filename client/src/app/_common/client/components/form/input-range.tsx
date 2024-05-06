import { Mark } from '@mui/base'
import { Box, Slider, Typography } from '@mui/material'
import { useState } from 'react'

export type SliderRangeProps = {
    label: string
    min?: number
    max?: number
    initValue?: number
    minLabel?: string
    maxLabel?: string
    step: number
    marks?: boolean | Mark[] | undefined
    labelsStep?: string[]
}

export function SliderRange({
    label,
    min,
    max,
    initValue,
    minLabel,
    maxLabel,
    marks,
    step,
    labelsStep,
}: SliderRangeProps) {
    const [rangeValue, setRangeValue] = useState<number | undefined>(initValue)

    const handleChange = (_: Event, newValue: number | number[]) => {
        setRangeValue(newValue as number)
    }

    return (
        <Box sx={{ width: 500, gap: 2, my: 2 }}>
            <Typography>{label}</Typography>
            <Box sx={{ width: '100%' }}>
                <Slider
                    marks={marks}
                    step={step}
                    value={rangeValue}
                    valueLabelDisplay="auto"
                    min={min}
                    max={max}
                    onChange={handleChange}
                    valueLabelFormat={(value) => labelsStep && labelsStep[value]}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" onClick={() => min && setRangeValue(min)} sx={{ cursor: 'pointer' }}>
                        {minLabel}
                    </Typography>
                    <Typography variant="body2" onClick={() => max && setRangeValue(max)} sx={{ cursor: 'pointer' }}>
                        {maxLabel}
                    </Typography>
                </Box>
            </Box>
        </Box>
    )
}
