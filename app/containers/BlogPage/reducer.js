import fromJS from 'immutable';
import { MODIFICATIONS_MADE } from 'components/App/constants';
import { POST_FIELD_CHANGED, POSTING, POSTED, LOADING_POSTS, LOADED_POSTS, MODIFICATIONS_MADE } from './constants';



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
    //Will contain attributes: topic and body
    postContent:{
        topic:"",
        body:"",
    },
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
        
            
            return state
                .set("postContent",{topic:"",body:""})
                .set("posting",false)


        case POST_FAILED:

            return state
                .set("error",action.error);
            
        //No more reason to make this unique, whatever.    
        case POST_FIELD_CHANGED:

            //Honestly I could just keep these separate but they make the most sense in a single object
            //it's slightly worse, cause now even if only topic is changed
            //body will be considered change so may re-render unnecessarrily. Unless reselect accounts for that
            //it should simulate deep copy with it's memoization, so hopefully fine.
            var newPostContent = {
                topic : state.get("postContent").topic,
                body: state.get("postContent").body
            }

            newPostContent[action.fieldName] = action.value;

            return state
            .set("postContent",newPostContent)
            .set("error","");

        default:
            return state;
    }

}

