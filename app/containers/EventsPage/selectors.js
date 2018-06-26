import { createSelector } from 'reselect';
import { EVENTS_PAGE_PATH } from 'components/Header/pages';


const eventState = (state) => state.get(EVENTS_PAGE_PATH);

const createSelectEvents = () => createSelector(

    eventState,
    (eventState) => {

        if (eventState == null) return [];

        //This is literally repeating, but just incase will do more stuff, I guess.
        return eventState.get("events");
    }
);

const createSelectEvent = () => createSelector(

    eventState,
    (eventState) => {
        
        if (eventState == null) return null;

        return eventState.get("clickedEvent");
    }
);

const createSelectMonth = () => createSelector(

    eventState,
    (eventState) => {
        //Current month, if they haven't selected anything
        if (eventState == null) return new Date().getMonth();

        return eventState.get("month");
    }
);

export {

    createSelectEvents,
    createSelectEvent,
    createSelectMonth,
};