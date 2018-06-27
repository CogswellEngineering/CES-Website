import { UPDATE_CLICKED ,UPDATING, UPDATED, UPDATE_FAILED, UPDATE_CANCELLED, PROFILE_PICTURE_UPLOADED,
PAGE_LOADED, } from './constants'



export function pageLoaded(loggedInProfile){

    return {
        type: PAGE_LOADED,
        loggedInProfile,
    };
}

export function profilePictureUploaded(image){

    return {
        type: PROFILE_PICTURE_UPLOADED,
        image,
    };


}

export function updating(){

    return {
        type:UPDATING,
    };
}


export function onUpdateClicked(uid,profilePicture,update){

    return {
        type:UPDATE_CLICKED,
        profilePicture,
        uid,
        update,
    };
}

export function onUpdateCancelled(){
    
    return {
        type: UPDATE_CANCELLED,
    };
}


export function onUpdated(){

    //Completing registration, give back credentials
    return {
        type:UPDATED,
    };
}

export function onUpdateFail(error){

    //Completing registration, give back credentials
    return {
        type:UPDATE_FAILED,
        error,
    };
}