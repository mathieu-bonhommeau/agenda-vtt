import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material'
import { ChangeEvent, useState } from 'react'

export function CheckboxSet({ initialChecked }: { initialChecked: Record<string, boolean> }) {
    const [values, setValues] = useState<Record<string, boolean>>(initialChecked)

    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(!values[e.target.name])
        setValues({ ...values, [e.target.name]: !values[e.target.name] })
    }

    return (
        <Box>
            <Typography>Difficulté</Typography>
            {Object.keys(initialChecked).map((key) => (
                <FormControlLabel
                    control={<Checkbox checked={values[key]} onChange={handleCheck} name={key} />}
                    label={key}
                    key={key}
                />
            ))}
        </Box>
    )
}
