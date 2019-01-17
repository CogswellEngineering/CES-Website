import { put, call, takeLatest } from 'redux-saga/effects'
import firebase from 'firebase';
import { LOAD_PROFILE } from './constants'
import { failedToLoadProfile, loadedProfile, loadedEvents, loadedNews, } from './actions';

function* loadProfileCall(action){


     //Otherwise load in profile from fire store.
     const firestore = firebase.firestore();
     

     const docRef = firestore.collection("users").doc(action.uid);
     try{


        const snapshot = yield (docRef.get());

        if (snapshot.exists){


            //Contemplated just putting all in profile, but if want only credits, don't want to pull all that extra info.
            const userInfo = snapshot.data();
            
            //Adding uid, for checking if same when clicked to skip reloading.
            userInfo.uid = action.uid;
           
            yield put(loadedProfile(userInfo));

            //Then after set the profile, pull users activity.

            //Pulling events hosted by user.
            const clubInfoRef = firestore.collection("ClubInfo");

            const eventCardsRef = clubInfoRef.doc("Events").collection("EventCards");
            const hostQuery = eventCardsRef.where("host.uid","==", action.uid);

            const eventsSnapshot = yield hostQuery.get();

            const events = [];

            eventsSnapshot.docs.forEach( docSnapshot => {

                //In this case since I'm only user it should show all events.
                if (docSnapshot.exists){

                    const event = docSnapshot.data();

                    event.startDate = event.startDate.toDate();
                    event.endDate = event.endDate.toDate();
                    console.log("event", event);
                    events.push(event);
                }
            });

            yield put(loadedEvents(events));
            

            
            //Pulling news posted by user.

            const newsCardsRef = clubInfoRef.doc("News").collection("NewsCards");
            const postedNewsQuery = newsCardsRef.where("author.uid", "==", action.uid);
            
            const newsCards = [];

            const newsCardsSnapshot = yield postedNewsQuery.get();

            newsCardsSnapshot.docs.forEach( docSnapshot => {


                if (docSnapshot.exists){

                    const newsCard = docSnapshot.data();

                    newsCard.postDate = newsCard.postDate.toDate();

                    console.log("newsCard", newsCard);

                    newsCards.push(newsCards);
                }

            });

            yield put(loadedNews(newsCards));

        }
        else{
            yield put(failedToLoadProfile());
        }
    }
    catch(err){
        console.log(err);
            yield put(failedToLoadProfile());
    }

}


function* checkProfile(){

    yield takeLatest(LOAD_PROFILE,loadProfileCall);

}

export default checkProfile;