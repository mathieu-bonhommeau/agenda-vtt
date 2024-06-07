import { Dependencies } from '@/app/_common/business/store/store'
import { centerCountry } from '@/app/calendar-events/business/models/geolocation'
import { CalendarEventVM } from '@/app/calendar-events/client/view-models/retrieve-events-view-model'
import { findLocationsByAddress } from '@/app/geolocation/business/use-cases/find-locations-by-address/find-locations-by.address'
import { searchPlaces } from '@/app/geolocation/business/use-cases/search-place/searchPlace'
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
    locale: 'fr' | 'en'
    resetFilters: boolean
    setResetFilters: Dispatch<SetStateAction<boolean>>
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
                locale: 'fr',
                resetFilters: resetFilters,
                setResetFilters: setResetFilters,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
