import { AppState } from '@/app/_common/business/store/appState'

export const eventsFiltersVM = () => (state: AppState) => {
    return state.filtersState.filters
}
