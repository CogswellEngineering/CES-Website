 import {
    ADD_VIEW,
    //Relevant? good for stat analysis, low prio. views are good enough for stat anal.
    ADD_LIKE,
    LOAD_POST,
    POST_UPDATED,
    LOAD_FAILED,
    COMMENT_POSTED,
    COMMENTS_UPDATED,
} from './constants';


export function loadPost(postUid){

    return {

        type:LOAD_POST,
        postUid,
    };
}

export function loadFailed(reason){


    return {

        type: LOAD_FAILED,
        reason
    };
}

export function postUpdated(post){

    console.log("at update action post ", post);
    return {
        
        type: POST_UPDATED,
        post,
    };
}

//Now essentially how I ahve it planned atm
//Every time user posts reply, it updates current replies with loaded replies
//tht will add other replies, that's weird behaviour
//So will post it into database via this action.
export function commentPosted(comment){

    return {

        type: COMMENT_POSTED,
        comment,
    };
}



//Then apart from initial post after load
//this is called after reply posted, passing in current concatenated with reply.
//Unless I make it so replies are loaded in real time, which I COULD ALSO DO.
export function updatedComments(comments){

    return {

        type: COMMENTS_UPDATED,
        comments,
    };
}

//To keep everything in sync, adding to view will be re-reading the view count from firestore at that point
//then updating it
export function addView(uid){

    return {
        type:ADD_VIEW,
        uid,
    };
}

//Same case here, except maybe pass in the user that liked it?
export function addLike(){

    return {
        type:ADD_LIKE,
    }
}
