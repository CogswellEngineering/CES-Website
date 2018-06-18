import { put, call, takeLatest } from 'redux-saga/effects';
import { UPDATE_CLICKED } from './constants';
import { updating, onUpdated, onUpdateFail} from './actions';
import firebase from 'firebase';



function* updateCall(action){


    const uid = action.uid;
    const update = action.update;

    const fireStoreRef = firebase.firestore();

    //Actually theirs would work, cause still same.
    const docRef = fireStore.collection("users").doc(uid);

    try{

        yield put (updating());

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


