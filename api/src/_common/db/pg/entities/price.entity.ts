import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { CalendarEventEntity } from './calendar-event.entity'

@Entity()
export class PriceEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ name: 'price' })
    price: string

    @ManyToOne(() => CalendarEventEntity, (calendarEvent) => calendarEvent.prices)
    @JoinColumn({ name: 'calendar_event_id' })
    calendarEvent: CalendarEventEntity
}
