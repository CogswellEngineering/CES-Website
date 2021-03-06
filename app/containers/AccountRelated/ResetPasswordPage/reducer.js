import { PASSWORD_CHANGED, TOKEN_CHECKED, RESET_TOKEN_USED } from './constants';
import { FIELD_CHANGED } from 'containers/App/constants';
import { fromJS} from 'immutable';


const initialState = fromJS({
    
    expiredThisSession:false,
    tokenExpired:null,
    tokenChecked:false,
    passwordChanged:false,
    error: "",
});



export default function  resetPWReducer(state = initialState, action){

    switch (action.type){

        case TOKEN_CHECKED:
            return state
                .set("tokenChecked",true)
                .set("tokenExpired",action.expired);

        case RESET_TOKEN_USED:

            return state
                .set("expiredThisSession",true)
                .set("tokenExpired",true);


        case PASSWORD_CHANGED:
            return state
                .set("passwordChanged",true);

        default:
            return state;


    }

}