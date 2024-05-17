import { Box, FormControl, IconButton, Select, SelectChangeEvent, TextField } from '@mui/material'
import { ChangeEvent, ReactNode, useRef } from 'react'
import { TiDelete } from 'react-icons/ti'

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

    return (
        <Box style={{ position: 'relative', display: 'flex' }}>
            <TextField
                sx={{ width: 500, my: 1 }}
                onChange={handleInput}
                value={searchValue}
                placeholder={'Ville en 🇫🇷, 🇧🇪 ou 🇨🇭'}
                id="outlined-basic"
                label="Lieu"
                variant="outlined"
                ref={searchInput}
            />
            {searchValue && (
                <IconButton aria-label="reset-dates" color="error" onClick={handleReset}>
                    <TiDelete />
                </IconButton>
            )}
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
                    <Select
                        style={{ background: 'white' }}
                        multiple
                        native
                        onChange={
                            commitSearchSelected as unknown as (
                                event: SelectChangeEvent<string>,
                                child: ReactNode,
                            ) => void
                        }
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
                </FormControl>
            ) : (
                <></>
            )}
        </Box>
    )
}
