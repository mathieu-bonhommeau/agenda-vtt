import { DateRangePickers } from '@/app/_common/client/components/form/date-pickers/date-range-pickers'
import { SearchLocationsAndSelect } from '@/app/_common/client/components/form/select-locations-and-select'
import { WysiwygEditor } from '@/app/_common/client/components/form/wysiwyg-editor/wysiwyg-editor'
import { AppContext } from '@/app/_common/client/context/app-context'
import { EventLocation } from '@/app/calendar-events/business/models/geolocation'
import { FormControl, IconButton, TextField } from '@mui/material'
import Box from '@mui/material/Box'
import { ChangeEvent, ReactNode, useContext, useState } from 'react'
import { MdClear } from 'react-icons/md'

export function MainDataNewEventModal() {
    let searchTimeout: NodeJS.Timeout
    const { locale, findLocationsByAddress } = useContext(AppContext)
    const [title, setTitle] = useState<string>('')
    const [newEventDates, setNewEventDates] = useState<{ startDate: string; endDate: string }>({})
    const [findLocations, setFindLocations] = useState<string>('')
    const [searchResults, setFindLocationsResults] = useState<EventLocation[]>([])
    const [openPlacesResults, setOpenPlacesResults] = useState<boolean>(false)
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()

    console.log(searchResults)

    const handleEventDates = (date: { startDate?: string; endDate?: string }) => {
        setNewEventDates({ startDate: date.startDate || '', endDate: date.endDate || '' })
    }

    const commitSearchPlaceSelected = (event: ChangeEvent<HTMLSelectElement>, _: ReactNode) => {
        setFindLocations(event.currentTarget.value)
        setFindLocationsResults([])
    }

    const handleFindLocationByAddress = (e: ChangeEvent<HTMLInputElement>) => {
        setFindLocations(e.target.value)
        clearTimeout(timeoutId)
        if (e.target.value.length >= 2) {
            searchTimeout = setTimeout(() => {
                findLocationsByAddress({ address: e.target.value }).then((locations) => {
                    setFindLocationsResults(locations)
                    setOpenPlacesResults(true)
                })
            }, 1000)
            setTimeoutId(searchTimeout)
        }
        return () => clearTimeout(searchTimeout)
    }

    const handleSearchPlaceReset = () => {
        setFindLocations('')
        setFindLocationsResults([])
    }

    return (
        <Box
            component={'form'}
            sx={{
                '& > :not(style)': { m: 1 },
            }}
            noValidate
            autoComplete="off"
        >
            <FormControl variant="standard">
                <TextField
                    sx={{ my: 1, flexGrow: 1 }}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={"Titre de l'événement"}
                    id="outlined-basic"
                    label="Titre de l'événement"
                    variant="outlined"
                    value={title}
                    InputProps={{
                        endAdornment: title && (
                            <IconButton
                                aria-label="reset-dates"
                                onClick={() => setTitle('')}
                                sx={{ fontSize: '1.3rem' }}
                            >
                                <MdClear />
                            </IconButton>
                        ),
                    }}
                />
                <WysiwygEditor />
                <DateRangePickers
                    commitDates={handleEventDates}
                    startDateLabel={`Début de l'événement`}
                    endDateLabel={`Fin de l'événement`}
                    locale={locale}
                />
                <SearchLocationsAndSelect
                    searchValue={findLocations}
                    setSearchValue={setFindLocations}
                    handleInput={handleFindLocationByAddress}
                    handleReset={handleSearchPlaceReset}
                    searchResults={searchResults.map((result, index) => ({
                        mainLabel: result.city,
                        subLabel: result.postcode,
                        index,
                    }))}
                    openSelectResults={openPlacesResults}
                    commitSearchSelected={commitSearchPlaceSelected}
                    placeholder={`Adresse de l'événement`}
                    label={`Adresse de l'événement`}
                />
            </FormControl>
        </Box>
    )
}
