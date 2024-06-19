import { Chip } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

export function ModalEventFacilities(props: { services: string[] | undefined }) {
    return (
        <Box marginBottom={2}>
            <Typography sx={{ my: 2 }}>Infos pratiques</Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                {props.services &&
                    props.services.map((service, index) => (
                        <Chip key={`${service}-${index}`} label={service} variant={'outlined'} />
                    ))}
            </Box>
        </Box>
    )
}
