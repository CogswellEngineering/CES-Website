import React, {Component} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import saga from './saga';
import reducer from './reducer';
import {
    SPECIFIC_POST,
} from 'components/Header/pages';

import {

    loadPost,
    //When they enter.
    addView,
    commentPosted,
    //This will be when they leave,
    addLike,

} from './actions';

class NewsPost extends Component{


    constructor(props){

        super(props);
    }


    render(){


    }
}


//Prob COULD just make selector. to avoid implementing should component update.
//also since passing in an arry might be good. But no real SELECTING happening is thing.
//Well COULD just store post in state
//then select view count and like count from it.
//Also is storing likes like this fine?
//How will adding like work?
//actually just update the field lmao.
//I'm retarded.
//Also only need to update it when they leave
//otherwise alot of calls to db from people liking and unliking it.
const mapStateToProps = (state) => {

    if (state==null) return null;

    const newsPostState = state.get(SPECIFIC_POST);

    if (newsPostState == null) return null;


    return {

        post: newsPostState.get("postInfo"),
        comments: newsPostState.get("comments"),
        //Will have buffer  for this
        likeCount: newsPostState.get("likeCount"),
        viewCount: newsPostState.get("viewCount"),
    };
}

const mapDispatchToProps = dispatch => {


    return {

        
        loadPost: (postUid) => {

            return dispatch(loadPost(postUid));
        },

        addView: () => {

            return dispatch(addView());
        },

        commentPosted: (comment) => {

            return dispatch(commentPosted(comment));
        },

        addLike: () => {

            return dispatch(addLike());
        },
    };
}


const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({key: SPECIFIC_POST, reducer});
const withSaga = injectSaga({key: SPECIFIC_POST, saga});

export default compose{

    withConnect,
    withReducer,
    withSaga
}(NewsPost);


