import { View } from 'ol'
import Map from 'ol/Map.js'
import TileLayer from 'ol/layer/Tile'
import 'ol/ol.css'
import { fromLonLat } from 'ol/proj'
import { OSM } from 'ol/source'
import { useEffect } from 'react'
export function AppMap() {
    useEffect(() => {
        const map = new Map({
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            view: new View({
                center: fromLonLat([2.430146578161524, 46.540053201549426]),
                zoom: 6,
            }),
        })
        return () => map.setTarget()
    }, [])

    return (
        <>
            <h2>Map</h2>
            <div id="map" style={{ width: '100%', height: '600px' }}></div>
        </>
    )
}
