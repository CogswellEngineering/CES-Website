import { createSelector } from 'reselect';
import { USER_PROFILE_PATH } from 'components/Header/pages';
const profileState = (state) => state.get(USER_PROFILE_PATH);





export const makeSelectNeedReload = () => createSelector(

    profileState,
    (profileState) => {
        if (profileState == null) return null;

        return profileState.get("needReload");
    }
    
)

export const makeSelectOwnership = () => createSelector(


    profileState,
    (profileState) => {

        if (profileState == null){
            return null;
        }
        else{
            return profileState.get("ownProfile");
        }
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
    
