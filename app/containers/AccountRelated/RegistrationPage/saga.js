import { call, put, takeLatest} from 'redux-saga/effects';
import { REGISTER_CLICKED} from './constants'
import { onRegistered, registering,onRegisterFail} from './actions';
import request from 'utils/request';
import { verifyPassword, verifyEmail } from 'utils/fieldVerifications';
import { fbAdminAPI as url} from 'utils/apiLinks';
//for testing put here

function* registerCall(action){


    //Before making the call, verify credentials

    console.log("Credentials",action.credentials);
    if (!verifyEmail(action.credentials.email)){
        yield put (onRegisterFail("Invalid email"));
    }
    else if (!verifyPassword(action.credentials.password)){
        yield put (onRegisterFail("Invalid Password:Must be atleast 6 characters long, Containing an uppercase,lowercase, and number."))
    }
    else{
        try{

            yield put(registering());
            
            const response = yield call(
                request,
                url+"/register",
                {
                    method:"POST",
                    body:JSON.stringify(action.credentials),
                    headers: {
                        'Content-Type': 'application/json',
                    },

                }
            );

            console.log(response);
            
            if (response != null){
            
                if (response.error){
                    yield put(onRegisterFail(response.error))
                }
                else{
                    yield put(onRegistered(action.credentials));
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