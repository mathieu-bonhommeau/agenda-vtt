import { CheckboxSet } from '@/app/_common/client/components/form/checkbox-set'
import { SliderRange } from '@/app/_common/client/components/form/input-range'
import { EventsFilters } from '@/app/filters-events/business/models/filter'
import { Box, Card, CardHeader } from '@mui/material'

export function RunsBasedFilters({ handleAddFilter }: { handleAddFilter: (filters: EventsFilters) => void }) {
    return (
        <Card variant="outlined" sx={{ maxWidth: 500, p: 2, my: 2 }}>
            <CardHeader title={'Filtrer les parcours'} sx={{ px: 0 }}></CardHeader>
            <SliderRange
                label={'Distance'}
                min={0}
                minLabel={'0 km'}
                max={60}
                maxLabel={'60 km et +'}
                initValue={30}
                step={10}
            />
            <Box sx={{ py: 1 }}></Box>
            <CheckboxSet initialChecked={{ vert: true, bleu: true, rouge: true, noir: true }} />
            <CheckboxSet initialChecked={{ 'All Mountain / XC': true, Enduro: true, 'DH / Gravity': true }} />
            <SliderRange
                label={'Dénivelé positif'}
                min={0}
                minLabel={'1000 m'}
                max={3000}
                maxLabel={'3000 m et +'}
                step={10}
            />
            <SliderRange
                label={'Dénivelé négatif'}
                min={0}
                minLabel={'1000 m'}
                max={3000}
                maxLabel={'3000 m et +'}
                step={10}
            />
            <SliderRange
                label={'Difficulté technique'}
                step={1}
                labelsStep={difficultySteps}
                marks={marks}
                min={0}
                max={5}
                initValue={0}
            />
            <SliderRange
                label={'Difficulté physique'}
                step={1}
                labelsStep={difficultySteps}
                marks={marks}
                min={0}
                max={5}
                initValue={0}
            />
            <SliderRange
                label={'Poussage & portage'}
                step={1}
                labelsStep={pushingCarryingSteps}
                marks={marks}
                min={0}
                max={5}
                initValue={0}
            />
        </Card>
    )
}

const difficultySteps = [
    'Facile',
    'Peu difficille',
    'Assez difficile',
    'Difficile',
    'Très difficile',
    'Extrêmement difficile',
]
const marks = [
    { value: 0, label: '' },
    { value: 1, label: '' },
    { value: 2, label: '' },
    { value: 3, label: '' },
    { value: 4, label: '' },
    { value: 5, label: '' },
]

const pushingCarryingSteps = [
    'Aucun',
    'Petit poussage',
    'Poussage',
    'Petit portage',
    'Portage >10m et <100m',
    'Portage >100m',
]
