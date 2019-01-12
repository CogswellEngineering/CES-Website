import {
    LOAD_MORE,
    LOAD_POSTS,
    LOADING_POSTS,
    LOADED_POSTS,
    MODIFICATIONS_MADE,
} from './constants';



function loadMore(amountToLoad){

    return {
        type: LOAD_MORE,
        amountToLoad,
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



export {

    loadMore,
    loadPosts,
    loadingPosts,
    loadedPosts,
    modificationsMade,
};

