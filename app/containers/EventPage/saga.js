import {call, put, takeLatest} from 'redux-saga/effects';
import firebase from 'firebase';
import {

    LOAD_EVENT,
    TRACK_EVENT,
    UNTRACK_EVENT,
    ATTEND_EVENT,
    CANCEL_ATTENDANCE,

} from './constants';


function* loadEventSaga(payload){


    const {eventUid} = payload;

}

function* trackEventSaga(payload){

    const {user, eventUid} = payload;

}

function* untrackEventSaga(payload){

    const {user, eventUid} = payload;
}

//Instead of event title, should really be eventUid, honestly.
//Better that way. ToDo: update events page to also do this.
function* attendEventSaga(payload){

    const {user, eventUid} = payload;
}

function* cancelAttendanceSaga(payload){

    const {user, eventUid} = payload;

}


function* saga(){

    yield takeLatest(LOAD_EVENT, loadEventSaga);
    yield takeLatest(TRACK_EVENT, trackEventSaga);
    yield takeLatest(UNTRACK_EVENT, untrackEventSaga);
    yield takeLatest(ATTEND_EVENT, attendEventSaga);
    yield takeLatest(CANCEL_ATTENDANCE, cancelAttendanceSaga);
}