import { CalendarEvent } from '@/app/calendar-event/business/model/event'
import { RFeature } from 'rlayers'
import { Point } from 'ol/geom'
import { fromLonLat } from 'ol/proj'

export function EventMarker({ event }: { event: CalendarEvent }) {
    return event.eventLocation ? (
        <RFeature
            geometry={new Point(fromLonLat([event.eventLocation!.latLon.lat, event.eventLocation!.latLon.lon]))}
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