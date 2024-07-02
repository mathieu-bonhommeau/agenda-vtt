import { Column, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ContactEntity } from './contact.entity'
import { CalendarEventEntity } from './calendar-event.entity'

export class EventOrganizerEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ name: 'name' })
    name: string

    @Column({ name: 'email' })
    email: string

    @Column({ name: 'website', nullable: true })
    website: string

    @OneToMany(() => CalendarEventEntity, (calendarEvents) => calendarEvents.organizer)
    calendarEvents: CalendarEventEntity[]

    @ManyToMany(() => ContactEntity, (contactEntity) => contactEntity.organizer)
    contacts: ContactEntity[]
}
