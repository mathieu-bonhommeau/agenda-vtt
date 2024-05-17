import { OpenLayersMap } from '@/app/_common/client/modules/map/open-layers-map'
import { centerCountry } from '@/app/calendar-event/business/models/geolocation'
import { eventsVM } from '@/app/calendar-event/client/view-models/retrieve-events-view-model'
import { eventsFiltersVM } from '@/app/filters-events/client/view-models/filters-view-models'
import 'ol/ol.css'
import { fromLonLat } from 'ol/proj'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export function AppMap() {
    const [map, setMap] = useState(<></>)
    /*const [focus, setFocus] = useState<RView>({
        center: fromLonLat([centerCountry['France'].lon, centerCountry['France'].lat]),
        zoom: 6,
    })*/
    const [isFocusable, setIsFocusable] = useState(true)

    const events = useSelector(eventsVM())
    const filters = useSelector(eventsFiltersVM())

    useEffect(() => {
        console.log('test')
        if (filters.place && isFocusable) {
            /*setFocus({
                center: fromLonLat([filters.place.latLon.lon, filters.place.latLon.lat]),
                zoom: 11,
            })*/
            setIsFocusable(false)
            setMap(
                <OpenLayersMap
                    events={events}
                    filters={filters}
                    focus={{
                        center: fromLonLat([filters.place.latLon.lon, filters.place.latLon.lat]),
                        zoom: 11,
                    }}
                />,
            )
            return
        }

        setMap(
            <OpenLayersMap
                events={events}
                filters={filters}
                focus={{
                    center: fromLonLat([centerCountry['France'].lon, centerCountry['France'].lat]),
                    zoom: 6,
                }}
            />,
        )
    }, [events, filters, isFocusable])

    return <>{map}</>
}

const compareView = (oldView: number[], newView: number[]) => {
    console.log(oldView)
    console.log(newView)
    return JSON.stringify(oldView) === JSON.stringify(newView)
}
