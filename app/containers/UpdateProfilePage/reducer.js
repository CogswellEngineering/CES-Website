import { fromJS} from 'immutable';
import { FIELD_CHANGED } from 'containers/App/constants';

import { UPDATE_FAILED,UPDATING,UPDATED, PROFILE_PICTURE_UPLOADED, UPDATE_CANCELLED } from './constants'

//No need, react-redux-firebase already has this, I should just use this, I went out of my way to install it
//and there's might have optimizations I don't. Though may also be depreacted, does mean I won't need saga though
//but if I did it myself, I'd in essence be duplicating code, cause what I make is probably same as theirs.
//So, I could do it myway to use newer methods, or do it their way and hope they update this package eventually so it's not depreacted
//if they do it, then never have to look back, cause since using theirs, ust need to update package, then done
//if do it my way do have to look back and change manually. But I already set everything up too lol.
//Fuck it, maybe dumb reason to do it myself, but I already started it, hate deleting what's not broken.


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
    loading:"",
    error:"",
});


export default function updateProfileReducer(state = initialState, action){


    switch (action.type){


        case PROFILE_PICTURE_UPLOADED:

            return state
                .set("profilePicture",action.image);
                
        case UPDATED:

        case UPDATE_CANCELLED:

            return state
                .set("doneUpdating",true);

        case UPDATING:

            return state
                .set("loading",true);

        case UPDATE_FAILED:

            return state
            .set("error",action.error);
 
       case FIELD_CHANGED:
       
            return state
            .set(action.fieldName,action.value)
            .set("error",""); 

        default:
            return state;
    }



}