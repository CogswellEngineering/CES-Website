import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LIBRARY_UPDATED, BORROWED_UPDATED, ORDERS_UPDATED, 
    LOADED_PROFILE_FAIL, LOADED_PROFILE, FOUND_OWNER_STATUS,
    NEXT_PAGE_CLICKED} from './constants';
    
import { actionTypes } from 'react-redux-firebase'





const initialState = fromJS({

    ownProfile: false,
    needReload: true,
    profile:null,
    error:"",
    
});

export default function userProfileReducer(state = initialState, action){


   
    switch (action.type){

        case actionTypes.LOGOUT:


        case FOUND_OWNER_STATUS:

            return state
                .set("ownProfile",action.doesOwn);

       
        case LOCATION_CHANGE:

            //To clear all the fields, I could check if path changing to is same, to return current state instead.
            
           // return initialState;
            const pathname = action.payload.pathname;
            
            if (!pathname.includes("update") && !pathname.includes("library")){


                //If changed to here and null, then profile may not have been loaded in yet.
                if (state.get("profile") == null) {
                    return initialState;
                }

                const pathSplit = action.payload.pathname.split("/");

              
                const uid = pathSplit[pathSplit.length - 1];

                    if (uid == state.get("profile").uid){
                        return state
                            .set("error","");
                    }
                    else{

                        //Forces need reload
                        return state
                            .set("needReload",true)
                            .set("error","");

                    }
                
                
            }
            else{
                return initialState;
            }



        case LOADED_PROFILE_FAIL:

            //Only fail if not exists, so just force redirect or have fail
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




