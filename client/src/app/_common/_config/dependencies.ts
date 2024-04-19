import { Dependencies } from '@/app/_common/business/store/store'
import { CalendarEventBuilder } from '@/app/calendar-event/business/use-case/__test__/calendar-event-builder'
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

const buildInMemoryDependencies = (): Dependencies => {
    const event1 = new CalendarEventBuilder().setId('randomId1').setTitle('Event1').build()
    const event2 = new CalendarEventBuilder().setId('randomId2').setTitle('Event2').build()

    const eventsGateway = new InMemoryEventsGateway()
    eventsGateway.events = [event1, event2]

    return {
        eventsGateway,
    }
}
