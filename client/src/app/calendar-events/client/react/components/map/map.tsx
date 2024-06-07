import { OpenLayersMap } from '@/app/calendar-events/client/react/components/map/open-layers-map'
import { eventsVM } from '@/app/calendar-events/client/view-models/retrieve-events-view-model'
import { eventsFiltersVM } from '@/app/filters-events/client/view-models/filters-view-models'
import { Box } from '@mui/material'
import 'ol/ol.css'
import { useSelector } from 'react-redux'

export function AppMap() {
    const events = useSelector(eventsVM())
    const filters = useSelector(eventsFiltersVM())

    return (
        <Box sx={{ border: '1px solid rgba(0, 0, 0, .3)', flexGrow: 1 }}>
            <OpenLayersMap events={events} filters={filters} />
        </Box>
    )
}
