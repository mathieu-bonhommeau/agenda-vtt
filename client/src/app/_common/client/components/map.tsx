import { AppDispatch } from '@/app/_common/business/store/store'
import { retrieveEvents } from '@/app/calendar-event/business/use-case/retrieve-events'
import { retrieveEventsVM } from '@/app/calendar-event/client/view-model/retrieve-events-view-model'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export function Map() {
    const dispatch = useDispatch<AppDispatch>()
    const events = useSelector(retrieveEventsVM())

    console.log(events)

    useEffect(() => {
        dispatch(retrieveEvents())
    }, [dispatch])

    return <h2>Map</h2>
}
