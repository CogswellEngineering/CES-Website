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
    const eventSnapshot = yield eventRef.get();

    //Basically if it fails.
    if (!eventSnapshot.exists){

        yield put(loadedEvent(null));
    }
    else{

        yield put (loadedEvent(eventSnapshot.data()));
    }
}

function* trackEventSaga(payload){

    const {userUid, eventUid} = payload;



}

function* untrackEventSaga(payload){

    const {userUid, eventUid} = payload;
}

//Instead of event title, should really be eventUid, honestly.
//Better that way. ToDo: update events page to also do this.
function* attendEventSaga(payload){

    //Honestly should just send useruid then too lmao.
    const {userUid, eventUid} = payload;

    const attendanceRef = firebase.firestore().collection("ClubInfo").doc("Events").collection("Attendees").doc();

    var succeeded = true;
    yield attendanceRef.set({

        attendee: userUid,
        event: eventUid,
    })
    .catch (err => {

        succeeded = false;
        //Todo: Add error message along with this, just alot of migrating over tbh.
        console.log("error happened failed to mark as attendee");
    });

    yield put(updateAttendance(succeeded));

}

function* cancelAttendanceSaga(payload){

    const {userUid, eventUid} = payload;

    const attendanceRef = firebase.firestore().collection("ClubInfo").doc("Events").collection("Attendees");

    //Then I want to do where attendee equal to user uid and eventUid equal event
    //Using event uid I don't need start date and title to be primary keys anymore, idk what i was thinking before.
    //Oh cause the events on calendar were the FULL events not previews.
    const query = attendanceRef.where("attendee", "==", userUid).where("event","==",eventUid);

    const querySnapshot = yield query.get();

    if (!querySnapshot.empty){

        //There should only ever be one, could do for each loop to see if ever case there is multiple of same primary keys
        //then log error, but my design should make it impossible.
        const docRef = querySnapshot.docs[0];
        
        //Its not a doc, so many not have delete method.
        yield docRef.ref.delete()
            .catch(err => {

                console.log("Failed to delete:", err);
            });
    }
    //Actually for this no matter what it's false because if didn't find then  attendee didn't exist
    //but could be null to inform user if in right account. But that shouldn't even display so they can't cancel if not attending.
    //In other words, impossible to return anything but false, no matter what, ideally.
    
    yield put(updateAttendance(false));
    
}


function* saga(){

    yield takeLatest(LOAD_EVENT, loadEventSaga);
    yield takeLatest(TRACK_EVENT, trackEventSaga);
    yield takeLatest(UNTRACK_EVENT, untrackEventSaga);
    yield takeLatest(ATTEND_EVENT, attendEventSaga);
    yield takeLatest(CANCEL_ATTENDANCE, cancelAttendanceSaga);
}