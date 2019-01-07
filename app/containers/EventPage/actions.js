import {

    LOAD_EVENT,
    LOADED_EVENT,
    ATTEND_EVENT,
    ATTENDANCE_UPDATED,
    CANCEL_ATTENDANCE,
    TRACK_EVENT,
    EVENT_TRACKING_UPDATED,
    UNTRACK_EVENT
} from './constants';

function loadEvent(eventUid){

    return {

        LOAD_EVENT,
        eventUid,
    };
}

function loadedEvent(event){

    return {

        LOADED_EVENT,
        event,
    };
}

function attendEvent(user, event){

    return {
        ATTEND_EVENT,
        user,
        event
    };
}

function updateAttendance(isAttending){

    return {
        ATTENDANCE_UPDATED,
        isAttending,
    };
}

function cancelAttendance(user, event){

    return {

        user,
        event,
    };
}

function trackEvent(user, eventUid){

    //Only need this cause rtacking all news posts with eventUid as tag.
    return {

        user,
        eventUid,
    };
}


function updateTracking(isTracking){

    return {
        isTracking,
    };
}

function untrackEvent(user, eventUid){

    return {

        user,
        eventUid,
    };
}

export{

    loadEvent,
    loadedEvent,
    attendEvent,
    updateAttendance,
    cancelAttendance,
    trackEvent,
    updateTracking,
    untrackEvent,
};