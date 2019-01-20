import {createSelector} from 'reselect';
import { USERS_PATH} from 'SiteData/constants';

const usersState = (state) => state.get(USERS_PATH);




export const makeSelectFilter = () => createSelector(


    usersState,
    (usersState) => {

        if (usersState == null) return [];

        return usersState.get("filter");
    }

)

export const makeSelectUsers =  () => createSelector(

    usersState,
    (usersState) => {

        if (usersState == null) return [];

        const users = usersState.get("users");
        const filter = usersState.get("filter");

        if (filter.size == 0){
            return users;
        }

        const filteredUsers = users.filter( user => {


            
            //If null and filter has been placeds.
            if (user.concentrations == null){
                return false;
            }
            var matches = 0;
            
            for (var i = 0; i < filter.size; ++i){

                //If matches any tag in post.

                for (var j = 0; j < user.concentrations.length; ++j){

                    if (user.concentrations[j].title === filter.get(i).title){

                        //Actually can't just return true, caues should meet ALL FILTERS.
                        matches += 1;
                    }
                }
            }
            //Incase of duplicates if they decide to.
            return matches >= filter.size;


        });

        console.log("get to here", filteredUsers);

        return filteredUsers;

    }
)