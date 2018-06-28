import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LIBRARY_UPDATED, BORROWED_UPDATED, ORDERS_UPDATED, 
    LOADED_PROFILE_FAIL, LOADED_PROFILE, FOUND_OWNER_STATUS,
    NEXT_PAGE_CLICKED} from './constants';
    
import { actionTypes } from 'react-redux-firebase'



//3 for testing, remember to change back.
const itemsPerPage = 3;

const initialState = fromJS({

    ownProfile: false,
    needReload: true,
    profile:null,
    //So profile has all information, profile and the below.
    //Below represents what's currently seen only.
    error:"",
    
});

export default function userProfileReducer(state = initialState, action){


    //Will update to just append later, after think more about what's more efficient
    //for now this is fine.
    switch (action.type){

        case actionTypes.LOGOUT:
            //Because if logged out this is impossible
            return state
                .set("ownProfile",false);

        case FOUND_OWNER_STATUS:

            return state
                .set("ownProfile",action.doesOwn);

       
        case LOCATION_CHANGE:

            //To clear all the fields, I could check if path changing to is same, to return current state instead.
            
           // return initialState;
            const pathname = action.payload.pathname;
            
            if (pathname.includes("/account/")){


                //I don't remember use of this.
                if (state.get("profile") == null) {
                    return initialState;
                }

                const pathSplit = action.payload.pathname.split("/");

                if (pathSplit.length == 3){
                    const uid = pathSplit[pathSplit.length - 1];

                    if (uid == state.get("profile").uid){
                        return state;   
                    }
                    else{

                        console.log("I'm here right?");
                        return state
                            .set("needReload",true);

                    }
                }
                else{
                        return initialState;
                }
            }
            else{
                return initialState;
            }



        case LOADED_PROFILE_FAIL:

            return state
                .set("error","Failed to load profile, try refreshing the page");

        case LOADED_PROFILE:

            return state
                .set("profile",action.profile)
                .set("needReload",false);
                
      
        default:
            return state;

    }

}




