import { createSelector } from 'reselect';
import { USER_PROFILE_PATH } from 'components/Header/pages';
const profileState = (state) => state.get(USER_PROFILE_PATH);



//Will move this to FormSelectors later
//after rename it.
//May actually separate these later, incase need to make specifications
//selection, but for now this is fine.
export const makeSelectCollection = (collectionName) => createSelector(

    profileState,
    (profileState) => {

        if (profileState == null) return [];

        return profileState.get(collectionName);
    });

export const makeSelectNeedReload = () => createSelector(

    profileState,
    (profileState) => {
        if (profileState == null) return null;

        return profileState.get("needReload");
    }
    
)

export const makeSelectProfile = () => createSelector(

    profileState,
    (profileState) => {
        if (profileState == null) 
            return null;
        else{
            console.log("Selected profile",profileState.get("profile"));
            return profileState.get("profile");
        }
    }

)
    
//Was being stubborn, it's an api call, should've been sagas from the gate.
/*
export const makeSelectProfile = () => createSelector(

     (state) => state.get("firebase"),
     (state,props) => props.match.params.uid,
    // (state,props) => {/*Right,, it's props of global, not just thisconsole.log(props); return props.firebase},
    (fireBaseState,uid) => {

        //So firebase not in these, props
        const loggedIn_uid = fireBaseState.auth.uid;
        //If same as logged in, just return that profile.
        if (uid == loggedIn_uid){
        console.log("hello");
        console.log(fireBaseState.profile);
            return fireBaseState.profile.profile;
        }
        else{
            //Otherwise load in profile from fire store.
        const fireStoreRef = firebase.firestore();

            const docRef = fireStoreRef.collection("users").doc(uid);


            //Makes sense as selector, in my head, but chanc
            var profileToReturn = null;
            docRef.get()
                .then(snapshot => {
                    //This isn't working out too well, lol, hmm selector not best choice? lol end of day I could just throw this in componentdidMount
                    //and call it. Yeah.. no This is bound to break due to repeated calls. Reviwewd / Learned from it so not compelte waste of time
                    //but pretty big waste lol.
                    if (snapshot.exists){
                        console.log("here");
                        const profile = snapshot.get("profile");
                        console.log("Profile loaded", profile);
                        if (profile != null){
                            profileToReturn =  profile;
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                    return null;
                });

                return profileToReturn;

        }

    }   
)
*/