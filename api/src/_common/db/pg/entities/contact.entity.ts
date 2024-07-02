import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { EventOrganizerEntity } from './event-organizer.entity'

@Entity()
export class ContactEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ name: 'name' })
    name: string

    @Column({ name: 'phone' })
    phone: string

    @ManyToMany(() => EventOrganizerEntity, (eventOrganizerEntity) => eventOrganizerEntity.contacts)
    @JoinTable({
        name: 'organizer_contact',
        joinColumn: {
            name: 'contact_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'organizer_id',
            referencedColumnName: 'id',
        },
    })
    organizer: EventOrganizerEntity[]
}
