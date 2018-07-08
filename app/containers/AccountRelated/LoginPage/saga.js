import { takeLatest, put, call} from 'redux-saga/effects';
import request from 'utils/request';
import { fbAdminAPI as url} from 'utils/apiLinks';
import { actionTypes } from 'react-redux-firebase';
import { generatedAuthToken} from './actions';
import firebase from 'firebase';


function* generateAuthToken(action){


    //If it get's to here, it is 100% that currentUser is not null.
    //Chance that they log out while this happening? yeah, but unlikely at speed this happens.
    //So no point wasting processing.

    const currentUser = firebase.auth().currentUser;

    const response = yield call(request, url+"/generate-auth-token", {

            method: "POST",
            body: JSON.stringify({uid: currentUser.uid}),
            headers: {
                'Content-Type': 'application/json',
            },

    });


    yield put(generatedAuthToken(response.token));

}



export default function* loginWatcher(){

    yield takeLatest(actionTypes.SET_PROFILE, generateAuthToken);
}