import { AppContext } from '@/app/_common/client/context/app-context'
import { CalendarEvent } from '@/app/calendar-events/business/models/event'
import PopupEvent from '@/app/calendar-events/client/react/components/popup-event/popup-event'
import { Point } from 'ol/geom'
import { fromLonLat } from 'ol/proj'
import { useContext, useRef, useState } from 'react'
import { RFeature, ROverlay, RPopup } from 'rlayers'

export function EventMarker({
    event,
    disableClick,
}: {
    event: Omit<CalendarEvent, 'id' | 'createdAt'>
    disableClick?: boolean
}) {
    const { setOpenModal } = useContext(AppContext)
    const [popupOpen, setPopupOpen] = useState(false)

    const popup = useRef<RPopup>(null)

    return (
        <>
            {event.eventLocation && (
                <RFeature
                    geometry={new Point(fromLonLat([event.eventLocation!.latLon.lon, event.eventLocation!.latLon.lat]))}
                    onClick={(e) => {
                        !disableClick && setOpenModal({ open: true, event })
                        e.map.getView().fit(e.target.getGeometry()!.getExtent(), {
                            duration: 250,
                            maxZoom: 13,
                        })
                    }}
                    onPointerEnter={() => setPopupOpen(true)}
                    onPointerLeave={() => setPopupOpen(false)}
                >
                    {popupOpen && (
                        <ROverlay ref={popup} className="example-overlay">
                            <PopupEvent event={event} setOpen={setPopupOpen} />
                        </ROverlay>
                    )}
                </RFeature>
            )}
        </>
    )
}
