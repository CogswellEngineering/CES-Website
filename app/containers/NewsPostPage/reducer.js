import {fromJS} from 'immutable';

import {

    POST_UPDATED,
    LOAD_FAILED,
    COMMENTS_UPDATED,

} from './constants';


const initialState = fromJS({

    postInfo: null,
    loadFailed:null,
    comments: [],
    viewCount: 0,
    likeCount: 0,
});

export default function reducer(state = initialState, action){


    switch (action.type){


        //Don't think neccessarry to have a load failed action?
        //maybe is to be more specific then page not found though
        //also more clarity.
        case POST_UPDATED:

            const {postInfo, viewCount, likeCount} = action.post;

            //fuck keep forgetting this lmao.
            return state
                .set("postInfo", postInfo)
                .set("viewCount", viewCount)
                .set("likeCount", likeCount);

        //For uploading view when current user adds a comment.
        case COMMENTS_UPDATED:

            return state
                .set("coments", action.comments);

        case LOAD_FAILED:

            return state
                .set("loadFailed", action.reason);

        default:
            return state;
    }


}