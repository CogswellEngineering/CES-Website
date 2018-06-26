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

        //Contemplated just putting all in profile, but if want only credits, don't want to pull all that extra info.
         const userInfo = {
             profile: snapshot.get("profile"),
             //Changing this to collection instead of object within same document
             //This way can store other stuff within types of inventoires
             //Also setting up the event listeners in component will mount
             //inventory: snapshot.get("inventory"),
             //Need to update index there, also add a check to not get profile or only pull inventory exactly
             uid: action.uid,
         };
         
         //Adding uid, for checking if same when clicked to skip reloading.
         snapshot.uid = action.uid;
         yield put(loadedProfile(userInfo));
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