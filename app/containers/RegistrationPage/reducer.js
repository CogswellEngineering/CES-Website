import { FIELD_CHANGED } from 'containers/App/constants';
import { REGISTER_FAILED } from './constants';
import { fromJS } from 'immutable';
import { actionTypes } from 'react-redux-firebase'


const initialState = fromJS({

    displayName:"",
    email : "",
    password:"",
    major:"",
    error:""
})

export default function registrationReducer(state = initialState, action){

    switch (action.type){

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