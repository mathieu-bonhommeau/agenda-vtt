import { InputDateRangePicker } from '@/app/_common/client/components/form/date-range-picker'
import { AppContext } from '@/app/_common/client/context/app-context'
import { EventsFilters } from '@/app/filters-events/business/models/filter'
import { SearchPlace } from '@/app/filters-events/business/use-cases/search-place/searchPlace'
import { Card, CardHeader, TextField } from '@mui/material'
import { ChangeEvent, useContext, useState } from 'react'

export function EventsBasedFilters({ handleAddFilter }: { handleAddFilter: (filters: EventsFilters) => void }) {
    let searchTimeout: NodeJS.Timeout
    const [searchPlace, setSearchPlace] = useState<string>('')
    const [searchByWord, setSearchByWord] = useState<string>('')
    const [searchResults, setSearchResults] = useState<SearchPlace[]>([])
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()
    const { searchPlaces } = useContext(AppContext)

    const handleSearchPlace = (e: ChangeEvent<HTMLInputElement>) => {
        console.log('test')
        clearTimeout(timeoutId)
        if (e.target.value.length >= 2) {
            searchTimeout = setTimeout(() => {
                searchPlaces({ search: e.target.value }).then((places) => {
                    setSearchResults(places)
                })
            }, 1000)
            setTimeoutId(searchTimeout)
        }
        return () => clearTimeout(searchTimeout)
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
            <TextField
                sx={{ width: 500, my: 1 }}
                onChange={handleSearchPlace}
                placeholder={'Ville en 🇫🇷, 🇧🇪 ou 🇨🇭'}
                id="outlined-basic"
                label="Lieu"
                variant="outlined"
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
