import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { EventLocationEntity } from './event-location.entity'
import { TraceEntity } from './trace.entity'
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
    endDate: Date

    @ManyToOne(() => EventLocationEntity, (eventLocation) => eventLocation.calendarEvents, { nullable: true })
    @JoinColumn({ name: 'event_location_id' })
    eventLocation?: EventLocationEntity

    @OneToMany(() => TraceEntity, (trace) => trace.calendarEvent)
    traces?: TraceEntity[]

    @Column({
        type: 'json',
        name: 'prices',
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
    prices?: string[]

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
    services?: string[]

    @ManyToOne(() => EventOrganizerEntity, (eventOrganizer) => eventOrganizer.calendarEvents, { nullable: true })
    @JoinColumn({ name: 'organizer_id' })
    organizer?: EventOrganizerEntity
}
