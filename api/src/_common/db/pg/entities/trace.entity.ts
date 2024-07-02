import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { TraceColor } from '../../../../calendar-event/business/models/calendar.event'
import { CalendarEventEntity } from './calendar-event.entity'

@Entity()
export class TraceEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ name: 'utagawa_id', nullable: true })
    utagawaId: string

    @Column({ name: 'link', nullable: true })
    link: string

    @Column({ name: 'distance' })
    distance: number

    @Column({ name: 'positive_elevation', nullable: true })
    positiveElevation: number

    @Column({ name: 'trace_color', nullable: true })
    traceColor: TraceColor

    @ManyToOne(() => CalendarEventEntity, (calendarEvent) => calendarEvent.traces)
    calendarEvent: CalendarEventEntity
}
