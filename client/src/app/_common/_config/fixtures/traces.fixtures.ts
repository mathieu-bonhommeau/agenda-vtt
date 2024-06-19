import { Trace } from '@/app/traces/business/models/trace'

export const ugatawaTraces: { [link: string]: Partial<Trace> } = {
    'https://www.utagawavtt.com/randonnee-vtt-gps/Seyssinet-parc-Karl-Marx-Desert-de-Jean-Jacques-Rousseau-43872': {
        utagawaId: 43872,
        distance: 12,
        positiveElevation: 440,
        traceColor: 'green',
    },
    'https://www.utagawavtt.com/randonnee-vtt-gps/Mandallaz-Cret-de-la-Dame-43768': {
        utagawaId: 43768,
        distance: 35,
        positiveElevation: 1040,
        traceColor: 'black',
    },
    'https://www.utagawavtt.com/randonnee-vtt-gps/Autour-de-La-Combe-de-Sillingy-43730': {
        utagawaId: 43730,
        distance: 18,
        positiveElevation: 460,
        traceColor: 'blue',
    },
    'https://www.utagawavtt.com/randonnee-vtt-gps/Rando-des-Lauzes-2024-50-km-43583': {
        utagawaId: 43583,
        distance: 51,
        positiveElevation: 1400,
        traceColor: 'red',
    },
    'https://www.utagawavtt.com/randonnee-vtt-gps/Sous-le-Mont-de-la-Charvaz-43149': {
        utagawaId: 43149,
        distance: 42,
        positiveElevation: 1010,
        traceColor: 'blue',
    },
}
