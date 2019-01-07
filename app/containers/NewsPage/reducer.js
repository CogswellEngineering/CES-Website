import { fromJS} from 'immutable';
import { POST_FIELD_CHANGED, POSTING, POSTED, POST_FAILED, LOADING_POSTS, LOADED_POSTS, MODIFICATIONS_MADE,
     LOAD_MORE} from './constants';



const initialState = fromJS({  


    allPosts : [],
    
    amountToShow:2,

    loadingPosts:false,

    postContent:{
        topic:"",
        body:"",
        //Okay, so this makes past hour waste of time, these tags dont work with redux. Great.
        tags:[{id:"Default",text:"Default"}],
    },
    posting:false,
    error:""
})



export default function blogPageReducer(state = initialState, action){

    switch (action.type){

       
   

        case LOAD_MORE:



            const currentAmountShown = state.get("amountToShow");
            const allPosts = state.get("allPosts");


            //To make sure within bounds of allPosts
            const newAmountToShow = Math.min(currentAmountShown + action.amountToLoad, allPosts.length);
            return state
                .set("amountToShow", newAmountToShow);


        case MODIFICATIONS_MADE:

            //Gets shown posts with respect to new set of blogs.
            return state
                .set("allPosts", action.posts)
                

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
            
        case POST_FIELD_CHANGED:
                 
            var newPostContent = {
                topic : state.get("postContent").topic,
                body: state.get("postContent").body,
                tags: state.get("postContent").tags,
            };

            newPostContent[action.fieldName] = action.value;

            return state
            .set("postContent",newPostContent)
            .set("error","");

        default:
            return state;
    }

}

