



import {LOGIN_PRESSED} from './constants'
import {FIELD_CHANGED} from 'containers/App/constants';
import { fromJS } from 'immutable';



//Will add more as needed
const initialState = fromJS({
    email : "",
    password:"",
    requireVerification:false,
    
});


export default function loginReducer(state = initialState, action){
    switch (action.type){

        case FIELD_CHANGED:
            return state
                .set([action.fieldName],action.value);
        default:
            return state;
    }
}