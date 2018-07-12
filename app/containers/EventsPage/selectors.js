import { createSelector } from 'reselect';
import { EVENTS_PATH } from 'components/Header/pages';

const eventState = (state) => {
   
        return state.get(EVENTS_PATH);
    }


const createSelectError = () => createSelector(

    eventState,
    (eventState) => {
        if (eventState == null) return "";

        return eventState.get("error");
    }
);

const createSelectEvents = () => createSelector(

    eventState,
    (eventState) => {

        if (eventState == null) {

            console.log("I keep happening");
            return [];
        }

       

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

const createSelectFlag = (flagName) => createSelector(


    eventState,
    (eventState) => {

        if (eventState == null) return false;

        return eventState.get(flagName);
    }
) 

const createSelectMonth = () => createSelector(

    eventState,
    (eventState) => {
        //Current month, if they haven't selected anything
        if (eventState == null) return new Date().getDate();

        return eventState.get("month");
    }
);

export {

    createSelectEvents,
    createSelectEvent,
    createSelectMonth,
    createSelectFlag,
    createSelectError,
};