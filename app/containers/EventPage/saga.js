import {call, put, takeLatest} from 'redux-saga/effects';
import firebase from 'firebase';
import {

    LOAD_EVENT,
    TRACK_EVENT,
    UNTRACK_EVENT,
    ATTEND_EVENT,
    CANCEL_ATTENDANCE,

} from './constants';

import {

    loadedEvent,
    updateAttendance,
    updateTracking,
} from './actions';


function* loadEventSaga(payload){

    const {eventUid} = payload;

    //Gets ref of event from database.
    //Contemplating storing alot of these in constants somewhere to avoid literals as much as possible.
    //But that's polish, and ALOT of replacing later though...
    const eventRef = firebase.firestore().collection("ClubInfo").doc("Events").collection("EventList").doc(eventUid);

    //yield for get promise to fulfill or fail
    const eventSnapshot = yield (eventRef.get());

    //Basically if it fails.
    if (!eventSnapshot.exists){

        yield put(loadedEvent(null));
    }
    else{

        yield put (loadedEvent(eventSnapshot.data()));
    }
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