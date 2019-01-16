



import { FIELD_CHANGED} from 'containers/App/constants';
import { fromJS } from 'immutable';
import { RECOVER_LINK_SENT } from './constants';
import { actionTypes } from 'react-redux-firebase';

//Will add more as needed
const initialState = fromJS({
    linkSent:false,
    error:""
    
});


export default function accountRecoveryReducer(state = initialState, action){

    switch (action.type){

        case actionTypes.CHANGE_LOCATION:
            return initialState;
      
        case RECOVER_LINK_SENT:
            return state
                .set('linkSent',true);
        
        default:
            return state;
    }
}