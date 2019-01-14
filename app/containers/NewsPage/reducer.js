import { fromJS} from 'immutable';
import { LOADING_POSTS, LOADED_POSTS, MODIFICATIONS_MADE,
     LOAD_MORE, ON_TAG_CLICKED} from './constants';



const initialState = fromJS({  

    allPosts : [],
    //not seeing this?
    tagFilter:[],
    amountToShow:2,
    loadingPosts:false,
})



export default function blogPageReducer(state = initialState, action){

    switch (action.type){


        case ON_TAG_CLICKED:

            //Hmm maybe just change filter?
            const currentTags = state.get("tagFilter");

            const newTagFilters = currentTags.concat(action.tag);

            return state
                .set("tagFilter", newTagFilters);

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

        default:
            return state;
    }

}

