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


    yield put(postUpdated(post.doc()));
}