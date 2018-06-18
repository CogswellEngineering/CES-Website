import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LIBRARY_UPDATED, BORROWED_UPDATED, ORDERS_UPDATED, 
    LOADED_PROFILE_FAIL, LOADED_PROFILE} from './constants';
    



const initialState = fromJS({
    needReload: false,
    profile:null,
    library:[],
    borrowed:[],
    orders:[],
    error:"",
});

export default function userProfileReducer(state = initialState, action){


    //Will update to just append later, after think more about what's more efficient
    //for now this is fine.
    switch (action.type){

         


        case LOCATION_CHANGE:

            //To clear all the fields, I could check if path changing to is same, to return current state instead.
            
           // return initialState;
            const pathname = action.payload.pathname;
            
            if (pathname.includes("/account/")){


                if (state.get("profile") == null) return state;

                const pathSplit = action.payload.pathname.split("/");

                if (pathSplit.length == 3){
                    const uid = pathSplit[pathSplit.length - 1];
                    console.log("always here?");

                    //If still same, do nothing.
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

            console.log("profile loaded",action.profile);
            return state
                .set("profile",action.profile)
                .set("needReload",false);

        case LIBRARY_UPDATED:

            return state
                .set("library",action.library);

        case BORROWED_UPDATED:

            return state
                .set("borrowed",action.borrowed);

        case ORDERS_UPDATED:

            return state
                .set("orders",action.orders);

        default:
            return state;

    }



}




