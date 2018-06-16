



import {FIELD_CHANGED} from 'containers/App/constants';
import { fromJS } from 'immutable';
import { actionTypes } from 'react-redux-firebase'


//Will add more as needed
const initialState = fromJS({
    email : "",
    password:"",
    error:""
    
});


export default function loginReducer(state = initialState, action){
    console.log(state);

    switch (action.type){

        case actionTypes.LOGIN:
            //State sent in when this type is matched will be the firebase
              //Nope still same state, they probably did that on purpose, I could just not ask for verification, lol.
        //Might deter people.
        console.log("Logged in action",action);
            if (!action.auth.emailVerified){
                return state
                    .set("error",'Email not verified');
            }
            else{
                return state
                    .set("error","");
            }
        case actionTypes.LOGIN_ERROR:
            //Why is this always happening, but right before it working?
            if (action.authError != null){
                return state
                    .set("error","Email or password is incorrect");
            }
            else{
                return state
            }
        case FIELD_CHANGED:
            return state
                .set(action.fieldName,action.value)
                .set("error","");
        default:
            return state;
    }
}