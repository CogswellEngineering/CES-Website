import {

    EVENT_PRESSED,
    ATTEND_PRESSED,
    EVENTS_UPDATED,
    EVENT_CLOSED,
    EVENT_LOADING,
    ATTEND_FAILED,
    ATTEND_CANCEL,
    VERIFIED_ATTENDING,
    FILTER_CHANGED,

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


function eventSelected(event){

    return {
        type: EVENT_PRESSED,
        event,
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

//Need reference to event to attend.
function attendPressed(event){

    return {

        type: ATTEND_PRESSED,
        event,
    };

}

function verifiedAttending(isAttending, event){

    return {
        type: VERIFIED_ATTENDING,
        isAttending,
        event,

    };
}


function attendFailed(error){

    return {
        type: ATTEND_FAILED,
        error,
    };
}

function cancelAttendance(event){
    
    return {
        type: ATTEND_CANCEL,
        event,
    };
}

export {

    eventSelected,
    attendPressed,
    attendFailed,
    cancelAttendance,
    updateEvents,
    closeEvent,
    loadingEvent,
    verifiedAttending,
    filterChanged,
    
}
