import { AppState } from '@/app/_common/business/store/appState'
import { CalendarEvent } from '@/app/calendar-events/business/models/event'

export const newEventDraftStepLengthVM = (state: AppState) => {
    return state.newEventState.steps.length
}

export const newEventDraftCurrentStepVM = (state: AppState) => {
    return state.newEventState.steps[state.newEventState.steps.length - 1]
}

export const newEventDraftStepsVM = (state: AppState) => {
    return state.newEventState.steps
}

export const newEventDraftStepsName = {
    MAIN_DATA: `Détails de l'événement`,
    TRACES: `Itinéraires et difficulté`,
    ADDITIONAL_DATA: 'Informations pratiques',
    OVERVIEW: 'Aperçu',
} as const

export type NewEventDraftSteps = keyof typeof newEventDraftStepsName

export const overviewCalendarEventFromNewEventDraft = (state: AppState): CalendarEvent => {
    const draft = state.newEventState.draft
    return {
        title: draft.title || '',
        description: draft.description,
        startDate: draft.startDate || '',
        endDate: draft.endDate || '',
        eventLocation: {
            country: draft.eventLocation?.country || '',
            region: draft.eventLocation?.region,
            county: draft.eventLocation?.county,
            city: draft.eventLocation?.city || '',
            postcode: draft.eventLocation?.postcode,
            housenumber: draft.eventLocation?.housenumber,
            address: draft.eventLocation?.address || '',
            latLon: draft.eventLocation?.latLon || { lat: 0, lon: 0 },
        },
        traces: draft.traces
            ? draft.traces.map((trace) => ({
                  id: trace.id || '',
                  utagawaId: trace.utagawaId,
                  link: trace.link,
                  distance: trace.distance || 0,
                  positiveElevation: trace.positiveElevation,
                  traceColor: trace.traceColor,
              }))
            : [],
        price: draft.price,
        services: draft.services,
        organizer: {
            name: draft.organizer?.name || '',
            email: draft.organizer?.email || '',
            website: draft.organizer?.website || '',
            contacts: draft.organizer?.contacts,
        },
    }
}
