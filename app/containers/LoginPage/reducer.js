



import {LOGOUT,LOGIN} from 'containers/UserActions/constants';
import { fromJS } from 'immutable';



//Will add more as needed
const initialState = fromJS({
    email : "",
    password:"",
});

export default function appReducer(state = initialState, action){



}