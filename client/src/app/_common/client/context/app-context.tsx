import { Dependencies } from '@/app/_common/business/store/store'
import { searchPlaces } from '@/app/filters-events/business/use-cases/search-place/searchPlace'
import React, { PropsWithChildren } from 'react'

export type AppContextType = {
    searchPlaces: ReturnType<typeof searchPlaces>
}

export const AppContext = React.createContext<AppContextType>({} as AppContextType)

export function AppContextProvider({
    children,
    dependencies,
}: PropsWithChildren<NonNullable<unknown>> & { dependencies: Dependencies }) {
    return (
        <AppContext.Provider
            value={{
                searchPlaces: searchPlaces({
                    placesGateway: dependencies.placesGateway,
                }),
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
