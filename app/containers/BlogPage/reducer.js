import fromJS from 'immutable';
import { FIELD_CHANGED, MODIFICATIONS_MADE } from 'components/App/constants';
import { POSTING, POSTED, LOADING_POSTS, LOADED_POSTS } from './constants';



//Instead of admin panel, for this can just provide admin profiles, so should add in actions and state
//for admin as well.
const initialState = fromJS({
    blogPosts: [],
    //Start of at true cause need tor load everything in.
    //I just need to do an event listener for this, triggers at will mount so always pulls
    //cause way I'm setting up now it will load in new state only on this page,
    //others would have to refresh to get changes, which isn't horrid.
   // needLoadPosts:true,
    loadingPosts:false,

    //Only up for admin, onstant processing in the check is offputting me
    //but it's not that computationally expensive.
    //Will contain attributes: topic and description
    postContent:null,
    posting:false,
    error:""
})


export default function blogPageReducer(state = initialState, action){

    switch (action.type){

        case MODIFICATIONS_MADE:

            return state
                .set(blogPosts, action.posts);

        case POSTING:
            
            return state
                .set("posting",true);

        case POSTED:
        
            //Once done posting, clear all fields, but keep blogPosts
            //actualy if they posted, need to pull again, firestore optimizies query
            //so If i limit by 1, then only gets that and not reads rest, initial I could get all, then limit by 1 all other times.
            //But what if multiple people posts at the same time, if I limit to one I may have missed theirs and only get last persons
            //posts, and the event won't be triggered again, feels a like a little much, but it's only done if posts new
            //so not always pulling all of them over again, this will be like how I did profile reloading
            return initialState;
            
        case FIELD_CHANGED:
            return state
            .set(action.fieldName,action.value)
            .set("error","");
        default:
            return state;
    }

}

