
import { LEFT_PAGE, FIELD_CHANGED } from './constants';

export function fieldChanged(fieldName,value) {

    return {
        type : FIELD_CHANGED,
        fieldName : fieldName,
        value
    }
}

export function leftPage(){

    return {
        type: LEFT_PAGE,
    };
    
}