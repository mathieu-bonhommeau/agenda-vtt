import { eventsFixtures } from '@/app/_common/_config/fixtures/events.fixtures'
import { Dependencies } from '@/app/_common/business/store/store'
import { HttpEventCreationRepository } from '@/app/calendar-events/infrastructure/http-event-creation.repository'
import { HttpEventsGateway } from '@/app/calendar-events/infrastructure/http-events.gateway'
import { InMemoryEventCreationRepository } from '@/app/calendar-events/infrastructure/in-memory-event-creation.repository'
import { InMemoryEventsGateway } from '@/app/calendar-events/infrastructure/in-memory-events.gateway'
import { PhotonLocationsGateway } from '@/app/geolocation/infrastructure/photon-locations-gateway'
import { UgatawaTracesApiGateway } from '@/app/traces/infrastructure/ugatawa-traces-api-gateway'
import { v4 } from 'uuid'

export const buildDependencies = (): Dependencies => {
    switch (process.env['NEXT_PUBLIC_REACT_APP'] || '') {
        case 'prod':
            return buildRealDependencies()
        default:
            return buildInMemoryDependencies()
    }
}

const buildRealDependencies = (): Dependencies => {
    const apiBaseUrl = process.env['REACT_APP_BACKEND_URL'] ?? ''

    return {
        generatorId: () => v4(),
        eventsGateway: new HttpEventsGateway(apiBaseUrl),
        locationsGateway: new PhotonLocationsGateway(),
        tracesApiGateway: new UgatawaTracesApiGateway(),
        eventCreationRepository: new HttpEventCreationRepository(),
    }
}

// TODO move each dependencies in each domain folder
const buildInMemoryDependencies = (): Dependencies => {
    const eventCreationRepository = new InMemoryEventCreationRepository(() => new Date())
    const eventsGateway = new InMemoryEventsGateway(eventCreationRepository)
    const placesGateway = new PhotonLocationsGateway()
    const tracesGateway = new UgatawaTracesApiGateway()
    eventsGateway.events = eventsFixtures

    return {
        generatorId: () => v4(),
        eventsGateway,
        locationsGateway: placesGateway,
        tracesApiGateway: tracesGateway,
        eventCreationRepository,
    }
}
