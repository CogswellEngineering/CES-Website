
import {LOGGED_OUT} from 'containers/UserActions/constants';
import {LOGGED_IN} from './constants';
import { fromJS } from 'immutable';



//Will add more as needed
const initialState = fromJS({
    loggedInUser : localStorage.getItem("CES_User")
});

export default function appReducer(state = initialState, action){

    switch (action.type){

        case LOGGED_IN:
            return state
                .set('loggedInUser',action.loggedInUser);

        case LOGGED_OUT:
            //Then logout
            console.log("logging out");
            return state
                .set('loggedInUser', false);
        default:
            return state 
    }
}