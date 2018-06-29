import { REGISTER_CLICKED ,REGISTERING, REGISTERED, REGISTER_FAILED} from './constants'


export function registering(){

    return {
        type:REGISTERING,
    };
}
export function onRegisterClicked(credentials){

    return {
        type:REGISTER_CLICKED,
        credentials
    };
}


export function onRegistered(credentials){

    //Completing registration, give back credentials
    return {
        type:REGISTERED,
        credentials
    };
}

export function onRegisterFail(error){

    //Completing registration, give back credentials
    return {
        type:REGISTER_FAILED,
        error,
    };
}