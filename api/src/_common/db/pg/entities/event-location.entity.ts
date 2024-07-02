import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { CalendarEventEntity } from './calendar-event.entity'
import { ContactEntity } from './contact.entity'

@Entity()
export class EventLocationEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ name: 'country' })
    country: string

    @Column({ name: 'description', nullable: true })
    region: string

    @Column({ name: 'county', nullable: true })
    county: string

    @Column({ name: 'postcode', nullable: true })
    postcode: string

    @Column({ name: 'city' })
    city: string

    @Column({ name: 'address' })
    address: string

    @Column({
        type: 'geometry',
        srid: 3857,
    })
    geometry: string

    @OneToMany(() => CalendarEventEntity, (calendarEvent) => calendarEvent.eventLocation)
    calendarEvents: CalendarEventEntity[]
}
