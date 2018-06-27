import {

    MONTH_PRESSED,
    EVENT_PRESSED,
    ATTEND_PRESSED,
    EVENTS_UPDATED,
    EVENT_CLOSED,
    EVENT_LOADING,
    ATTENDING,
    ATTEND_SUCCESS,
    ATTEND_FAILED,
    ATTEND_CANCEL,
    VERIFIED_ATTENDING,

} from './constants';

function updateEvents(events){

    return {
        type: EVENTS_UPDATED,
        events,
    };
}

function monthSelected(month){

    return {
        type:MONTH_PRESSED,
        month,
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

function attending(){
    
    return {
        type: ATTENDING,
    };
}

function successfullyAttending(){

    return {
        type: ATTEND_SUCCESS,
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

    monthSelected,
    eventSelected,
    attendPressed,
    attending,
    attendFailed,
    cancelAttendance,
    successfullyAttending,
    updateEvents,
    closeEvent,
    loadingEvent,
    verifiedAttending,
    
}
