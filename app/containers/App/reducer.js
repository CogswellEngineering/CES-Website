

import { fromJS } from 'immutable';
import { actionTypes } from 'react-redux-firebase';
import { LOCATION_CHANGE } from 'react-router-redux';




const initialState = fromJS({
    loggedIn:false,
    doneLoadingCache:false,
});



export default function appReducer(state = initialState, action){


    switch (action.type){

        case LOCATION_CHANGE:

            return state
                .set("mainContentPath",action.payload.pathname);

        //Letting fall through happen, don't need breaks in all other reducers cause returning from function.
        case actionTypes.LOGIN:

        case actionTypes.AUTH_EMPTY_CHANGE:
            return state
                .set("doneLoadingCache",true);

        case actionTypes.SET_PROFILE:

            return state;

        case actionTypes.LOGOUT:
            //Then logout 
            console.log("Logged out via firebase-redux-react");  
            return state
        default:
            return state 
    }
}