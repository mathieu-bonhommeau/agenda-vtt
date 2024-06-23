import { AppContext } from '@/app/_common/client/context/app-context'
import { EventLocation } from '@/app/calendar-events/business/models/geolocation'
import { SearchPlace } from '@/app/geolocation/business/models/search-place'
import { Box, IconButton, MenuItem, Popper, TextField } from '@mui/material'
import React, { ChangeEvent, Dispatch, SetStateAction, useContext, useRef } from 'react'
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
    commitSearchPlaceSelected,
    commitSearchEventLocationSelected,
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
    commitSearchPlaceSelected?: (place: SearchPlace) => void
    commitSearchEventLocationSelected?: (eventLocation: EventLocation) => void
    placeholder: string
    label: string
}) {
    const searchInput = useRef<HTMLDivElement | null>(null)
    const { resetFilters, setResetFilters } = useContext(AppContext)

    const handleChangePlace = (_: React.MouseEvent<HTMLLIElement>, index: number) => {
        commitSearchPlaceSelected && commitSearchPlaceSelected(searchResults[index] as SearchPlace)
        commitSearchEventLocationSelected && commitSearchEventLocationSelected(searchResults[index] as EventLocation)
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
                <>
                    <Popper
                        open={openSelectResults === name}
                        anchorEl={searchInput.current}
                        placement="bottom-start"
                        style={{ zIndex: 10000 }}
                        disablePortal={false}
                    >
                        {searchResults.length && (
                            <Box
                                style={{
                                    padding: 2,
                                    background: 'white',
                                    overflow: 'scroll',
                                    maxWidth: '300px',
                                    border: '1px solid #F2F2F2',
                                    maxHeight: '300px',
                                }}
                            >
                                {searchResults.map((result, index) => {
                                    if (isSearchPlace(result)) {
                                        return (
                                            <MenuItem
                                                sx={{ textWrap: 'wrap' }}
                                                key={`${result.city}-${index}`}
                                                value={index}
                                                onClick={(_) => handleChangePlace(_, index)}
                                            >
                                                {`${result.city || ''} ${result.postcode || ''} ${result.county || ''}`}
                                            </MenuItem>
                                        )
                                    }
                                    return (
                                        <MenuItem
                                            sx={{ textWrap: 'wrap' }}
                                            key={`${result.address}-${index}`}
                                            value={index}
                                            onClick={(_) => handleChangePlace(_, index)}
                                        >
                                            {`${result.housenumber || ''} ${result.address || ''} ${
                                                result.postcode || ''
                                            } ${result.city || ''}, ${result.country || ''}`}
                                        </MenuItem>
                                    )
                                })}
                            </Box>
                        )}
                    </Popper>
                </>
            ) : (
                <></>
            )}
        </Box>
    )
}
