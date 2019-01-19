import {put, takeLatest, takeEvery} from 'redux-saga/effects';
import firebase from 'firebase';
import {

    LOAD_EVENT,
    TRACK_EVENT,
    UNTRACK_EVENT,
    ATTEND_EVENT,
    ADD_VIEW,
    CANCEL_ATTENDANCE,

} from './constants';

import {

    loadedEvent,
    updateAttendance,
    trackEvent,
    updateTracking,
} from './actions';





function* loadEventSaga(payload){

    const {eventUid} = payload;

    const firestore = firebase.firestore();

    //Gets ref of event from database.
    //Contemplating storing alot of these in constants somewhere to avoid literals as much as possible.
    //But that's polish, and ALOT of replacing later though...
    const eventRef = firestore.collection("ClubInfo").doc("Events").collection("EventList").doc(eventUid);

    //yield for get promise to fulfill or fail
    const eventSnapshot = yield eventRef.get();

    //Basically if it fails, but this shouldn't ever happen unless server down.
    if (!eventSnapshot.exists){

        yield put(loadedEvent(null));
    }
    else{

        const event = eventSnapshot.data();
        event.startDate = event.startDate.toDate();
        event.endDate = event.endDate.toDate();


        const trackersRef = eventRef.collection("Trackers");

        const loggedInUser = firebase.auth().currentUser;
        if (loggedInUser != null){

            //Check if tracking.
            const trackRef = yield eventRef.collection("Trackers").doc(loggedInUser.uid).get();
            console.log("trackRef", trackRef);
            yield put (updateTracking(trackRef.exists));


            //Check if attending, hmm some delayyy.
            const attendeeQuery = firestore.collection("ClubInfo").doc("Events").collection("Attendees")
            .where("eventUid", "==", eventUid)
            .where("attendee", "==", loggedInUser.uid);

            const queryResult = yield attendeeQuery.get();
            console.log("query Result", queryResult);
            yield put (updateAttendance(!queryResult.empty));


        }

        //Loads event, so only show when information accurate.

        if (event.gallery.length > 0){

            event.gallery = [event.thumbnail].concat(event.gallery);
        }
        yield put (loadedEvent(event));


    }
}

function* trackEventSaga(payload){


    const {user, eventUid} = payload;
    const {uid, email} = user;
    //Tracking an event is essentialy saying that this user is watching eventUid, so when anything is uploaded tagged with
    //the event, then that user notified.

    //So what I could do is have tags in firestore which will be generated as list to choose from when
    //posting new news post. Then right now tags already have type and title, so type could be event, then those have
    //an added property called trackers or watchers which will be array of userUids that are following the event.
    //as well as eventUid itself to act as primary key. This will be added to tags after an event has been created.
    //Yeahhhh that should work boyyy.
    const firestore = firebase.firestore();

    const tagsRef = firestore.collection("Tags")
    const query = tagsRef.where("type","==","event").where("eventUid", "==",eventUid);

    const querySnapshot = yield query.get();

    //Again same logic, it should never happen that it doesn't exist.
    //And there should only be one.
    const queryDocSnapshot = querySnapshot.docs[0];

    
    //Trackers should be in event, because for checking if tracking would cause overhead
    //and delay on page loading
    //yeah it adds overhead in here, but this overhead does not interrupt user experienc unlike if I had another saga that did
    //the check and I'd have to wait for that and load event to finish before loading page
    //leaving user looking at incorrec page.
    //So then tags will have eventUid reference what the tag is referencing.
    //And this is fine overhead to load up event to email users about because
    //that's sending emails and notifications, a few seconds of delay for something that doesn't
    //interrupt their experience is not a problem.
    const newTrackerRef = firestore.collection("ClubInfo").doc("Events").collection("EventList").doc(eventUid).collection("Trackers").doc(uid);
    newTrackerRef.set({

        email
    });

    yield put (updateTracking(true));
}

