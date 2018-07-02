import { takeLatest, put, call} from 'redux-saga/effects';
import request from 'utils/request';
import { fbAdminAPI as url} from 'utils/apiLinks';
import { actionTypes } from 'react-redux-firebase';
import { GENERATE_AUTH_TOKEN} from './constants';
import { generatedAuthToken} from './actions';


function* generateAuthToken(action){

    console.log("action in genreating token",action);


    //Well.. Not really needed anymore, If I had just looked would see that could generate token client side.
    //But only if logged in which is perfect use case of this.
    //Though this saga is not needed here
    //The code this is sending to is still needed. Because if token expires, then need to send get request
    //with uid to generate new token from there, then just set the cookie there to overwrite the expired token.
    //so this code will basically just be pasted on service apps instead of in here, so I'll keep the code here for now.
    const response = yield call(request, url+"/generate-auth-token", {

            method: "POST",
            body: JSON.stringify(action),
            headers: {
                'Content-Type': 'application/json',
            },

    });


    yield put(generatedAuthToken(response.token));







}



export default function* loginWatcher(){

    //could change to set profile to send both
    //then just get uid not from action, but from firebase, current user, etc.
    //Or I could make printing service use react-redux-firebase again
    //and sign in to that so it h

    yield takeLatest(actionTypes.LOGIN, generateAuthToken);




}