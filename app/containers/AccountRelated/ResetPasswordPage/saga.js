import { call, put, takeLatest} from 'redux-saga/effects';
import { BACK_END_URL as url} from 'SiteData/constants';
import request from 'utils/request';
import { checkToken,tokenChecked, passwordChanged } from './actions';
import { CHECK_TOKEN, RESET_TOKEN_USED, CHANGE_PASSWORD} from './constants';





//Don't need to use admin api, for checking token.
function* checkTokenCall(checkTokenAction){

    const token = checkTokenAction.token;

    try{
        const response = yield call(request,url+"/check-token?token="+token,{

            method:"GET",
            headers: {
                'Content-Type': 'application/json',
            },

        });

        console.log(response);

        yield put(tokenChecked(response.expired));
    }
    catch (err) {
        console.log(err);
        //If fails, then try again.
        yield put(checkToken(token));
    }
}


//I will refactor the rest later, but I'm goin to start replacing param with action used instead of action for saga workers
function* expireToken(resetTokenUsed){

    console.log("Do i happen?");

    try{
        const response = yield call(request,url+"/token-used",{

            method:"POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({token:resetTokenUsed.token}),

        });

        //Nothing to put, just needed this to happen.


    }
    catch (err) {
        console.log(err);
        //If fails, then try again.
    }

}

//This will call post to confirm reset
function* changePassword(changePasswordAction){

    
    try{
        const response = yield call(request,url+"/confirm-reset",{

            method:"POST",
            body: changePasswordAction.formData,

        });


        yield put(passwordChanged());

    }
    catch (err) {
        console.log(err);
        //If fails, then try again.
    }

}

function* checkReset(){

    yield takeLatest(CHECK_TOKEN,checkTokenCall);
    yield takeLatest(RESET_TOKEN_USED,expireToken);
    yield takeLatest(CHANGE_PASSWORD,changePassword);
}

export default checkReset; 