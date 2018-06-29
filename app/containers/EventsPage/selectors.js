import { createSelector } from 'reselect';
import { EVENTS_PATH } from 'components/Header/pages';

//It was selector problem, typoed the constant. Good I learned how to isolate problem but yeah.
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

        //So this never gets triggered again.
        console.log("Event state", eventState);

        if (eventState == null) {
            //This only happens once so it doesn't even reselect?
            console.log("I keep happening");
            return [];
        }

        //This is literally repeating, but just incase will do more stuff, I guess.
        //Okay wait, if this happens with correct list printed, then it should re-render.
        console.log("From selector",eventState.get("events"));

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