import { fromJS} from 'immutable';
import { LOADING_POSTS, LOADED_POSTS, MODIFICATIONS_MADE,
     LOAD_MORE, ON_TAG_CLICKED, REMOVE_TAG_FILTER} from './constants';

import {LOCATION_CHANGE} from 'react-router-redux';

const initialState = fromJS({  

    allPosts : [],
    tagFilter:[],
    amountToShow:3,
    loadingPosts:false,
})



export default function blogPageReducer(state = initialState, action){

    switch (action.type){

        //Anytime filter changes reset amount to show.Honestly prob should just show all


        case LOCATION_CHANGE:

            
            return initialState;

            
        case ON_TAG_CLICKED:

            //Hmm maybe just change filter?
            const currentTags = state.get("tagFilter");

            //Reset scrolling to top.
            window.scrollTo(0,0); 

            if (currentTags.contains(action.tag)){
                return state;
            }

            const newTagFilters = currentTags.concat(action.tag);

            return state
                .set("tagFilter", newTagFilters)
                .set("amountToShow", 2);

        case REMOVE_TAG_FILTER:

            const currTags = state.get("tagFilter");

            const newTags = currTags.filter(tag => {

                return tag.title !== action.tag.title;
            });

            return state
                .set("tagFilter", newTags)
                .set("amountToShow", 2);


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

