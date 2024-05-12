import { centerCountry } from '@/app/calendar-event/business/models/geolocation'
import { EventMarker } from '@/app/calendar-event/client/react/components/map/event-marker'
import { eventsVM } from '@/app/calendar-event/client/view-models/retrieve-events-view-model'
import 'ol/ol.css'
import { fromLonLat } from 'ol/proj'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RLayerVector, RMap, ROSM, RStyle } from 'rlayers'
import IconMap from '../../../../calendar-event/client/react/components/map/icon-map.png'

export function AppMap() {
    const [map, setMap] = useState(<></>)

    const events = useSelector(eventsVM())

    useEffect(() => {
        setMap(
            <RMap
                width={'100%'}
                height={'60vh'}
                initial={{ center: fromLonLat([centerCountry['France'].lon, centerCountry['France'].lat]), zoom: 6 }}
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
    }, [events])
    return <>{map}</>
}
