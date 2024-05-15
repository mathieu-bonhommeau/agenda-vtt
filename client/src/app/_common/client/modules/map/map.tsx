import { centerCountry } from '@/app/calendar-event/business/models/geolocation'
import { EventMarker } from '@/app/calendar-event/client/react/components/map/event-marker'
import { eventsVM } from '@/app/calendar-event/client/view-models/retrieve-events-view-model'
import { eventsFiltersVM } from '@/app/filters-events/client/view-models/filters-view-models'
import { boundingExtent, Extent } from 'ol/extent'
import 'ol/ol.css'
import { fromLonLat } from 'ol/proj'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RLayerVector, RMap, ROSM, RStyle } from 'rlayers'
import IconMap from '../../../../calendar-event/client/react/components/map/icon-map.png'

export function AppMap() {
    const [map, setMap] = useState(<></>)

    const events = useSelector(eventsVM())

    console.log(events)

    const filters = useSelector(eventsFiltersVM())

    useEffect(() => {
        let extent: Extent
        if (filters.place) {
            extent = boundingExtent([
                fromLonLat([filters.place.bbox[0], filters.place.bbox[1]]),
                fromLonLat([filters.place.bbox[2], filters.place.bbox[3]]),
            ])
        }

        setMap(
            <RMap
                width={'100%'}
                height={'60vh'}
                initial={{ center: fromLonLat([centerCountry['France'].lon, centerCountry['France'].lat]), zoom: 6 }}
                extent={extent}
            >
                <ROSM />
                <RLayerVector zIndex={10}>
                    <RStyle.RStyle>
                        <RStyle.RIcon
                            src={IconMap.src}
                            anchor={[15, 15]}
                            anchorXUnits={'pixels'}
                            anchorYUnits={'pixels'}
                        />
                    </RStyle.RStyle>
                    {events.map((event) => (
                        <EventMarker event={event} key={event.id} />
                    ))}
                </RLayerVector>
            </RMap>,
        )
    }, [events, filters.place])
    return <>{map}</>
}
