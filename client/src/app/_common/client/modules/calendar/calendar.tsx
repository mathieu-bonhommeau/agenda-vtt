import { eventsReactBigCalendarVM } from '@/app/calendar-events/client/view-models/retrieve-events-view-model'
import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import { useSelector } from 'react-redux'

export function AppCalendar() {
    const events = useSelector(eventsReactBigCalendarVM())
    const localizer = momentLocalizer(moment)

    return (
        <div className="myCustomHeight">
            <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" />
        </div>
    )
}
