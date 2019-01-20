import {fromJS} from 'immutable';
import {
    LOADED_USERS,
    ADD_FILTER,
    REMOVE_FILTER
} from './constants';


const initialState =  fromJS({

    users:[],
    filter:[],
});


export default function reducer(state = initialState, action){

    const currentFilter = state.get("filter");

    switch (action.type){


        case LOADED_USERS:

            return state
                .set("users", action.users);

                    
        case ADD_FILTER:


      
        for (var i = 0; i < currentFilter.size; ++i){

            if (currentFilter.get(i).title == action.filter.title){

                return state;
            }
        }

        //Reset scrolling to top.
        window.scrollTo(0,0); 

        const newFilter = currentFilter.concat(action.filter);

        return state
            .set("filter", newFilter);

    case REMOVE_FILTER:


        const removedFilter = currentFilter.filter(filter => {

            return filter.title !== action.filter.title;
        });

        return state
            .set("filter", removedFilter);

        default:

            return state;
    }



}