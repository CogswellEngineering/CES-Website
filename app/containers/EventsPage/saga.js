//This will handle call to upload attendees for a selected event.
import { takeLatest, put, call } from 'redux-saga/effects';
import { EVENT_PRESSED, ATTEND_PRESSED, ATTEND_CANCEL } from './constants';
import { attendFailed, loadingEvent, verifiedAttending } from './actions';
import firebase from 'firebase';

function* attendEvent(action){

    
    const attendee = firebase.auth().currentUser.uid;
    const event = action.event;

    //How should I actually store attendees per event?
    //Attendees array keys by event uid

    //I don't need ref that's why. Changed to generate random id instead, and actual attendee identity will be user.
    const attendeeRef = firebase.firestore().collection("ClubInfo").doc("Events").collection("Attendees").doc();

    var hadError = false;
    yield attendeeRef.set({

        //Only need these to identify the event, the rest of event info can query later.
        //Meaning the events needs to be turned to a collection instead of array too, which is fine. Just remember to make this hcange.
        eventTitle: event.title,
        startDate: event.startDate,
        attendee: attendee,

    })
    .then(res => {

        console.log(res);

    })
    .catch(err => {

        hadError = true;
        
    });

    if (hadError){

        yield put (attendFailed("Failed to mark you as attendee. Please try again."));
    }
    else{
        //
        yield put (verifiedAttending(true,event));
    }




}

function* cancelAttendance(action){


    const attendee = firebase.auth().currentUser.uid;
    const event = action.event;

    const attendeeRef = firebase.firestore().collection("ClubInfo").doc("Events").collection("Attendees");

    const query = attendeeRef.where("attendee","==",attendee)
        .where("eventTitle","==",event.title)
        .where("startDate","==",firebase.firestore.Timestamp.fromDate(event.startDate));

    
    //Hopefully this yield also yields the inner thens.
    yield query.get()
        .then(querySnapshot => {
            
            querySnapshot.docs.forEach( doc => {
                
                doc.ref.delete()
                    .then(() => {
                    })
                    .catch (err => {
                        console.log(err);
                    })
            })
            
        })
        .catch(err =>{
            console.log(err);
        });

    yield put (verifiedAttending(false,event));
}

function* checkIfAttendee(action){

    const loggedInUser = firebase.auth().currentUser.uid;

    //Wait, how am I getting this again?
    const event = action.event;

    console.log("Event in saga call",event);

    yield put (loadingEvent());
    const attendeeRef = firebase.firestore().collection("ClubInfo").doc("Events").collection("Attendees");

   

    try{

        console.log("Event",event);
        const query = attendeeRef.where("attendee","==",loggedInUser)
        .where("eventTitle","==",event.title)
        .where("startDate","==",firebase.firestore.Timestamp.fromDate(event.startDate));


        //Like normal snaphots, has exists property.
        const querySnapshot = yield query.get()        

        yield put(verifiedAttending(!querySnapshot.empty,event));
    
    }
    catch(error){

        console.log(error);
        //It shouldn't throw, but if didn't get it, actually this is bad, I should just repeat it
        yield put(verifiedAttending(false));

    }

    
}


function* eventsWatcher(){

    yield takeLatest(ATTEND_PRESSED, attendEvent);
    yield takeLatest(ATTEND_CANCEL, cancelAttendance);
    yield takeLatest(EVENT_PRESSED, checkIfAttendee);
}

export default eventsWatcher;