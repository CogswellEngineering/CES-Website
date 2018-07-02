



import { FIELD_CHANGED} from 'containers/App/constants';
import { fromJS } from 'immutable';
import { RECOVER_LINK_SENT } from './constants';
import { actionTypes } from 'react-router-redux';

//Will add more as needed
const initialState = fromJS({
    linkSent:false,
    email : "",
    error:""
    
});


export default function accountRecoveryReducer(state = initialState, action){

    switch (action.type){

        case actionTypes.CHANGE_LOCATION:
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