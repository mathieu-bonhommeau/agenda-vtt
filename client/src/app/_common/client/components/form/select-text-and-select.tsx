import { AppContext } from '@/app/_common/client/context/app-context'
import { Box, FormControl, IconButton, Popover, Select, SelectChangeEvent, TextField } from '@mui/material'
import { ChangeEvent, Dispatch, ReactNode, SetStateAction, useContext, useRef } from 'react'
import { MdClear } from 'react-icons/md'

export type SearchTextAndSelectResult = {
    mainLabel: string
    subLabel?: string
    index: number
}

export function SearchTextAndSelect({
    searchValue,
    setSearchValue,
    handleInput,
    handleReset,
    searchResults,
    openSelectResults,
    commitSearchSelected,
}: {
    searchValue: string
    setSearchValue: Dispatch<SetStateAction<string>>
    handleInput: (e: ChangeEvent<HTMLInputElement>) => void
    handleReset: () => void
    searchResults: SearchTextAndSelectResult[]
    openSelectResults: boolean
    commitSearchSelected: (event: ChangeEvent<HTMLSelectElement>, child: ReactNode) => void
}) {
    const searchInput = useRef<HTMLDivElement | null>(null)
    const { resetFilters, setResetFilters } = useContext(AppContext)

    const defineHeightInput = () => {
        return searchInput?.current?.offsetHeight
    }

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
                placeholder={'Région, ville, ... en 🇫🇷, 🇧🇪 ou 🇨🇭'}
                id="outlined-basic"
                label="Par région, ville, ... en 🇫🇷, 🇧🇪 ou 🇨🇭"
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
                <FormControl
                    sx={{
                        my: '10px',
                        width: '100%',
                        height: '70%',
                        position: 'absolute',
                        left: 0,
                        top: defineHeightInput(),
                        zIndex: 10,
                    }}
                >
                    <Popover
                        open={openSelectResults}
                        anchorEl={searchInput.current}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <Select
                            style={{ background: 'white' }}
                            multiple
                            native
                            onChange={handleChangePlace}
                            inputProps={{
                                id: 'select-multiple-native',
                            }}
                        >
                            {searchResults.map((result) => (
                                <option key={`${result.mainLabel}-${result.index}`}>
                                    {`${result.mainLabel} - ${result.subLabel || ''}`}
                                </option>
                            ))}
                        </Select>
                    </Popover>
                </FormControl>
            ) : (
                <></>
            )}
        </Box>
    )
}
