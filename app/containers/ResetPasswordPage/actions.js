import { CHECK_TOKEN, TOKEN_CHECKED, RESET_TOKEN_USED, CHANGE_PASSWORD, PASSWORD_CHANGED} from './constants';

export function checkToken(token){

    return {

        type:CHECK_TOKEN,
        token,
    }
}

export function tokenChecked(expired){

    console
    return {

        type:TOKEN_CHECKED,
        expired
    }
}

export function resetTokenUsed(token){

    return {
        type:RESET_TOKEN_USED,
        token,
    };
}

export function changePassword(formData){

    return {
        type: CHANGE_PASSWORD,
        formData,
    };
}

export function passwordChanged(){
    
    return {
        type: PASSWORD_CHANGED,
    };
}