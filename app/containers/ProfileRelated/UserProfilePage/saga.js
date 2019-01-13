import { put, call, takeLatest } from 'redux-saga/effects'
import firebase from 'firebase';
import { LOAD_PROFILE } from './constants'
import { failedToLoadProfile, loadedProfile } from './actions';
import request from 'utils/request';

function* loadProfileCall(action){


     //Otherwise load in profile from fire store.
     const fireStoreRef = firebase.firestore();
     

     const docRef = fireStoreRef.collection("users").doc(action.uid);
     try{

        var profileToReturn = null;   

        const snapshot = yield (docRef.get());

        if (snapshot.exists){


            //Contemplated just putting all in profile, but if want only credits, don't want to pull all that extra info.
            const userInfo = snapshot.data();
            
            
            //Adding uid, for checking if same when clicked to skip reloading.
            userInfo.uid = action.uid;
           
            //Maybe just pull this from gate. To be safe.
            //And so the admin thing actually fucking works
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