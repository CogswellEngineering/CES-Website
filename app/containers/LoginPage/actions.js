import {LOGIN_PRESSED,REQUIRE_VERIFICATION} from './constants';


export function loginPressed(email,password){

    return {
        type:LOGIN_PRESSED,
        email:email,
        password:password
    };
}

export function requireVerification(){

    //Literally only this info is needed, feels like waste when can just return but for neatnes sake
    return {
        type:REQUIRE_VERIFICATION
    }
}