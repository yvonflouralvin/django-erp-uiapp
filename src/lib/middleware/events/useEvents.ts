
import { useEffect } from 'react';
import eventsReducer from './eventsReducer';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { Event } from '@/lib/shared/types';

const {
    addEventInPipe,
    dropEvent
} = eventsReducer.actions;

export default function useEvents(arg?: {
    listenIds?: string[],
    onEvent?: (eventId: string, payload: any) => void
}) {

    const appDispatch = useAppDispatch();
    const {
        events
    } = useAppSelector(state => state.eventReducer);

    const dispatch = (eventId: string, payload: {}) => {
        appDispatch(addEventInPipe({
            eventId,
            payload
        }))
    }

    useEffect(() => {
        if (arg !== undefined)
            events.map((event: Event) => {
                arg?.listenIds?.map(id => {
                    if (event.eventId == id) {
                        if (arg.onEvent !== undefined)
                            arg?.onEvent(id, event.payload);

                        setTimeout(() => {
                            appDispatch(dropEvent(event.uuid));
                        }, 1000)
                    }
                })
            })
    }, [events]);


    return {
        dispatch
    }
}