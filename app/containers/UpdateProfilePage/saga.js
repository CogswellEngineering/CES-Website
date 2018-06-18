import { put, call, takeLatest } from 'redux-saga/effects';
import { UPDATE_CLICKED } from './constants';
import { updating, onUpdated, onUpdateFail} from './actions';
import firebase from 'firebase';



function* updateCall(action){


    const uid = action.uid;
    const update = action.update;
    const profilePicture = action.profilePicture;

    const fireStoreRef = firebase.firestore();

    const docRef = fireStore.collection("users").doc(uid);
    
    try{


        //Profile Image will remain structured like the file object name and url.


        yield put (updating());
        //Also need to remove past profile picture from storage. Reminder for that.
        //I'll need to get the profile information, well only really need the original profileimage
        //I could pass that in, or just retrieve it again here since I do have the reference to firestore
        //but If i already have it why waste the time.
        
        //Places the profile image in storage.
        const storageRef = firebase.storage().ref("ProfilePictures/");
    
        //.Odds are slim, but chance that profile images will have same name, and ppl could be using same img
        //with same filename, so prefixing it with uid, or postfix doesn't matter. Reminder to do this with 
        //3DPrinter queue too.

        //If doesn't exist, and try to remove it shouldn't throw an error, but just incase and to save computation time.  
        if (profilePicture.old != null){

            var oldImageRef = storageRef.child(uid+"_"+profilePicture.old.filename);

            //Removes old profile image from storage.
            yield call(oldImageRef.remove);
        }

        var newImageRef =  storageRef.child(uid+"_"+profilePicture.new.filename);

        const snapshot = yield call(newImageRef.put,profilePicture.new);
        
        //If worked, then I can reference the imageref to get the download url.
        if (snapshot.exists){

            const downloadURL = yield call(newImageRef.getDownloadURL);

            //Hopefully it throws so can be caught and doesn't give back the error into download url.
            //After placing in storage gets download url
            if (downloadURL != null){
                update.profilePicture = {

                   name:profilePicture.new.filename,
                   url: downloadURL,

                }
            }
        }

        //Then updates profile with all the new information.
        const response = yield call(docRef,{
            profile:update
        });

        //Dope and it auto updates cause of listener so I'm still solid there.
        yield put (onUpdated());
    }
    catch (err){
        yield put (onUpdateFail("Failed to update profile. Please try again later."));
    }

}



//Will prob change these name to watcher as makes more sense.
export default function* updateProfileWatcher(){


    yield takeLatest(UPDATE_CLICKED,updateCall);


}


