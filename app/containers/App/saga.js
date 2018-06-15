

import {LOGIN,LOGOUT} from 'containers/UserActions/constants';
import { call, put, takeLatest } from 'redux-saga/effects';
import fire from 'utils/fire'
import { firestore } from 'firebase';
//Before I login via fire auth, need to decide where storing firebase reference and set up the binding
//so that they are synced. Well for logging in and out, that state change for both sources is only happening here
//so will worry bout binding db to store later(Shouldn't be too hard).

function* login(action){
 
    
    
    const authRef = fire.auth();
   // const dbRef = fire.database();
    
    authRef.signInWithEmailAndPassword(action.email,action.password)
        .then(user => {

            console.log(login);

        })
        .catch(err => {
            console.log(err);
        })
    //This will fix the refresh logging out issue, but not stepping on fine line, because now theirs the store
    //and there's the cache, granted the cache only updates the store, everything looks at the store still
    //not the cache directly, so not huge break in design.. but yeah.
    localStorage.setItem("CES_User",action.loggedInUser);
}

function* logout(){

    localStorage.removeItem("CES_User");
}


function* checkUserActions(){

    yield takeLatest(LOGOUT, logout);
    yield takeLatest(LOGIN,login);

}


export default  checkUserActions;