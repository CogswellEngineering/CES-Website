import {

    POST_NEWS,
    POST_EVENT
} from './constants';


function postNews(post, author){


    return {

        type:POST_NEWS,
        post,
        author,
    };
}

function postEvent(post){

    return {

        type:POST_EVENT,
        post,
    };
}

export{

    postNews,
    postEvent,
}
