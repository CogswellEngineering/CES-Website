



import { FIELD_CHANGED, LEFT_PAGE} from 'containers/App/constants';
import { fromJS } from 'immutable';
import { RECOVER_LINK_SENT } from './constants';

//Will add more as needed
const initialState = fromJS({
    linkSent:false,
    email : "",
    error:""
    
});


export default function accountRecoveryReducer(state = initialState, action){

    switch (action.type){

        case LEFT_PAGE:
            return initialState;
      
        case RECOVER_LINK_SENT:
            return state
                .set('linkSent',true);
        case FIELD_CHANGED:
            return state
                .set(action.fieldName,action.value)
                .set("error","");
        default:
            return state;
    }
}