import { fromJS } from 'immutable'
import { actionTypes } from 'react-redux-firebase'

const initialState = fromJS({
    doneLoadingCache: false,
});


export default function userActionReducer(state = initialState, action){

    switch (action.type){

        //Letting fall through happen, don't need breaks in all other reducers cause returning from function.
        case actionTypes.LOGIN:

        case actionTypes.AUTH_EMPTY_CHANGE:

            return state
                .set("doneLoadingCache",true);
            

        default:
            return state;

    }
}