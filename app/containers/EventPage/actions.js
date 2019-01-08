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

        type:LOAD_EVENT,
        eventUid,
    };
}

function loadedEvent(event){

    return {

        type:LOADED_EVENT,
        event,
    };
}

function attendEvent(userUid, event){

    return {
        type:ATTEND_EVENT,
        userUid,
        eventUid
    };
}

function updateAttendance(isAttending){

    return {
        type:ATTENDANCE_UPDATED,
        isAttending,
    };
}

function cancelAttendance(userUid, event){

    return {
        type: CANCEL_ATTENDANCE,
        userUid,
        eventUid,
    };
}

function trackEvent(userUid, eventUid){

    //Only need this cause rtacking all news posts with eventUid as tag.
    return {
        type: TRACK_EVENT,
        userUid,
        eventUid,
    };
}


function updateTracking(isTracking){

    return {
        type:EVENT_TRACKING_UPDATED,
        isTracking,
    };
}

function untrackEvent(userUid, eventUid){

    return {

        type:UNTRACK_EVENT,
        userUid,
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