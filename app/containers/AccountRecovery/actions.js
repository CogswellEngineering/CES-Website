import { ATTEMPT_RECOVER , RECOVERED_ACCOUNT, RECOVER_LINK_SENT} from './constants';





//Will send an action saga will be listening for, then send recovery link to email.
export function attemptRecover(email){

    return {
        type: ATTEMPT_RECOVER,
        email,
    };

}

export function recoverLinkSent(email){

    return {
        type: RECOVER_LINK_SENT,
        email,
    }
}

//Just to pass new state to props to inform user that has been reset.
export function recoveredAccount(){

    return {

        type : RECOVERED_ACCOUNT,
    };
}