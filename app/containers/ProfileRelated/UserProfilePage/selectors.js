import { createSelector } from 'reselect';
import { USER_PROFILE_PATH } from 'SiteData/constants';

const profileState = (state) => state.get(USER_PROFILE_PATH);



export const makeSelectEvents = () => createSelector(

    profileState,
    (profileState) => {

        if (profileState == null) return  []

        return profileState.get("events");
    }


);



export const makeSelectNews = () => createSelector(

    profileState,
    (profileState) => {

        if (profileState == null) return  []

        return profileState.get("news");
    }

);
export const makeSelectError = () => createSelector(

    profileState,
    (profileState) => {

        if (profileState == null) return  "";

        return profileState.get("error");
    }

)
export const makeSelectNeedReload = () => createSelector(

    profileState,
    (profileState) => {
        if (profileState == null) return null;

        return profileState.get("needReload");
    }
    
)

export const makeSelectProfile = () => createSelector(

    profileState,
    (profileState) => {

        if (profileState == null) {
            
            return null;

        }
        else{
            return profileState.get("profile");
        }
    }

)
    
