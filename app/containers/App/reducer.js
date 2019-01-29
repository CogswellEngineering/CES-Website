

import { fromJS } from 'immutable';
import { actionTypes } from 'react-redux-firebase';
import { LOCATION_CHANGE } from 'react-router-redux';
//Should be in config url tbh.
import {DOMAIN_URL} from 'SiteData/constants';
const DEFAULT_AVATAR = require("images/default_avatar.png");

//ToDo load full profile of logged In user when logged in.
//That will be saga in here, to trigger the profile there.
const initialState = fromJS({
    loggedInProfile: null,
    doneLoadingCache:false,
});



export default function appReducer(state = initialState, action){


    switch (action.type){

     
        case LOCATION_CHANGE:
    
            //Didn't think of doing this before lmao.
            //Also with header not fixed NOT really needed anymore.
            //though leaving so if make fixed in future.
        
            window.scrollTo(0,0); 
            
            console.log(DOMAIN_URL + action.payload.pathname);
            console.log(document.location.href);


            return state
                .set("mainContentPath",action.payload.pathname);

        //Letting fall through happen, don't need breaks in all other reducers cause returning from function.
        case actionTypes.LOGIN:

        case actionTypes.AUTH_EMPTY_CHANGE:
            return state
                .set("doneLoadingCache",true);

        case actionTypes.SET_PROFILE:

            console.log("action on set profile", action);

            if (action.profile.profilePicture == null){

                action.profile.profilePicture = {url: DEFAULT_AVATAR};
            }
            return state
                .set("loggedInProfile", action.profile);

        case actionTypes.LOGOUT:
            //Then logout 
            console.log("Logged out via firebase-redux-react");  
            return state
                .set("loggedInProfile", null);
        default:
            return state 
    }
}