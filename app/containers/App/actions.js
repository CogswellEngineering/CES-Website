
import {FIELD_CHANGED,LOGGED_IN} from './constants';

export function loggedIn(user){

    return {
        type: LOGGED_IN,
        user:user
    };
}
export function fieldChanged(fieldName,value){

    return {
        type : FIELD_CHANGED,
        fieldName : fieldName,
        value
    }
}