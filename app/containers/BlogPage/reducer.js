import { fromJS} from 'immutable';
import { POST_FIELD_CHANGED, POSTING, POSTED, POST_FAILED, LOADING_POSTS, LOADED_POSTS, MODIFICATIONS_MADE,
    PAGE_TURNED } from './constants';



const initialState = fromJS({  


    //Okay for optimal performance
    //I really should do calculation of posts to show on that page
    //only when turn page, cause no point doing if change page
    //and would re-do calculation if I for example edit a blog post.

    //BUt then if I add a new blog post? Well then I would want it to update but they did not change
    //page, I could make the calculation into a completely separate function and have both actions result in calling it.

    allPosts : [],
    shownPosts:[],

    currentPage: 1,
    postsPerPage: 4,
    loadingPosts:false,

    postContent:{
        topic:"",
        body:"",
    },
    posting:false,
    error:""
})



//For returning resulting sub array that will then be set to shown posts.
//This will be called when change page, and when total blog posts change.
function getShownPages(page,posts,shownPerPage){


    var shownPosts = [];

    //Because posts on each page goes by posts per page
    const endingIndex = page * shownPerPage;

    var i = endingIndex - shownPerPage  ;

    for (; i < endingIndex && i < posts.length; ++i){

        shownPosts.push(posts[i]);
    }

    return shownPosts;


}

export default function blogPageReducer(state = initialState, action){

    switch (action.type){


        case PAGE_TURNED:

            const pagePosts = getShownPages(action.page,state.get("allPosts"), state.get("postsPerPage"));
            return state
                .set("currentPage", action.page)
                .set("shownPosts", pagePosts);

        case MODIFICATIONS_MADE:

            //Gets shown posts with respect to new set of blogs.
            const shownPosts = getShownPages(state.get("currentPage"),action.posts,state.get("postsPerPage"));
            return state
                .set("allPosts", action.posts)
                .set("shownPosts",shownPosts);
                

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
            };

            newPostContent[action.fieldName] = action.value;

            return state
            .set("postContent",newPostContent)
            .set("error","");

        default:
            return state;
    }

}

