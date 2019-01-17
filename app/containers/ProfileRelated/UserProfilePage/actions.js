import { LOAD_PROFILE, LOADED_PROFILE,LOADED_PROFILE_FAIL, LOADED_EVENTS, LOADED_NEWS
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

export function loadedEvents(events){

    return {

        type: LOADED_EVENTS,
        events
    };
}

export function loadedNews(news){

    return {

        type: LOADED_NEWS,
        news
    };
}

