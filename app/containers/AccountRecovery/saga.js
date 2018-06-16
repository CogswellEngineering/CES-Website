import { call, put, takeLatest } from 'redux-saga/effects';
import { ATTEMPT_RECOVER } from './constants';
import { recoveredAccount, recoverLinkSent } from  './actions';
import { fbAdminAPI as url} from 'utils/apiLinks';
import request from 'utils/request';

//Okay, I have reset password code, done in my own app.
//That makes it so I can have all parts be same theme, instead of reset
//looking different from everything else. But their way is more secure, and takes away from work I have to spend time on.
//But time has already been spent, lol. Okay, for now will try firebase only
function* recoverAccount(action){

    console.log("I'm here",action.formData.email);
    console.log(url);

    //Sends post request to api to send reset link
    yield call (request,url + "/reset-password",{

        method : "POST",
        body: action.formData,    
    });

    //Dispatches action that link was sent to update the page.

    yield put(recoverLinkSent(action.formData.email));

}


function* checkRecovery(){

    yield takeLatest(ATTEMPT_RECOVER,recoverAccount);
}
export default checkRecovery;