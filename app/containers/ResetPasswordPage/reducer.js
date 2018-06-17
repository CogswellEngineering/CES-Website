import { PASSWORD_CHANGED, TOKEN_CHECKED } from './constants';
import { FIELD_CHANGED } from 'containers/App/constants';
import { fromJS} from 'immutable';


const initialState = fromJS({
    tokenExpired:null,
    tokenChecked:false,
    passwordChanged:false,
    password: "",
    retypedPassword: "",
    error: "",
});



export default function  resetPWReducer(state = initialState, action){

    switch (action.type){

        case TOKEN_CHECKED:
            return state
                .set("tokenChecked",true);
                .set("tokenExpired",action.expired);

        case PASSWORD_CHANGED:
            return state
                .set("passwordChanged",true);


        case FIELD_CHANGED:
            return state
                .set(action.fieldName,action.value)
                .set("error","");
        default:
            return state;


    }

}