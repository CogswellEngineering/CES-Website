import {

    POST_NEWS,
    POST_EVENT
} from './constants';


function postNews(post){


    return {

        type:POST_NEWS,
        post,
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
