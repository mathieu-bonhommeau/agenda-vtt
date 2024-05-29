import { AppState } from '@/app/_common/business/store/appState'
import { CalendarEvent } from '@/app/calendar-events/business/models/event'
import { traceLevelColor } from '@/app/traces/business/models/trace'
import { createSelector } from 'reselect'

export type CalendarEventVM = CalendarEvent
export type CalendarEventsVM = CalendarEventVM[]

// TODO Probably move the sort in backend !'

const selectEvents = (state: AppState): CalendarEventsVM => state.eventsState.events
export const eventsVM = () =>
    createSelector([selectEvents], (events): CalendarEventsVM => {
        return events.map((event) => prepareEvent(event))
    })

export type DepartmentNumber = string | 'not-defined'
export type CalendarEventsSortedByDepartment = { [departmentNumber: DepartmentNumber]: CalendarEventsVM }

export const eventsVMByDepartment = () =>
    createSelector([selectEvents], (events): CalendarEventsSortedByDepartment => {
        const eventsVMByDepartment: CalendarEventsSortedByDepartment = { ['not-defined']: [] }
        const preparedEvents = events.map((event) => prepareEvent(event))

        preparedEvents.forEach((event: CalendarEventVM) => {
            if (!event.eventLocation.postcode) {
                eventsVMByDepartment['not-defined'].push(event)
                return
            }

            if (!Object.hasOwn(eventsVMByDepartment, event.eventLocation.postcode!.slice(0, 2))) {
                eventsVMByDepartment[event.eventLocation.postcode!.slice(0, 2)] = [event]
                return
            }

            if (Object.hasOwn(eventsVMByDepartment, event.eventLocation.postcode!.slice(0, 2))) {
                eventsVMByDepartment[event.eventLocation.postcode!.slice(0, 2)] = [
                    ...eventsVMByDepartment[event.eventLocation.postcode!.slice(0, 2)],
                    event,
                ]
            }
        })

        return eventsVMByDepartment
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
