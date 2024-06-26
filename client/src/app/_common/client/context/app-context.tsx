import { Dependencies } from '@/app/_common/business/store/store'
import { centerCountry } from '@/app/calendar-events/business/models/geolocation'
import { CalendarEventVM } from '@/app/calendar-events/client/view-models/retrieve-events-view-model'
import { findLocationsByAddress } from '@/app/geolocation/business/use-cases/find-locations-by-address/find-locations-by.address'
import { reverseGeocode } from '@/app/geolocation/business/use-cases/reverse-geocode/reverse.geocode'
import { searchPlaces } from '@/app/geolocation/business/use-cases/search-place/searchPlace'
import { retrieveTraceData } from '@/app/traces/business/use-cases/retrieve-traces/retrieve-trace-data'
import { fromLonLat } from 'ol/proj'
import React, { Dispatch, PropsWithChildren, SetStateAction, useState } from 'react'
import { RView } from 'rlayers/RMap'

export type AppContextType = {
    focus: RView
    setFocus: Dispatch<SetStateAction<RView>>
    openModal: { open: boolean; event: CalendarEventVM | undefined }
    setOpenModal: Dispatch<SetStateAction<{ open: boolean; event: CalendarEventVM | undefined }>>
    searchPlaces: ReturnType<typeof searchPlaces>
    findLocationsByAddress: ReturnType<typeof findLocationsByAddress>
    reverseGeocode: ReturnType<typeof reverseGeocode>
    retrieveTraceData: ReturnType<typeof retrieveTraceData>
    locale: 'fr' | 'en'
    resetFilters: boolean
    setResetFilters: Dispatch<SetStateAction<boolean>>
    errors: string[]
    setErrors: Dispatch<SetStateAction<string[]>>
}

export const AppContext = React.createContext<AppContextType>({} as AppContextType)

export function AppContextProvider({
    children,
    dependencies,
}: PropsWithChildren<NonNullable<unknown>> & { dependencies: Dependencies }) {
    const [focus, setFocus] = useState<RView>({
        center: fromLonLat([centerCountry['France'].lon, centerCountry['France'].lat]),
        zoom: 6.5,
    })
    const [openModal, setOpenModal] = useState<{ open: boolean; event: CalendarEventVM | undefined }>({
        open: false,
        event: undefined,
    })

    const [errors, setErrors] = useState<string[]>([])

    const [resetFilters, setResetFilters] = useState(false)

    return (
        <AppContext.Provider
            value={{
                focus: focus,
                setFocus: setFocus,
                openModal: openModal,
                setOpenModal: setOpenModal,
                searchPlaces: searchPlaces({
                    locationsGateway: dependencies.locationsGateway,
                }),
                findLocationsByAddress: findLocationsByAddress({
                    locationsGateway: dependencies.locationsGateway,
                }),
                reverseGeocode: reverseGeocode({ locationsGateway: dependencies.locationsGateway }),
                retrieveTraceData: retrieveTraceData({ tracesApiGateway: dependencies.tracesApiGateway }),
                locale: 'fr',
                resetFilters: resetFilters,
                setResetFilters: setResetFilters,
                errors,
                setErrors,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
