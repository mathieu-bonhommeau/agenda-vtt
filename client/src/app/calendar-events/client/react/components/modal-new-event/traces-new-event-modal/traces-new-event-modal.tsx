import { AppState } from '@/app/_common/business/store/appState'
import { Typography } from '@mui/material'
import { useSelector } from 'react-redux'

export function TracesNewEventModal() {
    const draft = useSelector((state: AppState) => state.newEventState.draft)

    console.log(draft)

    return <Typography>Traces form</Typography>
}
