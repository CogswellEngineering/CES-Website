import { LOAD_PROFILE, LOADED_PROFILE,LOADED_PROFILE_FAIL, LIBRARY_UPDATED, BORROWED_UPDATED, ORDERS_UPDATED} from './constants';

//Changing it to addition, it will only pull singles at time
//then just copies and appends it. Which might be more or less faster?
//Only getting one from thing, but then also have to copy.


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

export function libraryUpdated(library){

    return {
        type: LIBRARY_UPDATED,
        library,
    };

}

export function borrowedUpdated(borrowed){

    return {
        type: BORROWED_UPDATED,
        borrowed,
    };
}

export function ordersUpdated(orders){

    return {
        type: ORDERS_UPDATED,
        orders,
    };
}
