import { AppState } from '@/app/_common/business/store/appState'
import { CalendarEvent } from '@/app/calendar-events/business/models/event'
import { traceLevelColor } from '@/app/traces/business/models/trace'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import { createSelector } from 'reselect'
dayjs.extend(localizedFormat)
dayjs.extend(weekOfYear)
dayjs.locale('fr')

export type CalendarEventVM = CalendarEvent
export type CalendarEventsVM = CalendarEventVM[]

// TODO Probably move the sort in backend !'

const selectEvents = (state: AppState): CalendarEventsVM => state.eventsState.events
export const eventsVM = () =>
    createSelector([selectEvents], (events): CalendarEventsVM => {
        return events.map((event) => prepareEvent(event))
    })

export type CountyNumber = string | 'not-defined'
export type CalendarEventsSortedByCounty = { [departmentNumber: CountyNumber]: CalendarEventsVM }

export const eventsVMByCounty = () =>
    createSelector([selectEvents], (events): CalendarEventsSortedByCounty => {
        const eventsVMByCounty: CalendarEventsSortedByCounty = { ['not-defined']: [] }
        const preparedEvents = events.map((event) => prepareEvent(event))

        preparedEvents.forEach((event: CalendarEventVM) => {
            if (!event.eventLocation.postcode) {
                eventsVMByCounty['not-defined'].push(event)
                return
            }

            if (!Object.hasOwn(eventsVMByCounty, event.eventLocation.postcode!.slice(0, 2))) {
                eventsVMByCounty[event.eventLocation.postcode!.slice(0, 2)] = [event]
                return
            }

            if (Object.hasOwn(eventsVMByCounty, event.eventLocation.postcode!.slice(0, 2))) {
                eventsVMByCounty[event.eventLocation.postcode!.slice(0, 2)] = [
                    ...eventsVMByCounty[event.eventLocation.postcode!.slice(0, 2)],
                    event,
                ]
            }
        })

        return eventsVMByCounty
    })

export type CalendarEventsSortedByDate = { [weekNumber: string]: CalendarEventsVM }

export const eventsVMByDate = () =>
    createSelector([selectEvents], (events): CalendarEventsSortedByDate => {
        const eventsVMByDate: CalendarEventsSortedByDate = {}
        const preparedEvents = events.map((event) => prepareEvent(event))

        preparedEvents.forEach((event: CalendarEventVM) => {
            const eventWeekIndex = dayjs(new Date(event.startDate)).week()

            if (!eventsVMByDate[eventWeekIndex]) {
                eventsVMByDate[eventWeekIndex] = [event]
                return
            }

            if (eventsVMByDate[eventWeekIndex]) {
                eventsVMByDate[eventWeekIndex] = [...eventsVMByDate[eventWeekIndex], event]
                return
            }
        })
        return eventsVMByDate
    })

const prepareEvent = (event: CalendarEvent) => ({
    ...event,
    startDate: new Date(event.startDate).toDateString(),
    endDate: new Date(event.endDate).toDateString(),
    traces: [...event.traces].sort((a, b) => {
        const colorA = a.traceColor || 'notDefined'
        const colorB = b.traceColor || 'notDefined'
        if (traceLevelColor[colorA] < traceLevelColor[colorB]) return -1
        if (traceLevelColor[colorA] > traceLevelColor[colorB]) return 1
        return 0
    }),
})

export const eventsErrorsVM = () => (state: AppState) => {
    return state.eventsState.error
}

export const eventsLoadingVM = () => (state: AppState) => {
    return state.eventsState.loading
}
