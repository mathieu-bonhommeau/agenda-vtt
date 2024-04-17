import { AppError } from '@/app/_common/business/ports/app-error'

export const EVENTS_ERROR = 'EVENTS_ERROR'

export class EventsError implements AppError {
    public code = EVENTS_ERROR

    constructor(public readonly message: string) {}
}
