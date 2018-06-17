import { call, put, takeLatest} from 'redux-saga/effects';
import { fbAdminAPI as url} from 'utils/apiLinks';
import request from 'utils/request';
import { tokenChecked, passwordChanged } from './actions';
import { CHECK_TOKEN, RESET_TOKEN_USED, CHANGE_PASSWORD} from './constants';





function* checkToken(checkTokenAction){

    const token = checkTokenAction.token;

    //I need to put result of check here as well.

    yield put(tokenChecked());
}


//I will refactor the rest later, but I'm goin to start replacing param with action used instead of action for saga workers
function* expireToken(resetTokenUsed){

    console.log(resetTokenUsed);

}


function* changePassword(changePasswordAction){

}

function* checkReset(){

    yield takeLatest(CHECK_TOKEN,checkToken);
    yield takeLatest(RESET_TOKEN_USED,expireToken);
    yield takeLatest(CHANGE_PASSWORD,changePassword);
}

export defualt 