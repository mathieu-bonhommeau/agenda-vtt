import { CalendarEvent } from '@/app/calendar-event/business/models/event'
import { Point } from 'ol/geom'
import { fromLonLat } from 'ol/proj'
import { RFeature } from 'rlayers'

export function EventMarker({ event }: { event: CalendarEvent }) {
    return event.eventLocation ? (
        <RFeature
            geometry={new Point(fromLonLat([event.eventLocation!.latLon.lon, event.eventLocation!.latLon.lat]))}
            onClick={(e) =>
                e.map.getView().fit(e.target.getGeometry()!.getExtent(), {
                    duration: 250,
                    maxZoom: 15,
                })
            }
        ></RFeature>
    ) : (
        <></>
    )
}
