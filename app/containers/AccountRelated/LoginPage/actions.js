import { GENERATE_AUTH_TOKEN, GENERATED_AUTH_TOKEN} from './constants';





function generateAuthToken(uid){

    return {

        type : GENERATE_AUTH_TOKEN,
        uid,

    };

}

//This basically means, I should probably re-add react-redux-firebase to PRinting service...
//Jumped the gun getting rid of it all before even tested. Would be easier for something to keep track of it, also
//by logging in there, and then logging out. Okay tokens only last an hour.. Which is fine if stayed logged in.
//but if they go back to it will it log out cause token gone? I guess I'd just have to check if not logged in, then 
//check cookies for it.
function generatedAuthToken(token){

    return {

        type: GENERATED_AUTH_TOKEN,
        token,
    }
}

export{

    generateAuthToken,
    generatedAuthToken,

}