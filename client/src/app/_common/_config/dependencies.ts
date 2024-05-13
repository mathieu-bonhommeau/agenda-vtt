import { eventsFixtures } from '@/app/_common/_config/fixtures/events.fixtures'
import { Dependencies } from '@/app/_common/business/store/store'
import { HttpEventsGateway } from '@/app/calendar-event/infrastructure/http-events.gateway'
import { InMemoryEventsGateway } from '@/app/calendar-event/infrastructure/in-memory-events.gateway'
import { PhotonPlacesGateway } from '@/app/filters-events/infrastructure/photon-places-gateway'

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
        placesGateway: new PhotonPlacesGateway(),
    }
}

// TODO move each dependencies in each domain folder
const buildInMemoryDependencies = (): Dependencies => {
    const eventsGateway = new InMemoryEventsGateway()
    const placesGateway = new PhotonPlacesGateway()
    eventsGateway.events = eventsFixtures

    return {
        eventsGateway,
        placesGateway,
    }
}
