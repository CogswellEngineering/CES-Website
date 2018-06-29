import {put, call, takeLatest} from 'redux-saga/effects';
import firebase from 'firebase';
import { ADD_POST_CLICKED } from './constants';
import { posting, posted, postFailed, } from './actions';


//This saga will really only handle posting to blogs
//there will be listener set up on componentwillMount to handle reloading.

//future reference though it is action made, industry clls them payloads, prob change that in future
//not changing in this though, too tedious.
function* postNewBlog(action){


    console.log("new post to add,",action);
    console.log("firebase",firebase);
    const fireStoreRef = firebase.firestore();
    console.log("firestore ref",fireStoreRef);

    const post = action.post;
    const author = {
        uid:firebase.auth().currentUser.uid,
        name:firebase.auth().currentUser.displayName,
    }

    post.author = author;

    //Or should posts be in users? Author will be repeated info cause of uid.
    //Makes the request to get them all a bit execessive though, this is fine.
    const blogsRef = fireStoreRef.collection("Blog").doc();
    
    yield put(posting());
    
    try{

        //Do I want to include post history in profile? Nevermind, it's fine because their queries are optimized
        //so I can just use .where for that, even if they make it public, it's just as easy.     
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