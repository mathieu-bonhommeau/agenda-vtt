import { Column, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { EventOrganizerEntity } from './event-organizer.entity'

export class ContactEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ name: 'name' })
    name: string

    @Column({ name: 'phone' })
    phone: string

    @ManyToMany(() => EventOrganizerEntity, (eventOrganizerEntity) => eventOrganizerEntity.contacts)
    organizer: EventOrganizerEntity[]
}