import { takeLatest, put, call } from 'redux-saga/effects';
import { EVENT_PRESSED,  } from './constants';
import { loadingEvent, verifiedAttending } from './actions';
import firebase from 'firebase';



function* checkIfAttendee(action){

    const loggedInUser = firebase.auth().currentUser;

    if (loggedInUser == null){

        yield put(verifiedAttending(false,action.event));
        return;
        
    }

    const event = action.event;

    const attendeeRef = firebase.firestore().collection("ClubInfo").doc("Events").collection("Attendees");

   

    try{

        console.log("Event",event);
        const query = attendeeRef.where("attendee","==",loggedInUser.uid)
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


    yield takeLatest(EVENT_PRESSED, checkIfAttendee);
}

export default eventsWatcher;