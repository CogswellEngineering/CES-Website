
import { FIELD_CHANGED } from './constants';

export function fieldChanged(fieldName,value) {

    return {
        type : FIELD_CHANGED,
        fieldName : fieldName,
        value
    }
}