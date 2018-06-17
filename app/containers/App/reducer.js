

import { fromJS } from 'immutable';
import { actionTypes } from 'react-redux-firebase'



//Where do i get global state with the router?
//Will add more as needed
const initialState = fromJS({
    loggedIn:false,
});

export default function appReducer(state = initialState, action){


    switch (action.type){

        case actionTypes.LOGIN:
            
            //If logged in, then push onto history to go either home or where they came from, just home for now.

            return state

        case actionTypes.LOGOUT:
            //Then logout 
            console.log("Logged out via firebase-redux-react");  
            return state
        default:
            return state 
    }
}