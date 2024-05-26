import { Dependencies } from '@/app/_common/business/store/store'
import { centerCountry } from '@/app/calendar-events/business/models/geolocation'
import { searchPlaces } from '@/app/filters-events/business/use-cases/search-place/searchPlace'
import { fromLonLat } from 'ol/proj'
import React, { Dispatch, PropsWithChildren, SetStateAction, useState } from 'react'
import { RView } from 'rlayers/RMap'

export type AppContextType = {
    focus: RView
    setFocus: Dispatch<SetStateAction<RView>>
    searchPlaces: ReturnType<typeof searchPlaces>
}

export const AppContext = React.createContext<AppContextType>({} as AppContextType)

export function AppContextProvider({
    children,
    dependencies,
}: PropsWithChildren<NonNullable<unknown>> & { dependencies: Dependencies }) {
    const [focus, setFocus] = useState<RView>({
        center: fromLonLat([centerCountry['France'].lon, centerCountry['France'].lat]),
        zoom: 6,
    })

    return (
        <AppContext.Provider
            value={{
                focus: focus,
                setFocus: setFocus,
                searchPlaces: searchPlaces({
                    placesGateway: dependencies.placesGateway,
                }),
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
