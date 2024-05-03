import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@mui/material'
import { ChangeEvent, useState } from 'react'

export function CheckboxSet({ initialChecked }: { initialChecked: Record<string, boolean> }) {
    const [values, setValues] = useState<Record<string, boolean>>(initialChecked)

    const handleCheck = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.name)
        setValues({ ...values, [e.target.name]: !values[e.target.name] })
    }

    return (
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
            <FormLabel component="legend">Assign responsibility</FormLabel>
            <FormGroup>
                {Object.keys(initialChecked).map((key) => (
                    <FormControlLabel
                        key={key}
                        control={<Checkbox checked={initialChecked[key]} onChange={handleCheck} name={key} />}
                        label={key}
                    />
                ))}
            </FormGroup>
        </FormControl>
    )
}
