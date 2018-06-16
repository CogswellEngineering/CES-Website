
import {LOGGED_OUT} from 'containers/UserActions/constants';
import {LOGIN_PRESSED} from 'containers/LoginPage/constants';
import {loggedIn} from './actions';
import {requireVerification} from 'containers/LoginPage/actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import fire from 'utils/fire'
import { firestore } from 'firebase';
//Before I login via fire auth, need to decide where storing firebase reference and set up the binding
//so that they are synced. Well for logging in and out, that state change for both sources is only happening here
//so will worry bout binding db to store later(Shouldn't be too hard).

function* login(action){
 
    
    
    const authRef = fire.auth();
   // const dbRef = fire.database();
    
   //Hmm, need to think of different way for this,
    yield authRef.signInWithEmailAndPassword(action.email,action.password)
        .then(user => {

            console.log(login);
            if (user.isVerified){
                 put(loggedIn(user));
            }
            else{
                 put(requireVerification());
            }
        })
        .catch(err => {
            console.log(err);
            //Otherwise will put another action here, that will be dealt later.
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

    yield takeLatest(LOGGED_OUT, logout);
    yield takeLatest(LOGIN_PRESSED,login);

}


export default  checkUserActions;