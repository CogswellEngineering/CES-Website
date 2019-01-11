import { createSelector } from 'reselect';
import { EVENTS_PATH } from 'components/Header/pages';

const eventState = (state) => {
   
        return state.get(EVENTS_PATH);
}



const createSelectFilter = () => createSelector(

    eventState,
    (eventState) => {

        if (eventState == null) return [];

        return eventState.get("filter");
    }


)


const createSelectEvents = () => createSelector(

    eventState,
    (eventState) => {

        if (eventState == null) {

            console.log("I keep happening");
            return [];
        }

       
        //This will get the filter.
        const filter = eventState.get("filter");
        if (filter.size == 0){


            return eventState.get("events");
        }
        else{

            const events = eventState.get("events");
            console.log("events in selector", events);

            //Does it have closure on filter? Hopefully, we'll see.
            const filteredEvents = events.filter( event => filter.contains(event.type));

            return filteredEvents;

        }
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


export {

    createSelectEvents,
    createSelectEvent,
    createSelectMonth,
    createSelectFlag,
    createSelectFilter,
};