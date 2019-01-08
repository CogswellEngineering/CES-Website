import {put, takeLatest} from 'redux-saga/effects';
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

const firestore = firebase.firestore();




function* loadEventSaga(payload){

    const {eventUid} = payload;

    //Gets ref of event from database.
    //Contemplating storing alot of these in constants somewhere to avoid literals as much as possible.
    //But that's polish, and ALOT of replacing later though...
    const eventRef = firestore.collection("ClubInfo").doc("Events").collection("EventList").doc(eventUid);

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

    const {user, eventUid} = payload;
    const {userUid, email} = user;
    //Tracking an event is essentialy saying that this user is watching eventUid, so when anything is uploaded tagged with
    //the event, then that user notified.

    //So what I could do is have tags in firestore which will be generated as list to choose from when
    //posting new news post. Then right now tags already have type and title, so type could be event, then those have
    //an added property called trackers or watchers which will be array of userUids that are following the event.
    //as well as eventUid itself to act as primary key. This will be added to tags after an event has been created.
    //Yeahhhh that should work boyyy.

    const tagsRef = firestore.collection("Tags")
    const query = tagsRef.where("type","==","event").where("eventUid", "==",eventUid);

    const querySnapshot = yield query.get();

    //Again same logic, it should never happen that it doesn't exist.
    //And there should only be one.
    const queryDocSnapshot = querySnapshot.docs[0];

    //Later may need to go from ref to data to doc to get actual reference
    //just incase gone because ref no longer in documentation.
    //First place to look if fails when testing this.
    //Collection is better search optimization wise, but it is essentially a doc with no data lol.
    //Maybe email?? If that's cause do actually need to pass user object nost just uid.
    //Actually If i do that, won't have to get user at each tracker for the notification implementation
    //which is a huge optimiztion to reduce calls to database, fuck yeah, okay foresight at it's best.
    const newTrackerRef = queryDocSnapshot.ref.collection("Trackers").doc(userUid);
    newTrackerRef.set({

        email
    });

    yield put (updateTracking(true));

    //Hmm maybe collection of trackers instead of array, the reason I say this is both to reduce call to data twice
    //also how inefficient would tracking be? Would have to loop until find matching useruid
    //query do same, but they optimimize it with concurrency, I do not, better choice in this case is collection.
    /*const data = queryDocSnapshot.data();

  
   // const trackers = data.trackers.concat(userUid);

    yield queryDocSnapshot.ref().update({
        trackers:trackers,
    });
    */



    

}

function* untrackEventSaga(payload){

    const {userUid, eventUid} = payload;

    //Hindsight I really should just create firestore variable outside to reduce the deferencing
    //overhead.

    const tagsRef = firestore.collection("Tags")
    const query = eventTagsRef.where("type","==","event").where("eventUid", "==",eventUid);

    const querySnapshot = yield query.get();

    //Again same logic, it should never happen that it doesn't exist.
    //And there should only be one.
    const queryDocSnapshot = querySnapshot.docs[0];

    const trackerDoc = queryDocSnapshot.ref.collection("Trackers").doc(userUid);

    yield trackerDoc.delete();

    yield put(updateTracking(false));

}

//Instead of event title, should really be eventUid, honestly.
//Better that way. ToDo: update events page to also do this.
function* attendEventSaga(payload){

    //Honestly should just send useruid then too lmao.
    const {userUid, eventUid} = payload;

    const attendanceRef = firestore.collection("ClubInfo").doc("Events").collection("Attendees").doc();

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

    const attendanceRef = firestore.collection("ClubInfo").doc("Events").collection("Attendees");

    //Then I want to do where attendee equal to user uid and eventUid equal event
    //Using event uid I don't need start date and title to be primary keys anymore, idk what i was thinking before.
    //Oh cause the events on calendar were the FULL events not previews.
    const query = attendanceRef.where("attendee", "==", userUid).where("event","==",eventUid);

    const querySnapshot = yield query.get();

    //This check not needed if everything working correctly. It'll actually hide what would be errors.
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