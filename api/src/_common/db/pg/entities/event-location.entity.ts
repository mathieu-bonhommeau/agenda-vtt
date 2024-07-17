import { Column, Entity, OneToMany, Point, PrimaryGeneratedColumn } from 'typeorm'
import { CalendarEventEntity } from './calendar-event.entity'

@Entity()
export class EventLocationEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ name: 'country' })
    country: string

    @Column({ name: 'region', nullable: true })
    region: string

    @Column({ name: 'county', nullable: true })
    county: string

    @Column({ name: 'postcode', nullable: true })
    postcode: string

    @Column({ name: 'housenumber', nullable: true })
    housenumber: string

    @Column({ name: 'city' })
    city: string

    @Column({ name: 'address' })
    address: string

    @Column({
        type: 'geometry',
        srid: 3857,
    })
    geometry: Point

    @OneToMany(() => CalendarEventEntity, (calendarEvent) => calendarEvent.eventLocation)
    calendarEvents?: CalendarEventEntity[]
}
