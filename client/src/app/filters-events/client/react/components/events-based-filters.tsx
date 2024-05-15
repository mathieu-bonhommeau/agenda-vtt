import { InputDateRangePicker } from '@/app/_common/client/components/form/date-range-picker'
import { SearchTextAndSelect } from '@/app/_common/client/components/form/select-text-and-select'
import { AppContext } from '@/app/_common/client/context/app-context'
import { EventsFilters, SearchPlace } from '@/app/filters-events/business/models/filter'
import { Card, CardHeader, TextField } from '@mui/material'
import { ChangeEvent, ReactNode, useContext, useState } from 'react'

export function EventsBasedFilters({ handleAddFilter }: { handleAddFilter: (filters: EventsFilters) => void }) {
    let searchTimeout: NodeJS.Timeout
    const [searchPlace, setSearchPlace] = useState<string>()
    const [searchByWord, setSearchByWord] = useState<string>('')
    const [searchResults, setSearchResults] = useState<SearchPlace[]>([])
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()
    const { searchPlaces } = useContext(AppContext)

    const handleSearchPlace = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchPlace(e.target.value)
        clearTimeout(timeoutId)
        if (e.target.value.length >= 2) {
            searchTimeout = setTimeout(() => {
                searchPlaces({ search: e.target.value }).then((places) => {
                    setSearchResults(places)
                })
            }, 1000)
            setTimeoutId(searchTimeout)
        }
        handleAddFilter({ place: undefined })
        return () => clearTimeout(searchTimeout)
    }

    const commitSearchPlaceSelected = (event: ChangeEvent<HTMLSelectElement>, _: ReactNode) => {
        setSearchPlace(event.currentTarget.value)
        const { options } = event.currentTarget
        for (let i = 0, l = options.length; i < l; i += 1) {
            if ((options[i] as HTMLOptionElement).selected) {
                handleAddFilter({ place: searchResults[i] })
            }
        }
        setSearchResults([])
    }

    console.log(searchResults)

    return (
        <Card variant="outlined" sx={{ maxWidth: 500, p: 2, my: 2 }}>
            <CardHeader title={'Rechercher des évenements'} sx={{ px: 0 }}></CardHeader>
            <TextField
                sx={{ width: 500, my: 1 }}
                onChange={(e) => setSearchByWord(e.target.value)}
                placeholder={"Nom de l'évenement, Nom de l'organisateur, ..."}
                id="outlined-basic"
                label="Par mots clé"
                variant="outlined"
            />
            {/*<SearchTextAndSelect
                searchValue={searchByWord || ''}
                handleInput={handleSearchWord}
                searchResults={searchResults.map((result, index) => ({
                    mainLabel: result.city,
                    subLabel: result.postcode,
                    index,
                }))}
                commitSearchSelected={commitSearchPlaceSelected}
            />*/}
            <SearchTextAndSelect
                searchValue={searchPlace || ''}
                handleInput={handleSearchPlace}
                searchResults={searchResults.map((result, index) => ({
                    mainLabel: result.city,
                    subLabel: result.postcode,
                    index,
                }))}
                commitSearchSelected={commitSearchPlaceSelected}
            />
            <InputDateRangePicker
                startDateLabel={'De'}
                endDateLabel={'à'}
                locale={'fr'}
                commitDates={handleAddFilter}
            />
        </Card>
    )
}
