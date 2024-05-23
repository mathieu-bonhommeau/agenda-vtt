import { InputDateRangePicker } from '@/app/_common/client/components/form/date-range-picker'
import { SliderRange } from '@/app/_common/client/components/form/input-range'
import { SearchTextAndSelect } from '@/app/_common/client/components/form/select-text-and-select'
import { AppContext } from '@/app/_common/client/context/app-context'
import { EventsFilters, SearchPlace } from '@/app/filters-events/business/models/filter'
import { Box, IconButton, TextField, Typography } from '@mui/material'
import { ChangeEvent, ReactNode, useContext, useState } from 'react'
import { TiDelete } from 'react-icons/ti'

export function EventsBasedFilters({ handleAddFilter }: { handleAddFilter: (filters: EventsFilters) => void }) {
    let searchTimeout: NodeJS.Timeout
    const [searchPlace, setSearchPlace] = useState<string>('')
    const [searchByWord, setSearchByWord] = useState<string>('')
    const [searchResults, setSearchResults] = useState<SearchPlace[]>([])
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()
    const { searchPlaces } = useContext(AppContext)

    const handleSearchWord = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchByWord(e.target.value)
        clearTimeout(timeoutId)
        if (e.target.value.length >= 2) {
            searchTimeout = setTimeout(() => {
                handleAddFilter({ keyWord: e.target.value })
                return
            }, 1000)
            setTimeoutId(searchTimeout)
        }
        if (e.target.value.length < 2) handleAddFilter({ keyWord: undefined })
        return () => clearTimeout(searchTimeout)
    }

    const handleSearchByWordReset = () => {
        setSearchByWord('')
        handleAddFilter({ keyWord: '' })
    }

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

    const handleSearchPlaceReset = () => {
        setSearchPlace('')
        setSearchResults([])
        handleAddFilter({ place: undefined })
    }

    const handleSliderDistance = ({ min, max }: { min?: number; max?: number }) => {
        handleAddFilter({ distanceMax: max, distanceMin: min })
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant={'h6'}>Filtres</Typography>
            <Box sx={{ my: 1, width: '100%', display: 'flex' }}>
                <TextField
                    sx={{ my: 1, flexGrow: 1 }}
                    onChange={handleSearchWord}
                    placeholder={"Nom de l'évenement, Nom de l'organisateur, ..."}
                    id="outlined-basic"
                    label="Par mots clé"
                    variant="outlined"
                    value={searchByWord}
                />
                {searchByWord && (
                    <IconButton aria-label="reset-dates" color="error" onClick={handleSearchByWordReset}>
                        <TiDelete />
                    </IconButton>
                )}
            </Box>
            <SearchTextAndSelect
                searchValue={searchPlace || ''}
                handleInput={handleSearchPlace}
                handleReset={handleSearchPlaceReset}
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
            <SliderRange
                label={'Kilométrages des parcours'}
                min={0}
                minLabel={'0 km'}
                max={60}
                maxLabel={'60 km et +'}
                commitValues={handleSliderDistance}
            />
        </Box>
    )
}
