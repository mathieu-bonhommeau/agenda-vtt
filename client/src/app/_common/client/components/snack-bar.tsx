import { AppContext } from '@/app/_common/client/context/app-context'
import { Snackbar } from '@mui/material'
import Stack from '@mui/material/Stack'
import { useContext } from 'react'

export default function AppSnackbar({ errors }: { errors: string[] }) {
    const { setErrors } = useContext(AppContext)

    const handleClose = () => {
        setErrors([])
    }

    return (
        <Stack spacing={2} sx={{ maxWidth: 600 }}>
            {errors.map((err) => (
                <Snackbar
                    key={err}
                    message={err}
                    open={errors.length > 0}
                    autoHideDuration={5000}
                    onClose={handleClose}
                />
            ))}
        </Stack>
    )
}
