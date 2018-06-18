import { put, call, takeLatest } from 'redux-saga/effects'
import firebase from 'firebase';
import { LOAD_PROFILE } from './constants'
import { failedToLoadProfile, loadedProfile } from './actions';


function* loadProfileCall(action){


     //Otherwise load in profile from fire store.
     console.log("here");
     const fireStoreRef = firebase.firestore();
     

     //Easiest solution to this, would be set up a get response on my server app to do this and ust return profile.
     //but defeats purpose of having firebase here.

     const docRef = fireStoreRef.collection("users").doc(action.uid);
     try{
     console.log("document ref:",docRef);

     //Makes sense as selector, in my head, but chanc
     var profileToReturn = null;


     const snapshot = yield (docRef.get());

     if (snapshot.exists){

        //I need library and purchases too, so will just return snapshot of whole document instead.
         var profile = snapshot.get("profile");
         //Adding uid, for checking if same when clicked to skip reloading.
         snapshot.uid = action.uid;
         yield put(loadedProfile(snapshot));
     }
     else{
         yield put(failedToLoadProfile());
     }
    }
    catch(err){
        console.log(err);
            yield put(failedToLoadProfile());
    }

}


function* checkProfile(){

    yield takeLatest(LOAD_PROFILE,loadProfileCall);

}

export default checkProfile;