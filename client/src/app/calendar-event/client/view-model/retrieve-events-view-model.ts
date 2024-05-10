import { AppState } from '@/app/_common/business/store/appState'
import { CalendarEvent } from '@/app/calendar-event/business/model/event'
import { Event } from 'react-big-calendar'

export type EventsReactBigCalendarVM = Event[]
export const eventsReactBigCalendarVM =
    () =>
    (state: AppState): EventsReactBigCalendarVM => {
        return state.eventsState.events.map((event: CalendarEvent) => ReactBigCalendarEventFactory.create(event))
    }

export type CalendarEventVM = CalendarEvent
export type CalendarEventsVM = CalendarEventVM[]

export const eventsVM =
    () =>
    (state: AppState): CalendarEventsVM => {
        return state.eventsState.events
    }

export class ReactBigCalendarEventFactory {
    static create(event: CalendarEvent): Event {
        return {
            title: event.title,
            start: new Date(event.startDate) || undefined,
            end: new Date(event.endDate) || undefined,
        }
    }
}

export const eventsFiltersVM = () => (state: AppState) => {
    return state.eventsState.filters
}

export const eventsErrorsVM = () => (state: AppState) => {
    return state.eventsState.error
}

export const eventsLoadingVM = () => (state: AppState) => {
    return state.eventsState.loading
}
