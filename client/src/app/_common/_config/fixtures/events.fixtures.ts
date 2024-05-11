import {
    CalendarEventBuilder,
    EventLocationBuilder,
} from '@/app/calendar-event/business/use-case/retrieve-events/__test__/calendar-event-builder'

const event1 = new CalendarEventBuilder()
    .setId('2a587e71-3fdf-4778-8b2e-c08a62832181')
    .setTitle('Event1')
    .setStartDate(new Date('2024-08-25').toDateString())
    .setEndDate(new Date('2024-08-28').toDateString())
    .setEventLocation(
        new EventLocationBuilder().setLatLon({ lon: 43.84104254256443, lat: -0.9025669059047033 }).build(),
    )
    .build()
const event2 = new CalendarEventBuilder()
    .setId('2a587e71-3fdf-4778-8b2e-c08a62832182')
    .setTitle('Event2')
    .setStartDate(new Date('2024-06-14').toDateString())
    .setEndDate(new Date('2024-06-14').toDateString())
    .setEventLocation(new EventLocationBuilder().setLatLon({ lon: 44.016408032038136, lat: 2.7471504416587 }).build())
    .build()

const event3 = new CalendarEventBuilder()
    .setId('2a587e71-3fdf-4778-8b2e-c08a62832183')
    .setTitle('Event3')
    .setStartDate(new Date('2024-07-03').toDateString())
    .setEndDate(new Date('2024-07-04').toDateString())
    .setEventLocation(new EventLocationBuilder().setLatLon({ lon: 44.52167567977396, lat: 1.278700628059972 }).build())
    .build()

const event4 = new CalendarEventBuilder()
    .setId('2a587e71-3fdf-4778-8b2e-c08a62832184')
    .setTitle('Event4')
    .setStartDate(new Date('2024-11-17').toDateString())
    .setEndDate(new Date('2024-11-17').toDateString())
    .setEventLocation(new EventLocationBuilder().setLatLon({ lon: 48.38872425569981, lat: 6.717864620226212 }).build())
    .build()

const event5 = new CalendarEventBuilder()
    .setId('2a587e71-3fdf-4778-8b2e-c08a62832185')
    .setTitle('Event5')
    .setStartDate(new Date('2024-09-10').toDateString())
    .setEndDate(new Date('2024-09-12').toDateString())
    .setEventLocation(
        new EventLocationBuilder().setLatLon({ lon: 47.93949675153852, lat: -0.09805089153013741 }).build(),
    )
    .build()

export const eventsFixtures = [event1, event2, event3, event4, event5]
