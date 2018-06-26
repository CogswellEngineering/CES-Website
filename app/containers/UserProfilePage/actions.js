import { LOAD_PROFILE, LOADED_PROFILE,LOADED_PROFILE_FAIL, FOUND_OWNER_STATUS,
} from './constants';

//Changing it to addition, it will only pull singles at time
//then just copies and appends it. Which might be more or less faster?
//Only getting one from thing, but then also have to copy.


export function foundOwnerStatus(doesOwn){

    return {
        type: FOUND_OWNER_STATUS,
        doesOwn,
    };

}

export function loadProfile(uid){

    console.log("here?");
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


