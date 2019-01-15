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
        //So has data here.

        const postData = post.data();
        postData.postInfo.postDate = postData.postInfo.postDate.toDate();

        yield put(postUpdated(postData));

        const commentsRef = postRef.collection("Comments");

        const snapshot = yield commentsRef.orderBy("postDate","desc").get();
        if (!snapshot.empty){

            //Sending just docs directly is fine, then dereferencing to get data
            //just gotta keep in mind. Hmm, actually idk lol
            //Nvm will iterate to get comments, might take little longer but that versus
            //constant overhead of dereferencing to get data. But less flexibility as well
            //incase replies to comments become a thing, but prob not.
            const comments = [];

            snapshot.docs.forEach( doc => {

                console.log ("doc", doc);
                if (doc.exists){
                    const data = doc.data();
                    data.postDate = data.postDate.toDate();
                    comments.push(data);
                }
            });

            console.log("comments ", comments);

            yield put(updatedComments(comments));
        }
    }
}

function* postCommentSaga(payload){


    console.log("I made it to saga", payload.comment);
    const {commenter, comment, postUid, currentCommentLoad} = payload.comment;

    const {name, uid} = commenter;

    const firestore = firebase.firestore();

    //Only thing don't like about this is I have to load in everything else just to concat comments...
    //Fuck it no, collection afterall.
    const postRef = firestore.collection("ClubInfo").doc("News").collection("NewsPosts").doc(postUid);

    const commentsRef = postRef.collection("Comments");

    const newCommentRef = commentsRef.doc();

    const newCommentObj = {

        poster:commenter,
        postDate: new Date(),
        content: comment
    };

    newCommentRef.set(newCommentObj)
        .then (res => {

            console.log("Comment posted");
        })
        .catch (err => {

            console.log("Failed to post comment", err);
        })


    //Easy to change to show all comments if need be, but unlikely.
    const commentsToShow = [newCommentObj].concat(currentCommentLoad);

    
    yield put(updatedComments(commentsToShow));
}


export default function* saga(){

    yield takeLatest(LOAD_POST, loadPostSaga);
    yield takeLatest(COMMENT_POSTED, postCommentSaga);
}
