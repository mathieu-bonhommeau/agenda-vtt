import { UnknownAction } from '@reduxjs/toolkit'

export enum Actions {
    EVENTS_RETRIEVED,
}

export type ActionHandler<S> = (action: UnknownAction, state: S) => S
export type ActionHandlers<S> = { [action: string]: ActionHandler<S> }
