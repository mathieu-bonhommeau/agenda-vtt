import { SearchLocationsAndSelect } from '@/app/_common/client/components/form/select-locations-and-select'
import { AppContext } from '@/app/_common/client/context/app-context'
import { validateLatLon } from '@/app/_common/helpers/place-helpers'
import { EventLocation, centerCountry } from '@/app/calendar-events/business/models/geolocation'
import PinXC from '@/assets/icons/pin_xc.svg'
import { Card, CardContent } from '@mui/material'
import { Point } from 'ol/geom'
import { fromLonLat } from 'ol/proj'
import { ChangeEvent, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import { RFeature, RLayerVector, RMap, ROSM, RStyle } from 'rlayers'
import { RView } from 'rlayers/RMap'

export function MainDataNewEventGeolocation({
    location,
    setLocation,
}: {
    location: EventLocation | undefined
    setLocation: Dispatch<SetStateAction<EventLocation | undefined>>
}) {
    let searchTimeout: NodeJS.Timeout
    const { findLocationsByAddress, reverseGeocode } = useContext(AppContext)
    const [openPopperResults, setOpenPopperResults] = useState<'address' | 'geocode' | null>('address')
    const [address, setAddress] = useState<string>(location ? buildAddress(location) : '')
    const [findLocationsResults, setFindLocationsResults] = useState<EventLocation[]>([])
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()
    const [geocode, setGeocode] = useState<string>(location ? buildGeocodeString(location) : '')
    const [focus, setFocus] = useState<RView>({
        center: fromLonLat([centerCountry['France'].lon, centerCountry['France'].lat]),
        zoom: 11,
    })

    const handleReset = () => {
        setAddress('')
        setGeocode('')
        setFindLocationsResults([])
    }

    const handleFindLocationByAddress = (e: ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value)
        clearTimeout(timeoutId)
        if (e.target.value.length >= 2) {
            searchTimeout = setTimeout(() => {
                findLocationsByAddress({ address: e.target.value }).then((locations) => {
                    setFindLocationsResults(locations)
                    setOpenPopperResults('address')
                })
            }, 1000)
            setTimeoutId(searchTimeout)
        }
        return () => clearTimeout(searchTimeout)
    }

    const handleReverseGeocode = (e: ChangeEvent<HTMLInputElement>) => {
        setGeocode(e.target.value)
        clearTimeout(timeoutId)

        if (validateLatLon(e.target.value)) {
            const latLon = e.target.value.split(' ' || ',')
            searchTimeout = setTimeout(() => {
                reverseGeocode({ latLon: { lat: parseFloat(latLon[0]), lon: parseFloat(latLon[1]) } }).then(
                    (locations) => {
                        setFindLocationsResults(locations)
                        setOpenPopperResults('geocode')
                    },
                )
            }, 1000)
            setTimeoutId(searchTimeout)
        }
        return () => clearTimeout(searchTimeout)
    }

    const commitFindLocationsSelected = (event: ChangeEvent<HTMLSelectElement>, _: ReactNode) => {
        setAddress(event.currentTarget.value)
        const { options } = event.currentTarget

        for (let i = 0, l = options.length; i < l; i += 1) {
            if ((options[i] as HTMLOptionElement).selected) {
                setLocation(findLocationsResults[i])
                setGeocode(buildGeocodeString(findLocationsResults[i]))
                setAddress(buildAddress(findLocationsResults[i]))
                setFocus({
                    center: fromLonLat([findLocationsResults[i].latLon.lon, findLocationsResults[i].latLon.lat]),
                    zoom: 11,
                })
            }
        }
        setFindLocationsResults([])
    }

    useEffect(() => {
        if (location) {
            setFocus({
                center: fromLonLat([location.latLon.lon, location.latLon.lat]),
                zoom: 11,
            })
        }
    }, [location])

    return (
        <Card>
            <CardContent>
                <SearchLocationsAndSelect
                    name={'address'}
                    searchValue={address}
                    setSearchValue={setAddress}
                    handleInput={handleFindLocationByAddress}
                    handleReset={handleReset}
                    searchResults={findLocationsResults}
                    openSelectResults={openPopperResults}
                    commitSearchSelected={commitFindLocationsSelected}
                    placeholder={`Adresse de l'événement`}
                    label={`Adresse de l'événement`}
                />
                <SearchLocationsAndSelect
                    name={'geocode'}
                    searchValue={geocode}
                    setSearchValue={setGeocode}
                    handleInput={handleReverseGeocode}
                    handleReset={handleReset}
                    searchResults={findLocationsResults}
                    openSelectResults={openPopperResults}
                    commitSearchSelected={commitFindLocationsSelected}
                    placeholder={`lat et lon (Ex: 43.7, -0.7 ou 43.7 -0.7)`}
                    label={`Géolocalisation de l'événement`}
                />
            </CardContent>
            <RMap
                width={'100%'}
                height={'30vh'}
                initial={{
                    center: fromLonLat([centerCountry['France'].lon, centerCountry['France'].lat]),
                    zoom: 6.5,
                }}
                view={[focus, setFocus]}
            >
                <ROSM />
                <RLayerVector zIndex={10}>
                    {location && (
                        <>
                            <RStyle.RStyle>
                                <RStyle.RIcon
                                    src={PinXC.src}
                                    anchor={[0.5, 1]}
                                    scale={1.3}
                                    anchorXUnits={'fraction'}
                                    anchorYUnits={'fraction'}
                                />
                            </RStyle.RStyle>
                            <RFeature geometry={new Point(fromLonLat([location.latLon.lon, location!.latLon.lat]))} />
                        </>
                    )}
                </RLayerVector>
            </RMap>
        </Card>
    )
}

const buildAddress = (location: EventLocation) => {
    return `${location.housenumber || ''} ${location.address || ''} ${location.postcode || ''} ${
        location.city || ''
    }, ${location.country || ''}`
}

const buildGeocodeString = (location: EventLocation) => {
    return `${location.latLon.lat} ${location.latLon.lon}`
}
