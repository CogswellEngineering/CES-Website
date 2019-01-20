import {fromJS} from 'immutable';
import {
    LOADED_USERS,
    ADD_FILTER,
    REMOVE_FILTER
} from './constants';


const initialState = {

    users:[],
    filter:[],
};


export default function reducer(state = initialState, action){


    switch (action.type){


        case LOADED_USERS:

            return state
                .set("users", action.users);

                    
        case ADD_FILTER:

        const currentFilter = state.get("filter");

        //Reset scrolling to top.
        window.scrollTo(0,0); 

        if (currentFilter.contains(action.filter)){
            return state;
        }

        const newFilter = currentFilter.concat(action.filter);

        return state
            .set("filter", newFilter);

    case REMOVE_TAG_FILTER:

        const currentFilter = state.get("filter");

        const newFilter = currentFilter.filter(filter => {

            return filter.title !== action.filter.title;
        });

        return state
            .set("tagFilter", newFilter);

        default:

            return state;
    }



}