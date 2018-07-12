import {put, call, takeLatest} from 'redux-saga/effects';
import firebase from 'firebase';
import { ADD_POST_CLICKED } from './constants';
import { posting, posted, postFailed, } from './actions';

function* postNewBlog(action){


    const fireStoreRef = firebase.firestore();

    const post = action.post;
    
    //Gets logged in information to create author, hindsight could've done this in calling the call back
    //instead of here, but I it's the same firebase instance and need for other use here anyway.
    const author = {
        uid:firebase.auth().currentUser.uid,
        name:firebase.auth().currentUser.displayName,
    };



    post.author = author;

    const blogsRef = fireStoreRef.collection("Blog").doc();
    
    yield put(posting());
    
    try{

        yield blogsRef.set(post);
        yield put(posted());
    }
    catch (err){

        console.log("err",err);
        yield put(postFailed("Failed to upload post, please try again later."));
    }


}



function* blogPostWatcher(){
    
    yield takeLatest(ADD_POST_CLICKED,postNewBlog);

}

export default blogPostWatcher;