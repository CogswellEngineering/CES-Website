import { fromJS } from 'immutable'
import { actionTypes } from 'react-redux-firebase'

const initialState = fromJS({
});


export default function userActionReducer(state = initialState, action){

    switch (action.type){
        default:
            return state;

    }
}