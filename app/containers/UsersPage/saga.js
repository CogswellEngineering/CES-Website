//Really Could do like did events and news posts.
import {takeLatest, put} from 'redux-saga/effects';
import firebase from 'firebase';
import {LOAD_USERS} from './constants';
import {loadedUsers} from './actions';

function* loadUsers(){



    const firestore = firebase.firestore();
    const userCollRef = firestore.collection("users");

    const users = [];

    //Maybe query based on current filter if exists?
    //Like if passed ind irectly? nah I should always get all then filter via selection.
    //that way less calls to server
    const docsSnapshot = yield userCollRef.get();

    docsSnapshot.docs.forEach(docSnapshot => {


        if (docSnapshot.exists){

            const user = docSnapshot.data();
            users.push(user);
        }

    });

    yield put(loadedUsers(users));



}

export default function* saga(){

    yield takeLatest(LOAD_USERS, loadUsers);
}