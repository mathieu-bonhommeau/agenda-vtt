import { Dependencies } from '@/app/_common/business/store/store'
import {
    CalendarEventBuilder,
    EventLocationBuilder,
} from '@/app/calendar-event/business/use-case/__test__/calendar-event-builder'
import { HttpEventsGateway } from '@/app/calendar-event/infrastructure/http-events.gateway'
import { InMemoryEventsGateway } from '@/app/calendar-event/infrastructure/in-memory-events.gateway'

export const buildDependencies = (): Dependencies => {
    switch (process.env['REACT_APP']) {
        case 'prod':
            return buildRealDependencies()
        default:
            return buildInMemoryDependencies()
    }
}

const buildRealDependencies = (): Dependencies => {
    const apiBaseUrl = process.env['REACT_APP_BACKEND_URL'] ?? ''

    return {
        eventsGateway: new HttpEventsGateway(apiBaseUrl),
    }
}

// TODO move each dependencies in each domain folder
const buildInMemoryDependencies = (): Dependencies => {
    const event1 = new CalendarEventBuilder()
        .setId('randomId1')
        .setTitle('Event1')
        .setEventLocation(
            new EventLocationBuilder().setLatLon({ lon: 43.84104254256443, lat: -0.9025669059047033 }).build(),
        )
        .build()
    const event2 = new CalendarEventBuilder()
        .setId('randomId2')
        .setTitle('Event2')
        .setEventLocation(
            new EventLocationBuilder().setLatLon({ lon: 44.016408032038136, lat: 2.7471504416587 }).build(),
        )
        .build()

    const event3 = new CalendarEventBuilder()
        .setId('randomId3')
        .setTitle('Event3')
        .setEventLocation(
            new EventLocationBuilder().setLatLon({ lon: 44.52167567977396, lat: 1.278700628059972 }).build(),
        )
        .build()

    const eventsGateway = new InMemoryEventsGateway()
    eventsGateway.events = [event1, event2, event3]

    return {
        eventsGateway,
    }
}
