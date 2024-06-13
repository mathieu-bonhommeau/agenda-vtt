import { AppState } from '@/app/_common/business/store/appState'
import { AppDispatch } from '@/app/_common/business/store/store'
import { AppContext } from '@/app/_common/client/context/app-context'
import { newEventSlice } from '@/app/calendar-events/business/reducers/new-event-reducer'
import { TraceColor } from '@/app/traces/business/models/trace'
import { TableTraces } from '@/app/traces/client/react/components/table-traces'
import { DifficultyColorsStyle, difficultyColorsStyle } from '@/theme/theme'
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { ChangeEvent, useContext, useState } from 'react'
import { MdClear } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { v4 } from 'uuid'

export function TracesNewEventModal() {
    let searchTimeout: NodeJS.Timeout
    const dispatch = useDispatch<AppDispatch>()
    const { retrieveTraceData } = useContext(AppContext)
    const draft = useSelector((state: AppState) => state.newEventState.draft)

    const [traceLink, setTraceLink] = useState('')
    const [linkError, setLinkError] = useState<string>('')
    const [utagawaId, setUtagawaId] = useState<number>()
    const [difficulty, setDifficulty] = useState<TraceColor | 'notDefined'>('notDefined')
    const [distance, setDistance] = useState<string>('')
    const [positiveElevation, setPositiveElevation] = useState<string>('')
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>()

    console.log(traceLink)

    const handleTraceLink = (e: ChangeEvent<HTMLInputElement>) => {
        setTraceLink(e.target.value)
        clearTimeout(timeoutId)

        const urlPattern = /^https:\/\/www\.utagawavtt\.com\/randonnee-vtt-gps(\/[a-zA-Z0-9\-]*)*$/
        if (urlPattern.test(e.target.value)) {
            searchTimeout = setTimeout(() => {
                retrieveTraceData({ link: e.target.value }).then((traceData) => {
                    traceData?.utagawaId && setUtagawaId(traceData?.utagawaId)
                    traceData?.distance && setDistance(traceData.distance.toString())
                    traceData?.traceColor && setDifficulty(traceData.traceColor as TraceColor)
                    traceData?.positiveElevation && setPositiveElevation(traceData.positiveElevation.toString())
                })
            }, 1000)
            setTimeoutId(searchTimeout)
            return
        }
        setLinkError(`L'url fourni n'est pas valide`)
    }

    const handleNewTrace = (e: React.MouseEvent<HTMLElement>) => {
        dispatch(
            newEventSlice.actions.onAddTrace({
                id: v4(),
                utagawaId,
                traceColor: difficulty,
                link: traceLink,
                distance: parseInt(distance),
                positiveElevation: parseInt(positiveElevation),
            }),
        )
        setTraceLink('')
        setPositiveElevation('')
        setDistance('')
        setDifficulty('notDefined')
    }

    console.log(draft)

    return (
        <Box component={'form'} sx={{ my: 2 }} noValidate autoComplete="off">
            <Box display={'flex'} flexDirection={'column'} gap={2}>
                <TextField
                    fullWidth
                    //error={!!linkError}
                    //helperText={linkError}
                    onChange={handleTraceLink}
                    placeholder={'Lien vers la trace Gpx UtagawaVtt'}
                    type={'url'}
                    id="outlined-basic"
                    label="Lien vers trace Gpx UtagawaVTT"
                    variant="outlined"
                    value={traceLink}
                    InputProps={{
                        endAdornment: traceLink && (
                            <IconButton
                                aria-label="reset-dates"
                                onClick={() => setTraceLink('')}
                                sx={{ fontSize: '1.3rem' }}
                            >
                                <MdClear />
                            </IconButton>
                        ),
                    }}
                />
                <Box display={'flex'} gap={1} justifyContent={'space-between'}>
                    <TextField
                        onChange={(e) => setDistance(e.target.value)}
                        placeholder={'Distance du parcours'}
                        type={'number'}
                        id="outlined-basic"
                        label="Distance en Kms"
                        variant="outlined"
                        value={distance}
                        sx={{ flex: '1 1 0px' }}
                        InputProps={{
                            endAdornment: distance && (
                                <IconButton
                                    aria-label="reset-dates"
                                    onClick={() => setDistance('')}
                                    sx={{ fontSize: '1.3rem' }}
                                >
                                    <MdClear />
                                </IconButton>
                            ),
                        }}
                    />
                    <FormControl fullWidth sx={{ flex: '1 1 0px' }}>
                        <InputLabel id="demo-simple-select-label">Difficulté</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={difficulty}
                            label="Age"
                            onChange={(e) => setDifficulty(e.target.value as TraceColor | 'notDefined')}
                            sx={{ color: difficultyColorsStyle[difficulty as keyof DifficultyColorsStyle] || 'grey' }}
                        >
                            {Object.keys(traceLevelLabel).map((level: string) => (
                                <MenuItem
                                    key={level}
                                    value={level}
                                    sx={{
                                        color: difficultyColorsStyle[level as keyof DifficultyColorsStyle] || 'grey',
                                    }}
                                >
                                    {traceLevelLabel[level as keyof TraceLevelLabel]}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        onChange={(e) => setPositiveElevation(e.target.value)}
                        placeholder={'Dénivelé positif'}
                        type={'number'}
                        id="outlined-basic"
                        label="Dénivelé positif en m"
                        variant="outlined"
                        value={positiveElevation}
                        sx={{ flex: '1 1 0px' }}
                        InputProps={{
                            endAdornment: positiveElevation && (
                                <IconButton
                                    aria-label="reset-dates"
                                    onClick={() => setPositiveElevation('')}
                                    sx={{ fontSize: '1.3rem' }}
                                >
                                    <MdClear />
                                </IconButton>
                            ),
                        }}
                    />
                </Box>
                <Box display={'flex'} justifyContent={'flex-end'}>
                    <Button variant={'contained'} onClick={handleNewTrace}>
                        Ajouter un parcours
                    </Button>
                </Box>
            </Box>
            <TableTraces traces={draft.traces} customCss={{ my: 2 }} deleteBtn={true} />
        </Box>
    )
}

export const traceLevelLabel = {
    green: 'Vert',
    blue: 'Bleu',
    red: 'Rouge',
    black: 'Noir',
    notDefined: 'Non défini',
} as const

export type TraceLevelLabel = typeof traceLevelLabel
