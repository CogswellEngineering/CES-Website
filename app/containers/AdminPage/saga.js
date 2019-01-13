import {takeLatest, call,put } from 'redux-saga/effects';
import firebase from 'firebase';

//Url to backend, prob rename this to ces back end too. kinda saying alot in it lmao
import { fbAdminAPI } from 'utils/apiLinks';
import request from 'utils/request';

import{

    POST_NEWS,
    POST_EVENT
} from './constants';


function* postEvent(payload){


    const {post} = payload;
    const firestore = firebase.firestore();

    const eventsRef = firestore.collection("ClubInfo").doc("Events");

    const eventCard = eventsRef.collection("EventCards").doc();
    const eventItem = eventsRef.collection("EventList").doc();
    const newTag = firestore.collection("Tags").doc();

    //Maybe add date and location to card, but I'll decide that later.
    //Wait...There are no event cards. wait.. Yes there are. When I click the event on calendar it opens it as modal
    //I need to list view or grid view o display them as actual cards too, actually I DO NEED date for that 
    //Wait I'm dumb need to upload thumbnail to storage then get download url.

    const {thumbnail} = post;

    const storageRef = firebase.storage().ref("EventThumbnails/"+thumbnail.name);
    storageRef.put(thumbnail)
        .then (snapshot => {

            console.log("storageRef", storageRef);

            storageRef.getDownloadURL()
                .then (url => {


                    console.log("post", post);
                    console.log("post title", post.title);
                    const {title, type, description, tags, startDate, endDate, gallery, agenda } = post;
                    
                    console.log("get to here?");
                    console.log("post after event card data", post);
        
                    //I forgot host of all things lmao.
                    //Prob just going to add in during this part
                    //not FULLY synced due to it but its okay.

                    const host = {name : post.hostName, email : post.hostEmail};
                    eventCard.set({
                        host,
                        title,
                        type,
                        description,
                        tags,
                        startDate,
                        endDate,
                        thumbnail:url,
                        eventUid:eventItem.id,


                    });

                    eventItem.set({

                        host,
                        title,
                        type,
                        description,
                        tags,
                        startDate,
                        endDate,
                        thumbnail:url,
                        gallery,
                        agenda,
                    })
                    .then (eventRef => {

                        console.log("eventItem", eventItem);
                        const tagData = {
        
                            title,
                            type:"event",
                            eventUid: eventItem.id,
                        };
        
                            // Have to update news post form
                            //to provide event tags to choose from as well.
                         newTag.set(tagData);
        
                    })
                    .catch ( err => {
        
                        console.log(err);
                    })
        
                })
            })
            .catch (err => {

                console.log("failed to upload", err);
            });

}


//Doing this first, cause easier? Question mark. Actually no
//event first.
function* postNews(payload){



    const {post, author} = payload;
    //Need to check tags, then send api call to backend to notify all trackers via email.
    //Create news card
    //create news post.
    //REMEMBER AUTHOR, this time will just be logged in user?
    //Hmm debatable.
    const firestore = firebase.firestore();
    const newsThumbnailsRef = firebase.storage().ref("NewsThumbnails/"+post.thumbnail.name);


    newsThumbnailsRef.put(post.thumbnail)
        .then ( res => {


            newsThumbnailsref.getDownloadURL()
                .then (url => {


                    const newsRef = firestore.collection("ClubInfo").doc("News")
                    const newsCardref = newsRef.collection("NewsCards").doc();
                    const newsPostRef = newsRef.collection("NewsPosts").doc();

                    console.log("post", post);

                    const {topic, content, tags} = post;
                    const uploadDate = new Date();
                   
                    newsCardRef.set({


                        topic,
                        content,
                        tags,
                        author,
                        uploadDate,
                        thumbnail: url,
                        postUid: newsPostRef.id,

                    });

                    //Same here, the news will have comments and such later.
                    newsPostRef.set({

                        topic,
                        content,
                        tags,
                        author,
                        uploadDate,
                        thumbnail: url,
                        postUid: newsPostRef.id,
                    });

                    //ToDo: 
                    //Set up back end to send notifiers to all trackers, so I need to check tags.

                    const eventTags = {tags.filter( tag => {

                        return tag.type === "event";
                    })};

                    //really uid, and full link will be /news/etc.
                    //would be domain name, prob just prepend it at backend, it's fine.
                    const postId = newsPostRef.id;


                    const body = {

                        eventTags,
                        postId,
                    };

                    try{


                        //Sends call to back end to update trackers.
                        const response = yield call(

                            request,
                            fbAdminAPI+"/updateEventTrackers",
                            //I forgot exactly what this is called http headers? something like that no good forgetting this stuff
                            //lol, it'll recollect.
                            {
                                method:"POST",
                                body:JSON.stringify(body),
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            }
                        );

                        console.log("response", response);

                    }

                    catch (err){

                        console.log("Failed to update trackers on news post", err);
                    }


                    //Then send all of the event tags along with this news post to backend to notify all trackers.
                    //Getting list of trackers itself will be in backend.
                })

        })

        .catch ( err => {

            console.log("failed to add post", err);
        })

}


export default function* saga(){


    yield takeLatest(POST_EVENT, postEvent);
    yield takeLatest(POST_NEWS, postNews);

}