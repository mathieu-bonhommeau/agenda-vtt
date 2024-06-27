import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class CalendarEventEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ name: 'title' })
    title: string

    @Column({ name: 'description' })
    description: string
}
