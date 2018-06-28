import {
    PAGE_TURNED,
    LOAD_POSTS,
    LOADING_POSTS,
    LOADED_POSTS,
    MODIFICATIONS_MADE,
    ADD_POST_CLICKED,
    POSTING,
    POSTED,
    POST_FAILED,
    POST_FIELD_CHANGED,

} from './constants';


function pageTurned(page){

    return {
        type:PAGE_TURNED,
        page,
    };
}

//Loading in posts actions.

function loadPosts(){
    
    return {
        type:LOAD_POSTS,
    };
}

function loadingPosts(){
    
    return {
        type:LOADING_POSTS,
    };
}

function loadedPosts(posts){

    return{
        type:LOADED_POSTS,
        posts,
    };
}

function modificationsMade(posts){
    return {
        type:MODIFICATIONS_MADE,
        posts,
    };
}

//Adding in posts actions

function addPostClicked(post){

    return {
        type:ADD_POST_CLICKED,
        post,

    };
}

function postFieldChanged(fieldName,value){

    return{
        type: POST_FIELD_CHANGED,
        fieldName,
        value,
    };
}

function posting(){
    
    return {
        type:POSTING,
    };
}

function posted(){
    
    return {
        type:POSTED,
    };
}

function postFailed(err){
    
    return {
        type:POST_FAILED,
    };
}

export {

    pageTurned,
    loadPosts,
    loadingPosts,
    loadedPosts,
    modificationsMade,
    addPostClicked,

    //These will be dispatched by saga, I'll start documenting these too, for clarity sake, when
    //eventually I'll have someone other than me work on this site.
    posting,
    posted,
    postFailed,
    postFieldChanged,

};

