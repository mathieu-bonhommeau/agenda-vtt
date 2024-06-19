import { Snackbar } from '@mui/material'
import Stack from '@mui/material/Stack'

export default function AppSnackbar({ errors }: { errors: string[] }) {
    return (
        <Stack spacing={2} sx={{ maxWidth: 600 }}>
            {errors.map((err) => (
                <Snackbar key={err} message={err} open={errors.length > 0} autoHideDuration={5000} />
            ))}
        </Stack>
    )
}
