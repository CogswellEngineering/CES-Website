


const prefix = 'ces/UserProfilePage/';
export const LOAD_PROFILE = prefix+'LOAD_PROFILE';
export const LOADED_PROFILE = prefix+'LOADED_PROFILE';
export const LOADED_PROFILE_FAIL = prefix+'LOADED_PROFILE_FAIL';


//Maybe just loaded, and in load profile after I dispatch the load, in same saga will do it
//since at start is still something I want to do, and on reload.
//Action for pulling all events the user has hosted. I'll maybe add
//all events the user has attended too, but likely just hosted.
export const LOAD_EVENTS = prefix + "LOAD_EVENTS";
export const LOADED_EVENTS = prefix+'LOADED_EVENTS';

//Load news posted by this user.
export const LOAD_NEWS = prefix + "LOAD_NEWS";
export const LOADED_NEWS = prefix+'LOADED_NEWS';


