import {LOGGED_OUT} from './constants';


export function logout(){

    return {
        type : LOGGED_OUT
    }
}
//ToAdd: Add enteredProfile actionCreator here, and that one will need
//saga that will make call to get all the information in profile for user.
