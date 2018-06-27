import { put, call, takeLatest } from 'redux-saga/effects'
import firebase from 'firebase';
import { LOAD_PROFILE } from './constants'
import { failedToLoadProfile, loadedProfile } from './actions';


function* loadProfileCall(action){


     //Otherwise load in profile from fire store.
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

            console.log("snap shot data", snapshot.data());

            //Contemplated just putting all in profile, but if want only credits, don't want to pull all that extra info.
            const userInfo = snapshot.data();
            
            
            //Adding uid, for checking if same when clicked to skip reloading.
            userInfo.uid = action.uid;
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