import { Dependencies } from '@/app/_common/business/store/store'
import React, { PropsWithChildren } from 'react'

export type AppContextType = {
    searchGeolocationFromExternalSource: ReturnType<typeof searchGeolocationFromExternalSource>
}

export const AppContext = React.createContext<AppContextType>({} as AppContextType)

export function AppContextProvider({
    children,
    dependencies,
}: PropsWithChildren<NonNullable<unknown>> & { dependencies: Dependencies }) {
    return (
        <AppContext.Provider
            value={{
                searchGeolocationFromExternalSource: searchGeolocationFromExternalSource({
                    geolocationExternalGateway: dependencies.placesGateway,
                }),
            }}
        >
            {children}
        </AppContext.Provider>
    )
}
