import { takeLatest, put, call } from 'redux-saga/effects';
import { EVENT_PRESSED,  } from './constants';
import { loadingEvent, verifiedAttending } from './actions';
import firebase from 'firebase';



function* checkIfAttendee(action){

    const loggedInUser = firebase.auth().currentUser;

    if (loggedInUser == null){

        yield put(verifiedAttending(false,action.eventCard));
        return;
        
    }

    const eventCard = action.eventCard;

    const attendeeRef = firebase.firestore().collection("ClubInfo").doc("Events").collection("Attendees");

   

    try{

        console.log("Event",eventCard);
        const query = attendeeRef.where("attendee","==",loggedInUser.uid)
        .where("eventUid","==",eventCard.eventUid);


        //Like normal snaphots, has exists property.
        const querySnapshot = yield query.get()        

        yield put(verifiedAttending(!querySnapshot.empty,eventCard));
    
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