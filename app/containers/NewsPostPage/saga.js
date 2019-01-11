import {takeLatest, put} from 'redux-saga/effects';
import firebase from 'firebase';
import{


    LOAD_POST,
    COMMENT_POSTED,
} from './constants';

import {


    postUpdated,
    updatedComments,
    loadFailed,

} from './actions';


function* loadPostSaga(payload){


    const {postUid} = payload;

    const firestore = firebase.firestore();

    const postRef = firestore.collection("ClubInfo").doc("News").collection("NewsPosts").doc(postUid);

    const post = yield postRef.get();


    //There could be other errors like beign offline, etc. so this just makes it more flexible adn not hacky solution.
    if (!post.exists){

        yield put(loadFailed({notFound:true}));
    }
    else{

        yield put(postUpdated(post.doc()));

        const commentsRef = postRef.collection("Comments");

        const snapshot = yield commentsRef.get();

        if (!snapshot.empty){

            //Sending just docs directly is fine, then dereferencing to get data
            //just gotta keep in mind. Hmm, actually idk lol
            //Nvm will iterate to get comments, might take little longer but that versus
            //constant overhead of dereferencing to get data. But less flexibility as well
            //incase replies to comments become a thing, but prob not.
            const comments = [];

            snapshot.docs.forEach( doc => {

                comments.push(doc.data());
            })

            yield put(updatedComments(comments));
        }
    }
}

function* postCommentSaga(payload){

    const {commenter, comment, postUid, currentCommentLoad} = payload;

    const {name, uid} = commenter;

    const firestore = firebase.firestore();

    //Only thing don't like about this is I have to load in everything else just to concat comments...
    //Fuck it no, collection afterall.
    const postRef = firestore.collection("ClubInfo").doc("News").collection("NewsPosts").doc(postUid);

    const commentsRef = postRef.collection("Comments");

    const newCommentRef = commentsRef.doc();

    const newCommentObj = {

        poster:{
            name,
            uid
        },
        content: comment
    };

    //Yield NOT really needed here? honestly.
    /*yield*/newCommentRef.set(newCommentObj);


    //Easy to change to show all comments if need be, but unlikely.
    const commentsToShow = currentCommentLoad.concat(newCommentObj);

    yield put(updatedComments(commentsToShow));
}


export default function* saga(){

    yield takeLatest(LOAD_POST, loadPostSaga);
    yield takeLatest(COMMENT_POSTED, postCommentSaga);
}