function* untrackEventSaga(payload){

    const {userUid, eventUid} = payload;

    //Hindsight I really should just create firestore variable outside to reduce the deferencing
    //overhead. Nevermind that would be created statically aka before fb config is set.
    const firestore = firebase.firestore();


    const tagsRef = firestore.collection("Tags")
    const query = tagsRef.where("type","==","event").where("eventUid", "==",eventUid);

    const querySnapshot = yield query.get();    

    //Again same logic, it should never happen that it doesn't exist.
    //And there should only be one.
    const queryDocSnapshot = querySnapshot.docs[0];

    const trackerDoc = firestore.collection("ClubInfo").doc("Events").collection("EventList").doc(eventUid).collection("Trackers").doc(userUid);

    yield trackerDoc.delete();

    yield put(updateTracking(false));

}

//Instead of event title, should really be eventUid, honestly.
//Better that way. ToDo: update events page to also do this.
function* attendEventSaga(payload){

    //Honestly should just send useruid then too lmao.
    const {userUid, eventUid} = payload;

    const firestore = firebase.firestore();

    //There was a reason for me having separate collection though.
    //It was because didn;t have specific event page and wanted tos how all attendees of an event
    //so kept all attendees in one place, primary key with attendeeUid and event the attendee is attending in
    //then when I list all of the evens I simple check the collection of attendees
    //and see if it matches the event id then get all the users of the matching uids.
    //For showing it on the event card that would be good and is more flexible.
    //But logically this makes more sense, and honestly I should just show if I show at all in the actual
    //event page. Another reason would be the document would've been just empty.
    //I think that was a main one.   Yeah will keep it like that actually.
    const attendanceRef = firestore.collection("ClubInfo").doc("Events").collection("Attendees").doc();


    var succeeded = true;
    yield attendanceRef.set({

        attendee: userUid,
        eventUid: eventUid,
    })
    .catch (err => {

        succeeded = false;
        //Todo: Add error message along with this, just alot of migrating over tbh.
        console.log("error happened failed to mark as attendee");
    });

    yield put(updateAttendance(succeeded));
   // yield put(updateTracking(succeeded));


}

function* cancelAttendanceSaga(payload){

    const {userUid, eventUid} = payload;
    
    const firestore = firebase.firestore();

    const attendanceRef = firestore.collection("ClubInfo").doc("Events").collection("Attendees");

    //Then I want to do where attendee equal to user uid and eventUid equal event
    //Using event uid I don't need start date and title to be primary keys anymore, idk what i was thinking before.
    //Oh cause the events on calendar were the FULL events not previews.
    console.log("userUId", userUid);
    console.log("eventUid", eventUid);
    const query = attendanceRef.where("attendee", "==", userUid).where("eventUid","==",eventUid);

    const querySnapshot = yield query.get()
       
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

function* addViewSaga(payload){


    const firestore = firebase.firestore();

    const eventsRef = firestore.collection("ClubInfo").doc("Events");

    //Just in events should be fine, right? Do I need to make analytics collection?
    //WHatever, as long as storing it
    const analyticsRef = eventsRef.collection("Analytics").doc(payload.eventUid);


    firestore.runTransaction( transaction => {

        return transaction.get(analyticsRef)
            .then (docSnapshot => {


                if (docSnapshot.exists){

                    const newViewCount = docSnapshot.data().viewCount + 1;

                    transaction.update( analyticsRef, {

                        viewCount: newViewCount
                    });
                }
                else{

                    throw "Failed to Update Views";
                }

            })

    })
    .catch (err => {

        console.log(err);
    })
}

//Take Every because when attending, will also make user auto track it, and I want those to be triggered the same time
//and latest will cancel all other sagas, I don't want attending saga to be cancelled when track event saga triggered.

function* saga(){

    yield takeEvery(LOAD_EVENT, loadEventSaga);
    yield takeEvery(ADD_VIEW, addViewSaga);
    yield takeEvery(TRACK_EVENT, trackEventSaga);
    yield takeLatest(UNTRACK_EVENT, untrackEventSaga);

    
    yield takeEvery(ATTEND_EVENT, attendEventSaga);

    yield takeLatest(CANCEL_ATTENDANCE, cancelAttendanceSaga);
}

export default saga;