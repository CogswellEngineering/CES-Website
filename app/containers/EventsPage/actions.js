import {

    MONTH_PRESSED,
    EVENT_PRESSED,
    ATTEND_PRESSED,
    EVENTS_UPDATED,
    EVENT_CLOSED,

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

export {

    monthSelected,
    eventSelected,
    attendPressed,
    updateEvents,
    closeEvent,
}
