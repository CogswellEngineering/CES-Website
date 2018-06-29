



import {FIELD_CHANGED} from 'containers/App/constants';
import { fromJS } from 'immutable';
import { actionTypes } from 'react-redux-firebase';
import { LOGIN_PATH } from 'components/Header/pages';
import { LOCATION_CHANGE } from 'react-router-redux';


//Will add more as needed
const initialState = fromJS({

    doneLoggingIn: false,
    email : "",
    password:"",
    error:""
    
});


export default function loginReducer(state = initialState, action){

    switch (action.type){


        case LOCATION_CHANGE:

            console.log(action);
            if (action.payload.pathname === LOGIN_PATH){
                return state;
            }
            return initialState;

        case actionTypes.LOGIN:

            console.log("Logged in action",action);
            if (!action.auth.emailVerified){
                return state
                    .set("error",'Email not verified');
            }
            else{
                return state
                    .set("doneLoggingIn",true)
                    .set("error","");
            }

        case actionTypes.LOGIN_ERROR:
            //Why is this always happening, but right before it working?
            if (action.authError != null){
                return state
                    .set("error","Email or password is incorrect");
            }
            else{
                return state;
            }
        
        case actionTypes.LOGOUT:
            return initialState;

        case FIELD_CHANGED+LOGIN_PATH:
            return state
                .set(action.fieldName,action.value)
                .set("error","");
        default:
            return state;
    }
}