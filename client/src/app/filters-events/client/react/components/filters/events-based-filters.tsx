import { InputDatePickers } from '@/app/_common/client/components/form/input-date-pickers'
import { SliderRange } from '@/app/_common/client/components/form/input-range'
import { SearchLocationsAndSelect } from '@/app/_common/client/components/form/select-locations-and-select'
import { AppContext } from '@/app/_common/client/context/app-context'
import { placeZoom } from '@/app/_common/helpers/place-helpers'
import { EventsFilters } from '@/app/filters-events/business/models/filter'
import { SearchPlace } from '@/app/geolocation/business/models/search-place'
import { Box, Card, Divider, IconButton, TextField, Typography } from '@mui/material'
import { fromLonLat } from 'ol/proj'
import { ChangeEvent, ReactNode, useContext, useState } from 'react'
import { MdClear } from 'react-icons/md'

export function EventsBasedFilters({ handleAddFilter }: { handleAddFilter: (filters: EventsFilters) => void }) {
    let searchTimeout: NodeJS.Timeout
    const [searchPlace, setSearchPlace] = useState<string>('')
    const [searchByWord, setSearchByWord] = useState<string>('')
    const [searchResults, setSearchResults] = useState<SearchPlace[]>([])
    const [openPlacesResults, setOpenPlacesResults] = useState<boolean>(false)
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()
    const { searchPlaces, setFocus, resetFilters, setResetFilters } = useContext(AppContext)

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
                    setOpenPlacesResults(true)
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
                setFocus({
                    center: fromLonLat([searchResults[i].latLon.lon, searchResults[i].latLon.lat]),
                    zoom: placeZoom[searchResults[i].type],
                })
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
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <InputDatePickers startDateLabel={'De'} endDateLabel={'à'} locale={'fr'} commitDates={handleAddFilter} />
            <Card sx={{ p: 3 }}>
                <Box sx={{ my: 1, width: '100%', display: 'flex' }}>
                    <TextField
                        sx={{ my: 1, flexGrow: 1 }}
                        onChange={handleSearchWord}
                        onFocus={() => {
                            setResetFilters(false)
                            setSearchByWord('')
                        }}
                        placeholder={"Nom de l'évenement, Nom de l'organisateur, ..."}
                        id="outlined-basic"
                        label="Par mots clé"
                        variant="outlined"
                        value={!resetFilters ? searchByWord : ''}
                        InputProps={{
                            endAdornment: searchByWord && (
                                <IconButton
                                    aria-label="reset-dates"
                                    onClick={handleSearchByWordReset}
                                    sx={{ fontSize: '1.3rem' }}
                                >
                                    <MdClear />
                                </IconButton>
                            ),
                        }}
                    />
                </Box>
                <SearchLocationsAndSelect
                    searchValue={searchPlace || ''}
                    setSearchValue={setSearchPlace}
                    handleInput={handleSearchPlace}
                    handleReset={handleSearchPlaceReset}
                    searchResults={searchResults.map((result, index) => ({
                        mainLabel: result.city,
                        subLabel: result.postcode,
                        index,
                    }))}
                    openSelectResults={openPlacesResults}
                    commitSearchSelected={commitSearchPlaceSelected}
                    placeholder={'Région, ville, ... en 🇫🇷, 🇧🇪 ou 🇨🇭'}
                    label={'Région, ville, ... en 🇫🇷, 🇧🇪 ou 🇨🇭'}
                />
            </Card>
            <Card sx={{ p: 3 }}>
                <Typography sx={{ paddingBottom: 2 }}>Kilométrages des parcours</Typography>
                <Divider />
                <SliderRange
                    min={0}
                    minLabel={'0 km'}
                    max={60}
                    maxLabel={'60 km et +'}
                    commitValues={handleSliderDistance}
                />
            </Card>
        </Box>
    )
}
