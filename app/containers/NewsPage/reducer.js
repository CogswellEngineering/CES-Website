import { fromJS} from 'immutable';
import { POST_FIELD_CHANGED, POSTING, POSTED, POST_FAILED, LOADING_POSTS, LOADED_POSTS, MODIFICATIONS_MADE,
    PAGE_TURNED, LOAD_MORE} from './constants';



const initialState = fromJS({  


    allPosts : [],
    
    amountToShow:2,

    currentPage: 1,
    postsPerPage: 4,
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



//For returning resulting sub array that will then be set to shown posts.
//This will be called when change page, and when total blog posts change.
function getShownPages(posts, amount){


    var shownPosts = [];
    /*
    //Because posts on each page goes by posts per page
    const endingIndex = page * shownPerPage;

    var i = endingIndex - shownPerPage  ;

    for (; i < endingIndex && i < posts.length; ++i){

        shownPosts.push(posts[i]);
    }

    return shownPosts;

*/

    for (var i = 0; i < amount; ++i){

    }
}

export default function blogPageReducer(state = initialState, action){

    switch (action.type){

       
        //No longer being used for now.
        case PAGE_TURNED:

            const pagePosts = getShownPages(action.page,state.get("allPosts"), state.get("postsPerPage"));
            return state
                .set("currentPage", action.page)
                .set("shownPosts", pagePosts);

        case LOAD_MORE:



            const currentAmountShown = state.get("amountToShow");
            const allPosts = state.get("allPosts");


            //To make sure within bounds of allPosts
            const newAmountToShow = Math.min(currentAmountShown + action.amountToLoad, allPosts.length);
            return state
                .set("amountToShow", newAmountToShow);


        case MODIFICATIONS_MADE:

            //Gets shown posts with respect to new set of blogs.
            const shownPosts = getShownPages(state.get("currentPage"),action.posts,state.get("postsPerPage"));
            return state
                .set("allPosts", action.posts)
                .set("shownPosts",action.posts);
                

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

