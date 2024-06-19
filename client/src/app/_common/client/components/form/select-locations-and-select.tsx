import { AppContext } from '@/app/_common/client/context/app-context'
import { EventLocation } from '@/app/calendar-events/business/models/geolocation'
import { SearchPlace } from '@/app/geolocation/business/models/search-place'
import { Box, IconButton, Popper, Select, SelectChangeEvent, TextField } from '@mui/material'
import { ChangeEvent, Dispatch, ReactNode, SetStateAction, useContext, useRef } from 'react'
import { MdClear } from 'react-icons/md'

function isSearchPlace(result: SearchPlace | EventLocation): result is SearchPlace {
    return (result as SearchPlace).bbox !== undefined
}

export function SearchLocationsAndSelect({
    name,
    searchValue,
    setSearchValue,
    handleInput,
    handleReset,
    searchResults,
    openSelectResults,
    commitSearchSelected,
    placeholder,
    label,
}: {
    name: string
    searchValue: string
    setSearchValue: Dispatch<SetStateAction<string>>
    handleInput: (e: ChangeEvent<HTMLInputElement>) => void
    handleReset?: () => void
    searchResults: SearchPlace[] | EventLocation[]
    openSelectResults: string | null
    commitSearchSelected: (event: ChangeEvent<HTMLSelectElement>, child: ReactNode) => void
    placeholder: string
    label: string
}) {
    const searchInput = useRef<HTMLDivElement | null>(null)
    const { resetFilters, setResetFilters } = useContext(AppContext)

    const handleChangePlace = (event: SelectChangeEvent<string>, child: ReactNode) => {
        commitSearchSelected(event as unknown as ChangeEvent<HTMLSelectElement>, child)
    }

    return (
        <Box style={{ position: 'relative', display: 'flex' }}>
            <TextField
                sx={{ width: '100%', my: 1 }}
                onChange={handleInput}
                onFocus={() => {
                    if (resetFilters) {
                        setResetFilters(false)
                        setSearchValue('')
                    }
                }}
                value={!resetFilters ? searchValue : ''}
                placeholder={placeholder}
                id="outlined-basic"
                label={label}
                variant="outlined"
                ref={searchInput}
                InputProps={{
                    endAdornment: searchValue && (
                        <IconButton aria-label="reset-dates" onClick={handleReset} sx={{ fontSize: '1.3rem' }}>
                            <MdClear />
                        </IconButton>
                    ),
                }}
            />
            {searchResults.length ? (
                <Popper
                    open={openSelectResults === name}
                    anchorEl={searchInput.current}
                    placement="bottom-start"
                    style={{ zIndex: 10000 }}
                >
                    <Select
                        style={{ padding: 2, background: 'white' }}
                        multiple
                        native
                        onChange={handleChangePlace}
                        inputProps={{
                            id: 'select-multiple-native',
                        }}
                    >
                        {searchResults.map((result, index) => {
                            if (isSearchPlace(result)) {
                                return (
                                    <option key={`${result.city}-${index}`}>
                                        {`${result.city || ''} ${result.postcode || ''} ${result.county || ''}`}
                                    </option>
                                )
                            }
                            return (
                                <option key={`${result.address}-${index}`}>
                                    {`${result.housenumber || ''} ${result.address || ''} ${result.postcode || ''} ${
                                        result.city || ''
                                    }, ${result.country || ''}`}
                                </option>
                            )
                        })}
                    </Select>
                </Popper>
            ) : (
                <></>
            )}
        </Box>
    )
}
