import { put, call, takeLatest } from 'redux-saga/effects';
import { UPDATE_CLICKED } from './constants';
import { updating, onUpdated, onUpdateFail} from './actions';
import firebase from 'firebase';

import Dropdown from 'react-dropdown'

function* updateCall(action){


    console.log("uid",action.uid);
    const uid = action.uid;
    const update = action.update;
    const profilePicture = action.profilePicture;
    console.log("Profile pictures",profilePicture)

    console.log("Update",update);
    
    try{
        //Profile Image will remain structured like the file object name and url.
        yield put (updating());
        
        
        if (profilePicture.new != null){
            //Places the profile image in storage.
            const storageRef = firebase.storage().ref("ProfilePictures/");
        
            //Due to chance of multiple people using image with same name, will prefix it with uid
            //Could have them both use it, but same name doesn't mean same image, so will need to add checks for that.
            //This is simpler.

            //If doesn't exist, and try to remove it shouldn't throw an error, but just incase and to save computation time.  
            if (profilePicture.old != null){

                console.log(profilePicture);
                console.log("I shouldn't happen.");
                console.log(uid+"_"+profilePicture.old.name);
                var oldImageRef = storageRef.child(uid+"_"+profilePicture.old.name);

                //Removes old profile image from storage.
                yield (oldImageRef.delete());
                console.log("get to here");
            }

              

                const newProfileName = profilePicture.new.name.replace(" ","");

                const newImageRef =  storageRef.child(uid+"_"+newProfileName);


                //Returns a progress snapshot, I don't need to see it though.
                yield newImageRef.put(profilePicture.new);
                const downloadURL = yield newImageRef.getDownloadURL();

                if (downloadURL != null){

                    update.profilePicture = {name:newProfileName, url:downloadURL};
                }
                    
        }
        

        const fireStore = firebase.firestore();

        const docRef = fireStore.collection("users").doc(uid);


        //Then updates profile with all the new information.
        yield docRef.update(update);

        yield put (onUpdated());
    }

    catch (err){
        console.log(err);
        yield put (onUpdateFail("Failed to update profile. Please try again later."));
    }

}



//Will prob change these names to watcher as makes more sense.
export default function* updateProfileWatcher(){

    yield takeLatest(UPDATE_CLICKED,updateCall);

}


