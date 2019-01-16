import { LOAD_PROFILE, LOADED_PROFILE,LOADED_PROFILE_FAIL
} from './constants';



export function loadProfile(uid){

    return {
        type: LOAD_PROFILE,
        uid,
    }
}

export function failedToLoadProfile(){
    return {
        type: LOADED_PROFILE_FAIL,
    };
}

export function loadedProfile(profile){

    return {
        type:LOADED_PROFILE,
        profile,
    };
}


