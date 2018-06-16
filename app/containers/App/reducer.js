

import { fromJS } from 'immutable';
import { actionTypes } from 'react-redux-firebase'



//Will add more as needed
const initialState = fromJS({
    //loggedInUser : localStorage.getItem("CES_User")
    //Not even needed anymore, especially since firebase caches it themselves.
});

export default function appReducer(state = initialState, action){

    switch (action.type){

        case actionTypes.LOGIN:
        console.log("logged in")
      
            return state

        case actionTypes.LOGOUT:
            //Then logout 
            console.log("Logged out via firebase-redux-react");  
            return state
        default:
            return state 
    }
}