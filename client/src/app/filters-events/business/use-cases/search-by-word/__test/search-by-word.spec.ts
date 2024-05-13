import { CalendarEvent } from '@/app/calendar-event/business/models/event'
import { CalendarEventBuilder } from '@/app/calendar-event/business/use-case/retrieve-events/__test__/calendar-event-builder'

describe('Search event by word', () => {
    let sut: SUT
    let events: CalendarEvent[]

    beforeEach(async () => {
        sut = new SUT()
        events = events = [
            sut.buildEvent({
                id: 'b37d37e5-2691-4378-8066-6b8415f60d41',
                title: 'Valsloppet VTT',
            }),
            sut.buildEvent({
                id: 'b37d37e5-2691-4378-8066-6b8415f60d42',
                title: 'Enduro du Vercors',
            }),
            sut.buildEvent({
                id: 'b37d37e5-2691-4378-8066-6b8415f60d43',
                title: 'Les Crapauds 24 heures VTT',
            }),
            sut.buildEvent({
                id: 'b37d37e5-2691-4378-8066-6b8415f60d44',
                title: 'Vertaco bike',
            }),
            sut.buildEvent({
                id: 'b37d37e5-2691-4378-8066-6b8415f60d45',
                title: 'Oeno-balade en Beaujolais',
            }),
        ]
    })
})

class SUT {
    buildEvent({ id, startDate, endDate }: { id: string; startDate: string; endDate: string }) {
        return new CalendarEventBuilder().setId(id).setStartDate(startDate).setEndDate(endDate).build()
    }
}
