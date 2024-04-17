import { AppState } from '@/app/_common/business/store/appState'

export const retrieveEventsVM = () => (state: AppState) => {
    return state.eventsState
}
