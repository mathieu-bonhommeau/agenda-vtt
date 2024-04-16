import moment from 'moment'
import { Calendar, momentLocalizer } from 'react-big-calendar'

const events = [
    /* {
      id: 0,
      title: 'All Day Event very long title',
      allDay: true,
      start: new Date(2015, 3, 0),
      end: new Date(2015, 3, 1),
    }, */
    {
        id: 1,
        title: 'Long Event',
        start: new Date(2024, 3, 8),
        end: new Date(2024, 3, 10),
    },

    {
        id: 2,
        title: 'DTS STARTS',
        start: new Date(2024, 2, 13, 0, 0, 0),
        end: new Date(2024, 2, 20, 0, 0, 0),
    },
    {
        id: 3,
        title: 'DTS STARTS',
        start: new Date(2025, 2, 13, 0, 0, 0),
        end: new Date(2025, 2, 20, 0, 0, 0),
    },
]

export function AppCalendar() {
    const localizer = momentLocalizer(moment)

    return (
        <div className="myCustomHeight">
            <Calendar localizer={localizer} events={events} startAccessor="start" endAccessor="end" />
        </div>
    )
}
