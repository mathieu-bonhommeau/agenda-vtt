import { CalendarEvent } from '../../business/models/calendar.event'

export const toCalendarEventFromResponseBodyDto = (bodyItem: unknown): CalendarEvent => ({
    id: bodyItem['id'],
    title: bodyItem['title'],
    description: bodyItem['description'],
    eventLocation: bodyItem['eventLocation'],
    traces: bodyItem['traces'],
    prices: bodyItem['prices'],
    services: bodyItem['services'],
    organizer: bodyItem['organizer'],
    createdAt: new Date(bodyItem['createdAt']),
    startDate: new Date(bodyItem['startDate']),
    endDate: new Date(bodyItem['endDate']),
})
