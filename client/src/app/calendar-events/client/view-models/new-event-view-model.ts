import { AppState } from '@/app/_common/business/store/appState'

export const newEventDraftStepLengthVM = (state: AppState) => {
    return state.newEventState.steps.length
}

export const newEventDraftCurrentStepVM = (state: AppState) => {
    return state.newEventState.steps[state.newEventState.steps.length - 1]
}

export const newEventDraftStepsName = {
    MAIN_DATA: `Détails de l'événement`,
    TRACES: `Itinéraires et difficulté`,
    ADDITIONAL_DATA: 'Informations pratiques',
    OVERVIEW: 'Aperçu',
} as const

export type NewEventDraftSteps = keyof typeof newEventDraftStepsName
