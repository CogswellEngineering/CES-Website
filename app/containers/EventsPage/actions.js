import {

    EVENT_PRESSED,
    EVENTS_UPDATED,
    EVENT_CLOSED,
    EVENT_LOADING,
    FILTER_CHANGED,
    VERIFIED_ATTENDING,

} from './constants';


function filterChanged(newFilter){

    //It's not full array that's passed in action, unless I store one locally equal to previous and remove everytime they checkbox.
    //Only problem with that is changing state. I could make it 
    return {
        type:FILTER_CHANGED,
        newFilter,
    };
}

function updateEvents(events){

    return {
        type: EVENTS_UPDATED,
        events,
    };
}


function eventSelected(eventCard){

    return {
        type: EVENT_PRESSED,
        eventCard,
    };
}

function loadingEvent(){
    
    return {
        type: EVENT_LOADING,
    };
}

function closeEvent(){

    return {
        type: EVENT_CLOSED,
    };
}

function verifiedAttending(isAttending, eventCard){

    return {
        type: VERIFIED_ATTENDING,
        isAttending,
        eventCard,

    };
}

export {

    eventSelected,
    updateEvents,
    closeEvent,
    loadingEvent,
    verifiedAttending,
    filterChanged,
    
}
