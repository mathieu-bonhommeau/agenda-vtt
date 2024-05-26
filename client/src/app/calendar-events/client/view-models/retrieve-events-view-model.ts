import { AppState } from '@/app/_common/business/store/appState'
import { CalendarEvent } from '@/app/calendar-events/business/models/event'
import { traceLevelColor } from '@/app/traces/business/models/trace'
import { Event } from 'react-big-calendar'

export type EventsReactBigCalendarVM = Event[]
export const eventsReactBigCalendarVM =
    () =>
    (state: AppState): EventsReactBigCalendarVM => {
        return state.eventsState.events.map((event: CalendarEvent) => ReactBigCalendarEventFactory.create(event))
    }

export type CalendarEventVM = CalendarEvent
export type CalendarEventsVM = CalendarEventVM[]

// TODO Probably move the sort in backend !'
export const eventsVM =
    () =>
    (state: AppState): CalendarEventsVM => {
        return state.eventsState.events.map((event) => ({
            ...event,
            startDate: new Date(event.startDate).toDateString(),
            endDate: new Date(event.endDate).toDateString(),
            traces: event.traces
                ? [...event.traces].sort((a, b) => {
                      const colorA = a.traceColor || 'notDefined'
                      const colorB = b.traceColor || 'notDefined'
                      if (traceLevelColor[colorA] < traceLevelColor[colorB]) return -1
                      if (traceLevelColor[colorA] > traceLevelColor[colorB]) return 1
                      return 0
                  })
                : [],
        }))
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

export const eventsErrorsVM = () => (state: AppState) => {
    return state.eventsState.error
}

export const eventsLoadingVM = () => (state: AppState) => {
    return state.eventsState.loading
}
