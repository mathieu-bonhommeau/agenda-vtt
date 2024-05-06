import { CheckboxSet } from '@/app/_common/client/components/form/checkbox-set'
import { InputDateRangePicker } from '@/app/_common/client/components/form/date-range-picker'
import { SliderRange } from '@/app/_common/client/components/form/input-range'
import { Box, Card, CardHeader, TextField } from '@mui/material'
import { useState } from 'react'

export function Filters() {
    return (
        <Box>
            <EventsBasedFilters />
            <RunsBasedFilters />
        </Box>
    )
}

export function EventsBasedFilters() {
    const [searchPlace, setSearchPlace] = useState<string>('')
    const [searchByWord, setSearchByWord] = useState<string>('')

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
                onChange={(e) => setSearchPlace(e.target.value)}
                placeholder={'Ville en 🇫🇷, 🇧🇪 ou 🇨🇭'}
                id="outlined-basic"
                label="Lieu"
                variant="outlined"
            />
            <InputDateRangePicker startDateLabel={'De'} endDateLabel={'à'} locale={'fr'} />
        </Card>
    )
}

export function RunsBasedFilters() {
    return (
        <Card variant="outlined" sx={{ maxWidth: 500, p: 2, my: 2 }}>
            <CardHeader title={'Filtrer les parcours'} sx={{ px: 0 }}></CardHeader>
            <SliderRange label={'Distance'} min={0} minLabel={'0 km'} max={60} maxLabel={'60 km et +'} />
            <Box sx={{ py: 1 }}></Box>
            <CheckboxSet initialChecked={{ vert: true, bleu: true, rouge: true, noir: true }} />
            <CheckboxSet initialChecked={{ 'All Mountain / XC': true, Enduro: true, 'DH / Gravity': true }} />
            <SliderRange label={'Dénivelé positif'} min={0} minLabel={'1000 m'} max={3000} maxLabel={'3000 m et +'} />
            <SliderRange label={'Dénivelé négatif'} min={0} minLabel={'1000 m'} max={3000} maxLabel={'3000 m et +'} />
            <SliderRange label={'Dénivelé négatif'} min={0} minLabel={'1000 m'} max={3000} maxLabel={'3000 m et +'} />
        </Card>
    )
}
