import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { CalendarEventEntity } from './calendar-event.entity'
import { Contact } from '../../../../calendar-event/business/models/calendar.event'

@Entity()
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
    calendarEvents?: CalendarEventEntity[]

    @Column({
        type: 'json',
        name: 'contacts',
        nullable: true,
        transformer: {
            to(value: Contact[]): string {
                return JSON.stringify(value)
            },
            from(value: string): Contact[] {
                return JSON.parse(value)
            },
        },
    })
    contacts: Contact[]
}
