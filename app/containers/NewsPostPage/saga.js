import {takeLatest, takeEvery, put} from 'redux-saga/effects';
import firebase from 'firebase';
import{


    LOAD_POST,
    COMMENT_POSTED,
    ADD_VIEW,
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

        const postData = post.data();
        postData.postInfo.postDate = postData.postInfo.postDate.toDate();

        //Load post.
        yield put(postUpdated(postData));


        //Then move on to loading comments, lower load priority.
        const commentsRef = postRef.collection("Comments");

        const snapshot = yield commentsRef.orderBy("postDate","desc").get();
        if (!snapshot.empty){

      
            const comments = [];

            snapshot.docs.forEach( doc => {

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

    //So only adding onto collection, but not retrieving it, just building ontop of current collection pulled.
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


    //UX wise, only post what you added, along with what you had.
    //Instead of refreshing all comments.
    //Only problem is it won't be in same position as you'd think on refresh, but that is fine.
    const commentsToShow = [newCommentObj].concat(currentCommentLoad);

    
    yield put(updatedComments(commentsToShow));
}


//Prob also add view for event page.

function* addView(payload){


    const firestore = firebase.firestore();

    const postRef = firestore.collection("ClubInfo").doc("News").collection("NewsPosts").doc(payload.uid);

    firestore.runTransaction( transaction => {

        return transaction.get(postRef).then(postDoc => {

            if (postDoc.exists){

                const newViewCount = postDoc.data().viewCount + 1;

                transaction.update(postRef,{viewCount: newViewCount});
                return newViewCount;

            }
            else{
                throw "Could not find post with uid:" + payload.uid;
            }

        });

    })
    .then (newViewCount => {

        console.log("New View Count is " + newViewCount);
    })
    .catch(err => {

        console.log(err);
    })
}


export default function* saga(){

    yield takeEvery(LOAD_POST, loadPostSaga);
    yield takeEvery(ADD_VIEW, addView);
    yield takeLatest(COMMENT_POSTED, postCommentSaga);
}
