import {LOGOUT} from './constants';


export function logout(){

    return {
        type : LOGOUT
    }
}
//ToAdd: Add enteredProfile actionCreator here, and that one will need
//saga that will make call to get all the information in profile for user.
