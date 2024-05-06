import { EventsBasedFilters } from '@/app/_common/client/modules/filters/events-based-filters'
import { RunsBasedFilters } from '@/app/_common/client/modules/filters/runs-based-filters'
import { Box } from '@mui/material'

export function Filters() {
    return (
        <Box>
            <EventsBasedFilters />
            <RunsBasedFilters />
        </Box>
    )
}
