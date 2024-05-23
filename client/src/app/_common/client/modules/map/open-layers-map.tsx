import { CalendarEvent } from '@/app/calendar-events/business/models/event'
import { EventMarker } from '@/app/calendar-events/client/react/components/map/event-marker'
import { EventsFilters } from '@/app/filters-events/business/models/filter'
import { Dispatch, ReactNode, SetStateAction } from 'react'
import { RControl, RLayerVector, RMap, ROSM, RStyle } from 'rlayers'
import { RView } from 'rlayers/RMap'
import PinXC from '../../../../../assets/icons/pin_xc.svg'

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
            <RControl.RScaleLine />
            <RControl.RAttribution />
            <RControl.RZoom />
            <RControl.RZoomSlider />
            <RLayerVector zIndex={10}>
                <RStyle.RStyle>
                    <RStyle.RIcon
                        src={PinXC.src}
                        anchor={[0.5, 1]}
                        scale={1.3}
                        anchorXUnits={'fraction'}
                        anchorYUnits={'fraction'}
                    />
                </RStyle.RStyle>
                {events.map((event) => (
                    <EventMarker event={event} key={event.id} />
                ))}
            </RLayerVector>
        </RMap>
    )
}
