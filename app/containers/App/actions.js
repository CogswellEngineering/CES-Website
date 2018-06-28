
import { FIELD_CHANGED } from './constants';

  //Adding the page was to fix issue if effecting fields in different states
  //when containers rendered same time. No longer have something that would cause that issue,
  //but incase something like that occurs again, leaving like this.
export function fieldChanged(page,fieldName,value) {

    return {
        type : FIELD_CHANGED+page,
        fieldName : fieldName,
        value
    }
}
