import { EventPrice } from '@/app/calendar-events/business/models/event'
import { ListItem, ListItemText } from '@mui/material'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { AiOutlineEuro } from 'react-icons/ai'

export function ModalEventPrices(props: { price: EventPrice[] | undefined }) {
    return (
        <>
            <Typography sx={{ mt: 2 }}>Tarifs</Typography>
            <ListItem sx={{ display: 'flex', flexDirection: 'column', alignItems: 'baseline' }}>
                {props.price &&
                    props.price.map((price, index) => (
                        <Box key={`${price}-${index}`} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AiOutlineEuro style={{ fontSize: 25 }} />
                            <ListItemText>{price.price}</ListItemText>
                        </Box>
                    ))}
            </ListItem>
        </>
    )
}
