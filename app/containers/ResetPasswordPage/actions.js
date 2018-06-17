import { CHECK_TOKEN, RESET_TOKEN_USED, CHANGE_PASSWORD, PASSWORD_CHANGED} from './constants';

export function checkToken(token){

    return {

        type:CHECK_TOKEN,
        token,
    }
}

export function tokenChecked(expired){

    return {

        type:CHECK_TOKEN,
        expired
    }
}

export function resetTokenUsed(token){

    return {
        type:RESET_TOKEN_USED,
        token,
    };
}

export function changePassword(newPassword,token){

    return {
        type: CHANGE_PASSWORD,
        password:newPassword,
        token,
    };
}

export function passwordChanged(){
    
    return {
        type: PASSWORD_CHANGED,
    };
}