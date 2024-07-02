import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { EventLocationEntity } from './event-location.entity'
import { TraceEntity } from './trace.entity'
import { PriceEntity } from './price.entity'
import { EventOrganizer } from '../../../../calendar-event/business/models/calendar.event'
import { EventOrganizerEntity } from './event-organizer.entity'

@Entity()
export class CalendarEventEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ name: 'title' })
    title: string

    @Column({ name: 'description' })
    description: string

    @Column({ name: 'created_at' })
    createdAt: Date

    @Column({ name: 'start_date' })
    startDate: Date

    @Column({ name: 'end_date' })
    endAt: Date

    @ManyToOne(() => EventLocationEntity, (eventLocation) => eventLocation.calendarEvents)
    @JoinColumn({ name: 'event_location_id' })
    eventLocation: EventLocationEntity

    @OneToMany(() => TraceEntity, (trace) => trace.calendarEvent)
    traces: TraceEntity[]

    @OneToMany(() => PriceEntity, (price) => price.calendarEvent)
    prices: PriceEntity[]

    @Column({
        type: 'json',
        name: 'services',
        nullable: true,
        transformer: {
            to(value: string[]): string {
                return JSON.stringify(value)
            },
            from(value: string): string[] {
                return JSON.parse(value)
            },
        },
    })
    services: string[]

    @ManyToOne(() => EventOrganizerEntity, (eventOrganizer) => eventOrganizer.calendarEvents)
    @JoinColumn({ name: 'organizer_id' })
    organizer: EventOrganizer
}
