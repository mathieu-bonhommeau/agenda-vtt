import { Box, FormControl, IconButton, Popover, Select, SelectChangeEvent, TextField } from '@mui/material'
import { ChangeEvent, ReactNode, useRef } from 'react'
import { MdClear } from 'react-icons/md'

export type SearchTextAndSelectResult = {
    mainLabel: string
    subLabel?: string
    index: number
}

export function SearchTextAndSelect({
    searchValue,
    handleInput,
    handleReset,
    searchResults,
    commitSearchSelected,
}: {
    searchValue: string
    handleInput: (e: ChangeEvent<HTMLInputElement>) => void
    handleReset: () => void
    searchResults: SearchTextAndSelectResult[]
    commitSearchSelected: (event: ChangeEvent<HTMLSelectElement>, child: ReactNode) => void
}) {
    const searchInput = useRef<HTMLDivElement | null>(null)

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
                value={searchValue}
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
                        open={!!searchResults}
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
