import { AppDispatch } from '@/app/_common/business/store/store'
import { newEventSlice } from '@/app/calendar-events/business/reducers/new-event-reducer'
import { saveNewEvent } from '@/app/calendar-events/business/use-case/add-event/save-new.event'
import { retrieveEvents } from '@/app/calendar-events/business/use-case/retrieve-events/retrieve-events'
import { ModalEventFacilities } from '@/app/calendar-events/client/react/components/modal-event/modal-event-facilities'
import { ModalEventMap } from '@/app/calendar-events/client/react/components/modal-event/modal-event-map'
import { ModalEventOrganizer } from '@/app/calendar-events/client/react/components/modal-event/modal-event-organizer'
import { ModalEventPrices } from '@/app/calendar-events/client/react/components/modal-event/modal-event-prices'
import { ModalEventTitle } from '@/app/calendar-events/client/react/components/modal-event/modal-event-title'
import { ModalEventTraces } from '@/app/calendar-events/client/react/components/modal-event/modal-event-traces'
import { NewEventStepButtons } from '@/app/calendar-events/client/react/components/modal-new-event/main-data-new-event-modal/main-data-new-event-modal'
import { NewEventStepsNavigation } from '@/app/calendar-events/client/react/components/modal-new-event/new-event-steps-navigation'
import { overviewCalendarEventFromNewEventDraft } from '@/app/calendar-events/client/view-models/new-event-view-model'
import { initialFiltersState } from '@/app/filters-events/business/reducers/filters-reducers'
import { Box, Divider } from '@mui/material'
import DOMPurify from 'dompurify'
import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

export function OverviewNewEventModal() {
    const dispatch = useDispatch<AppDispatch>()
    const eventOverview = useSelector(overviewCalendarEventFromNewEventDraft)
    const router = useRouter()

    const handleStep = (e: React.MouseEvent<HTMLElement>, step: NewEventStepButtons) => {
        if (step === 'NEXT') {
            dispatch(saveNewEvent()).then(() => router.push('/'))
            dispatch(retrieveEvents({ filters: initialFiltersState.filters }))
        }
        if (step === 'PREVIOUS') {
            dispatch(newEventSlice.actions.onDefineStepAsked('ADDITIONAL_DATA'))
        }
    }

    return (
        <Box display={'flex'} flexDirection={'column'} gap={2}>
            <Box my={2}>
                <ModalEventTitle
                    title={eventOverview.title}
                    eventLocation={eventOverview.eventLocation}
                    startDate={eventOverview.startDate}
                    endDate={eventOverview.endDate}
                />
                <Box height={'30vh'}>
                    <ModalEventMap eventLocation={eventOverview.eventLocation} event={eventOverview} />
                </Box>
                <Divider />

                <div
                    style={{ marginTop: 2, marginBottom: 2 }}
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(eventOverview.description || '') }}
                />
                <Divider />
                <ModalEventTraces eventLocation={eventOverview.eventLocation} traces={eventOverview.traces} />
                <Divider />
                <ModalEventPrices price={eventOverview.price} />
                <Divider />
                <ModalEventOrganizer organizer={eventOverview.organizer} />
                <Divider />
                <ModalEventFacilities services={eventOverview.services} />
                <Divider />
            </Box>
            <NewEventStepsNavigation handleStep={handleStep} isSubmitDraft={true} />
        </Box>
    )
}
