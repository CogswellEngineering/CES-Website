

import { fromJS } from 'immutable';
import { actionTypes } from 'react-redux-firebase';
import { LOCATION_CHANGE } from 'react-router-redux';



//Where do i get global state with the router?
//Will add more as needed
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
            console.log("setting doneLoading cache to true");
            return state
                .set("doneLoadingCache",true);

        case actionTypes.LOGOUT:
            //Then logout 
            console.log("Logged out via firebase-redux-react");  
            return state
        default:
            return state 
    }
}