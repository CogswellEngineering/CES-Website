
import { FIELD_CHANGED, LOADED_LOGGED_PROFILE } from './constants';

  
export function fieldChanged(page,fieldName,value) {

    return {
        type : FIELD_CHANGED+page,
        fieldName : fieldName,
        value
    }
}