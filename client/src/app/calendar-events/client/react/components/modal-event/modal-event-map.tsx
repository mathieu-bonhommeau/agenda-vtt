import { CalendarEvent } from '@/app/calendar-events/business/models/event'
import { EventLocation } from '@/app/calendar-events/business/models/geolocation'
import { EventMarker } from '@/app/calendar-events/client/react/components/map/event-marker'
import { fromLonLat } from 'ol/proj'
import { RLayerVector, RMap, ROSM, RStyle } from 'rlayers'
import PinXC from '../../../../../../assets/icons/pin_xc.svg'

export function ModalEventMap(props: { eventLocation: EventLocation; event: CalendarEvent }) {
    return (
        <RMap
            width={'100%'}
            height={'30vh'}
            initial={{
                center: fromLonLat([props.eventLocation.latLon.lon, props.eventLocation.latLon.lat]),
                zoom: 13,
            }}
        >
            <ROSM />
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
                <EventMarker event={props.event} disableClick={true} />
            </RLayerVector>
        </RMap>
    )
}
