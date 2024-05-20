import ModalEvent from '@/app/_common/client/modules/modal-event/modal-event'
import { CalendarEvent } from '@/app/calendar-events/business/models/event'
import { Point } from 'ol/geom'
import { fromLonLat } from 'ol/proj'
import { useState } from 'react'
import { RFeature, RFeatureUIEvent } from 'rlayers'

export function EventMarker({ event }: { event: CalendarEvent }) {
    const [open, setOpen] = useState(false)
    const handlePointerEnter = (e: RFeatureUIEvent) => {}

    const handlePointerLeave = (e: RFeatureUIEvent) => {}

    return (
        <>
            {event.eventLocation && (
                <RFeature
                    geometry={new Point(fromLonLat([event.eventLocation!.latLon.lon, event.eventLocation!.latLon.lat]))}
                    onClick={(e) =>
                        e.map.getView().fit(e.target.getGeometry()!.getExtent(), {
                            duration: 250,
                            maxZoom: 13,
                        })
                    }
                    onPointerEnter={(e) => console.log('survol')}
                    onPointerLeave={() => console.log('survol')}
                    onSingleClick={() => setOpen(!open)}
                />
            )}
            <ModalEvent event={event} open={open} setOpen={setOpen} />
        </>
    )
}
