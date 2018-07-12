import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LIBRARY_UPDATED, BORROWED_UPDATED, ORDERS_UPDATED, 
    LOADED_PROFILE_FAIL, LOADED_PROFILE, FOUND_OWNER_STATUS,
    NEW_PAGE_CLICKED} from './constants';
    
import { actionTypes } from 'react-redux-firebase'



const itemsPerPage = 3;

const initialState = fromJS({

  
    currentTab:"",
    currentPage:1,
    currentView:[],
    library:[],
    borrowed:[],
    orders:[],
    error:"",
    
});

export default function userProfileReducer(state = initialState, action){


    switch (action.type){

        case NEW_TAB_CLICKED:

            return state
                    .set("currentTab",action.tab);

        case NEW_PAGE_CLICKED:

            const newPage = action.page;

            const fullInventory = state.get(state.get("currentTab"));

            //Splicing.
            const endingIndex = newPage * itemsPerPage;
            var i = endingIndex - itemsPerPage;
            var spliced = [];

            while (i < endingIndex){
                spliced.push(fullInventory[i]);
            }

            return state
                .set("currentView", spliced)
                .set("currentPage",newPage);
                        
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




