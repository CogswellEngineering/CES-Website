import { fromJS} from 'immutable';
import { FIELD_CHANGED,  } from 'containers/App/constants';

import { UPDATE_FAILED,UPDATING,UPDATED, PROFILE_PICTURE_UPLOADED, UPDATE_CANCELLED, PAGE_LOADED  } from './constants'
import { LOCATION_CHANGE } from 'react-router-redux';
import { UPDATE_USER_PROFILE_PATH } from 'components/Header/pages';

import { actionTypes } from 'react-redux-firebase';

//Firebase instance that's same as props




//Would prefer this to be  profile
const initialState = fromJS({



    profilePicture:null,
    displayName:"",
    firstName:"",
    lastName:"",
    bio:"",
    major:"",
    year:"",
    doneUpdating:false,
    loading:false,
    error:"",
});


export default function updateProfileReducer(state = initialState, action){

    console.log(action);

    switch (action.type){


       
        case LOCATION_CHANGE:


            return initialState;

        case PROFILE_PICTURE_UPLOADED:

            console.log("Profile picture uploaded action",action.image[0]);

            return state
                .set("profilePicture",action.image[0]);
                
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
 
       case FIELD_CHANGED+UPDATE_USER_PROFILE_PATH:
       
            console.log(action.fieldName, "Value:", action);
            return state
            .set(action.fieldName,action.value)
            .set("error",""); 

        default:
            return state;
    }



}