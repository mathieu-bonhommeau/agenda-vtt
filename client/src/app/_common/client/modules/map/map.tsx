import { OpenLayersMap } from '@/app/_common/client/modules/map/open-layers-map'
import { centerCountry } from '@/app/calendar-events/business/models/geolocation'
import { eventsVM } from '@/app/calendar-events/client/view-models/retrieve-events-view-model'
import { eventsFiltersVM } from '@/app/filters-events/client/view-models/filters-view-models'
import 'ol/ol.css'
import { fromLonLat } from 'ol/proj'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RView } from 'rlayers/RMap'

export function AppMap() {
    const [focus, setFocus] = useState<RView>({
        center: fromLonLat([centerCountry['France'].lon, centerCountry['France'].lat]),
        zoom: 6,
    })

    const events = useSelector(eventsVM())
    const filters = useSelector(eventsFiltersVM())

    useEffect(() => {
        if (filters.place) {
            setFocus({
                center: fromLonLat([filters.place.latLon.lon, filters.place.latLon.lat]),
                zoom: 11,
            })
        }
    }, [events, filters])

    return <OpenLayersMap events={events} filters={filters} focus={focus} setFocus={setFocus} />
}
