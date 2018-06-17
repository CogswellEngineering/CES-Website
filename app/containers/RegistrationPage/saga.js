import { call, put, takeLatest} from 'redux-saga/effects';
import { REGISTER_CLICKED} from './constants'
import { onRegistered, onRegisterFail} from './actions';
import request from 'utils/request';
import { verifyPassword, verifyEmail } from 'utils/fieldVerifications';
import { fbAdminAPI as url} from 'utils/apiLinks';
//for testing put here

function* registerCall(action){


    //Before making the call, verify credentials

    if (!verifyEmail(action.credentials.email)){
        yield put (onRegisterFail("Invalid email"));
    }
    else if (!verifyPassword(action.credentials.email)){
        yield put (onRegisterFail("Invalid Password:Must be atleast 6 characters long, Containing an uppercase,lowercase, and number."))
    }
    else{
        try{

            
            const response = yield call(
                request,
                url+"/register",
                {
                    method:"POST",
                    body:action.credentials,

                }
            );

            console.log(response);
            
            if (response != null){
            
                if (response.error){
                    yield put(onRegisterFail(response.error))
                }
                else{
                    yield put(onRegistered(data));
                }
            }
            

        
        }
        catch(err){

            console.log(err);
            yield put(onRegisterFail(err));
        }
    }
}


function* checkRegister(){

    yield takeLatest(REGISTER_CLICKED, registerCall)
    
}

export default checkRegister;