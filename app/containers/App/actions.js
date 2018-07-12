
import { FIELD_CHANGED } from './constants';

  
export function fieldChanged(page,fieldName,value) {

    return {
        type : FIELD_CHANGED+page,
        fieldName : fieldName,
        value
    }
}
