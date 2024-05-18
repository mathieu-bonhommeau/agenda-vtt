import {
    CalendarEventBuilder,
    EventLocationBuilder,
} from '@/app/calendar-events/business/use-case/retrieve-events/__test__/calendar-event-builder'

const event1 = new CalendarEventBuilder()
    .setId('2a587e71-3fdf-4778-8b2e-c08a62832181')
    .setTitle('Valsloppet VTT')
    .setStartDate(new Date('2024-08-25').toDateString())
    .setEndDate(new Date('2024-08-28').toDateString())
    .setEventLocation(
        new EventLocationBuilder()
            .setCity('Tartas')
            .setLatLon({ lat: 43.83205527398835, lon: -0.8093727373267132 })
            .build(),
    )
    .build()
const event2 = new CalendarEventBuilder()
    .setId('2a587e71-3fdf-4778-8b2e-c08a62832182')
    .setTitle('Enduro du Vercors')
    .setStartDate(new Date('2024-06-14').toDateString())
    .setEndDate(new Date('2024-06-14').toDateString())
    .setEventLocation(
        new EventLocationBuilder()
            .setCity('Albi')
            .setLatLon({ lat: 43.922621380148314, lon: 2.1485700393675473 })
            .build(),
    )
    .build()

const event3 = new CalendarEventBuilder()
    .setId('2a587e71-3fdf-4778-8b2e-c08a62832183')
    .setTitle('Les Crapauds 24 heures VTT')
    .setStartDate(new Date('2024-07-03').toDateString())
    .setEndDate(new Date('2024-07-04').toDateString())
    .setEventLocation(
        new EventLocationBuilder()
            .setCity('Cahors')
            .setLatLon({ lat: 44.447683200568534, lon: 1.4378868578584774 })
            .build(),
    )
    .build()

const event4 = new CalendarEventBuilder()
    .setId('2a587e71-3fdf-4778-8b2e-c08a62832184')
    .setTitle('ValsVertaco bike')
    .setStartDate(new Date('2024-11-17').toDateString())
    .setEndDate(new Date('2024-11-17').toDateString())
    .setEventLocation(
        new EventLocationBuilder()
            .setCity('Rambervillers')
            .setLatLon({ lat: 48.345867416163784, lon: 6.634133024680511 })
            .build(),
    )
    .build()

const event5 = new CalendarEventBuilder()
    .setId('2a587e71-3fdf-4778-8b2e-c08a62832185')
    .setTitle('Oeno-balade en Beaujolais')
    .setStartDate(new Date('2024-09-10').toDateString())
    .setEndDate(new Date('2024-09-12').toDateString())
    .setEventLocation(
        new EventLocationBuilder()
            .setCity('Le Mans')
            .setLatLon({ lat: 47.99607814018611, lon: 0.1961746266174072 })
            .build(),
    )
    .build()

export const eventsFixtures = [event1, event2, event3, event4, event5]
