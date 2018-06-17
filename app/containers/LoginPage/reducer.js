



import {FIELD_CHANGED} from 'containers/App/constants';
import { fromJS } from 'immutable';
import { actionTypes } from 'react-redux-firebase'


//Will add more as needed
const initialState = fromJS({

    doneLoggingIn: false,
    email : "",
    password:"",
    error:""
    
});


export default function loginReducer(state = initialState, action){

    switch (action.type){

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

        case FIELD_CHANGED:
            return state
                .set(action.fieldName,action.value)
                .set("error","");
        default:
            return state;
    }
}