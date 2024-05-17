import { CalendarEvent } from '@/app/calendar-event/business/models/event'
import { EventMarker } from '@/app/calendar-event/client/react/components/map/event-marker'
import IconMap from '@/app/calendar-event/client/react/components/map/icon-map.png'
import { EventsFilters } from '@/app/filters-events/business/models/filter'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import { RLayerVector, RMap, ROSM, RStyle } from 'rlayers'
import { RView } from 'rlayers/RMap'

export function OpenLayersMap({
    events,
    focus,
    setFocus,
}: {
    events: CalendarEvent[]
    filters: EventsFilters
    focus: RView
    setFocus: Dispatch<SetStateAction<RView>>
}): ReactNode {
    return (
        <RMap width={'100%'} height={'60vh'} initial={focus} view={[focus, setFocus]}>
            <ROSM />
            <RLayerVector zIndex={10}>
                <RStyle.RStyle>
                    <RStyle.RIcon src={IconMap.src} anchor={[15, 15]} anchorXUnits={'pixels'} anchorYUnits={'pixels'} />
                </RStyle.RStyle>
                {events.map((event) => (
                    <EventMarker event={event} key={event.id} />
                ))}
            </RLayerVector>
        </RMap>
    )
}
