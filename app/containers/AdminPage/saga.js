import {takeLatest, call,put } from 'redux-saga/effects';
import firebase from 'firebase';

//Url to backend, prob rename this to ces back end too. kinda saying alot in it lmao
import { BACK_END_URL, SPECIFIC_EVENT, SPECIFIC_POST, DOMAIN_URL } from 'SiteData/constants';
import request from 'utils/request';

import{

    POST_NEWS,
    POST_EVENT
} from './constants';


function notifySubscribers(type, data){

    const body = {notificationType: type, notificationData: DOMAIN_URL + "/" + data};
    console.log(body);
    console.log(JSON.stringify(body))

    //Sends post request to back end to notify subscribers.
    request(BACK_END_URL+ "/notifySubscribers", {

        method: "POST",
        body: JSON.stringify(body),
        headers: {

            'Content-Type' : 'application/json'
        }
    })
    .then (response => {

        console.log("response", response);
    })
    .catch(err => {

        console.log("oh no", err);
    })

}

function* postEvent(payload){


    const {post} = payload;
    const firestore = firebase.firestore();

    const eventsRef = firestore.collection("ClubInfo").doc("Events");

    const eventCard = eventsRef.collection("EventCards").doc();
    const eventItem = eventsRef.collection("EventList").doc();
    const eventAnalyticsRef = eventsRef.collection("Analytics").doc(eventItem.id);
    const newTag = firestore.collection("Tags").doc();

    //Maybe add date and location to card, but I'll decide that later.
    //Wait...There are no event cards. wait.. Yes there are. When I click the event on calendar it opens it as modal
    //I need to list view or grid view o display them as actual cards too, actually I DO NEED date for that 
    //Wait I'm dumb need to upload thumbnail to storage then get download url.

    const {thumbnail} = post;

    //prefixing with uid of event to avoid revoking download urls of same name files.
    const storageRef = firebase.storage().ref("EventThumbnails/"+eventItem.id+"_"+thumbnail.name);
    storageRef.put(thumbnail)
        .then (snapshot => {


            storageRef.getDownloadURL()
                .then (url => {


                    const {title, description, tags, startDate, endDate, gallery, agenda , location} = post;
                
        
                    //I forgot host of all things lmao.
                    //Prob just going to add in during this part
                    //not FULLY synced due to it but its okay.
                    //Hmm should hosts have to be users?
                    var host = {name : post.hostName, email : post.hostEmail};
                    
                    //Will be optional, click to profile if user
                    //otherwise open emial
                    if (post.hostUid != null && post.Uid !== ""){
                        //N
                        host.uid = post.hostUid;
                    }

                    //Prob won't be used.
                    if (post.hostIcon != null){


                        host.icon = post.hostIcon;
                    }

                    eventCard.set({
                        host,
                        title,
                        description,
                        tags,
                        startDate,
                        endDate,
                        location,
                        thumbnail:url,
                        eventUid:eventItem.id,


                    });

                    //Setting analytics doc for this event.
                    eventAnalyticsRef.set({

                        viewCount: 0,
                        //Whatever else.
                    });

                    eventItem.set({

                        host,
                        title,
                        description,
                        tags,
                        location,
                        startDate,
                        endDate,
                        thumbnail:url,
                        gallery,
                        agenda,
                    })
                    .then (eventRef => {


                        const eventUrl = SPECIFIC_EVENT.split(":")[0];
                        //This is 100% being called.
                        notifySubscribers("Event", {
                            //Replace with constant of hostname.
                            //Prob will have in notify funcion and just pass in rest of path.
                            url: "http://localhost:3000" + eventUrl + eventItem.id
                        });
                        

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
    const newsRef = firestore.collection("ClubInfo").doc("News")
    const newsCardRef = newsRef.collection("NewsCards").doc();
    const newsPostRef = newsRef.collection("NewsPosts").doc();
    const newsThumbnailsRef = firebase.storage().ref("NewsThumbnails/"+ newsPostRef.id + "_" + post.thumbnail.name);
    
    const {topic, content, tags} = post;

    newsThumbnailsRef.put(post.thumbnail)
        .then ( res => {


            newsThumbnailsRef.getDownloadURL()
                .then (url => {


                

                    console.log("post", post);

                    const postDate = new Date();

                    //Hmm but I want it to include the .
                    var previewContent = content[0];

                    for (var i = 1; i < content.length; ++i){


                        previewContent = previewContent .concat(content[i]);

                        //Or any ending punc like exclamation
                        const currentChar = content[i];
                        if ( (currentChar == '.'  || currentChar == '?' || currentChar == '!' ) 
                        && (content[i+1] == ' ' || i + 1 == content.length) ){

                            break;
                        }

                    }
                    console.log(previewContent);
                   
                    newsCardRef.set({


                        topic,
                        content: previewContent,
                        tags,
                        author,
                        postDate,
                        thumbnail: url,
                        postUid: newsPostRef.id,
                        viewCount:0,
                    });

                    //Same here, the news will have comments and such later.
                    newsPostRef.set({

                        postInfo:{
                        topic,
                        content,
                        tags,
                        author,
                        postDate,
                        thumbnail: url,
                        postUid: newsPostRef.id,
                        },
                        viewCount:0,
                        likeCount:0,
                    })
                    .then ( res => {

                        const newsURL = SPECIFIC_POST.split(":")[0];

                        notifySubscribers("News", {

                            url: newsURL + newsPostRef.id
                        });
                        

                    })

                })

        })

        .catch ( err => {

            console.log("failed to add post", err);
        })


        
        const postId = newsPostRef.id;
         
        const eventTags = tags.filter( tag => {    
            console.log("tag", tag);                
            return tag.eventUid != null;
        }); 

        console.log("event tags", eventTags);


        const body = {
            eventTags,
            postId,
        };

        if (eventTags.length == 0){
            return;
        }

        try{


                        
                const response = yield call(

                request,
                BACK_END_URL+"/updateEventTrackers",
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

}


export default function* saga(){


    yield takeLatest(POST_EVENT, postEvent);
    yield takeLatest(POST_NEWS, postNews);

}