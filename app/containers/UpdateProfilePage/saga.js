import { put, call, takeLatest } from 'redux-saga/effects';
import { UPDATE_CLICKED } from './constants';
import { updating, onUpdated, onUpdateFail} from './actions';
import firebase from 'firebase';



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
        //Also need to remove past profile picture from storage. Reminder for that.
        //I'll need to get the profile information, well only really need the original profileimage
        //I could pass that in, or just retrieve it again here since I do have the reference to firestore
        //but If i already have it why waste the time.
        
        if (profilePicture.new != null){
            //Places the profile image in storage.
            const storageRef = firebase.storage().ref("ProfilePictures/");
        
            //.Odds are slim, but chance that profile images will have same name, and ppl could be using same img
            //with same filename, so prefixing it with uid, or postfix doesn't matter. Reminder to do this with 
            //3DPrinter queue too.

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
        //Don't think I actually finished fixing this, it fails seeing no firestore reference or that it's null. 
        //Look into this later. 
        yield docRef.update(update);
        //Dope and it auto updates cause of listener so I'm still solid there.
        yield put (onUpdated());
    }

    catch (err){
        console.log(err);
        yield put (onUpdateFail("Failed to update profile. Please try again later."));
    }

}



//Will prob change these name to watcher as makes more sense.
export default function* updateProfileWatcher(){

    yield takeLatest(UPDATE_CLICKED,updateCall);

}


