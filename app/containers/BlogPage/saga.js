import {put, call, takeLatest} from 'redux-saga/effects';
import firebase from 'firebase';
import { ADD_POST_CLICKED } from './constants';
import { posting, posted, postFailed, } from './actions';

function* postNewBlog(action){


    const fireStoreRef = firebase.firestore();

    const post = action.post;
    
    //Gets logged in information to create author, hindsight could've done this in calling the call back
    //instead of here.
    const author = {
        uid:firebase.auth().currentUser.uid,
        name:firebase.auth().currentUser.displayName,
    };



    post.author = author;

    //Or should posts be in users? Author will be repeated info cause of uid.
    //Makes the request to get them all a bit execessive though, this is fine.
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