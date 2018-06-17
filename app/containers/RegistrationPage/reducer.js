import { FIELD_CHANGED } from 'containers/App/constants';
import { REGISTER_FAILED, REGISTERED } from './constants';
import { fromJS } from 'immutable';
import { actionTypes } from 'react-redux-firebase'
import { LOCATION_CHANGE } from 'react-router-redux';
import { REGISTER_PATH } from 'components/Header/pages';


const initialState = fromJS({

    doneRegistering:false,
    displayName:"",
    email : "",
    password:"",
    major:"",
    error:""
})

export default function registrationReducer(state = initialState, action){

    switch (action.type){

        case LOCATION_CHANGE:
            //To clear all the fields, I could check if path changing to is same, to return current state instead.
            if (action.payload.pathname === REGISTER_PATH){
                return state;
            }
            return initialState;

        case REGISTERED:

            return state
                .set(doneRegistering,true);

        case REGISTER_FAILED:

            return state
                .set("error",action.error);
     
        case FIELD_CHANGED:
            return state
                .set(action.fieldName,action.value)
                .set("error","");
        default:
            return state;
    }
}