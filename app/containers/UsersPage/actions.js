import {

    ADD_FILTER,
    REMOVE_FILTER,
    LOAD_USERS,
    LOADED_USERS
} from './constants';


export function addFilter(filter){


    return{
        type: ADD_FILTER,
        filter
    };
}

export function removeFilter(filter){

    return {
        type : REMOVE_FILTER,
        filter,
    };

}

export function loadUsers(){

    return {
        type: LOAD_USERS,

    }
}

export function loadedUsers(users){

    return {
        type: LOADED_USERS,
        users,
    };
}