import { fromJS} from 'immutable';

import { UPDATE_FAILED,UPDATING,UPDATED, UPDATE_CANCELLED, PAGE_LOADED  } from './constants'
import { LOCATION_CHANGE } from 'react-router-redux';

import { actionTypes } from 'react-redux-firebase';





const initialState = fromJS({

    doneUpdating:false,
    loading:false,
    error:"",
});


export default function updateProfileReducer(state = initialState, action){

    console.log(action);

    switch (action.type){


       
        case LOCATION_CHANGE:


            return initialState;

                
        case actionTypes.LOGOUT:
        
        case UPDATED:

        case UPDATE_CANCELLED:

            return initialState
                .set("doneUpdating",true);

        case UPDATING:

            return state
                .set("loading",true);

        case UPDATE_FAILED:

            return state
            .set("error",action.error);
 

        default:
            return state;
    }



}