import {createSelector} from 'reselect';
import { UPDATE_USER_PROFILE_PATH } from 'components/Header/pages';


const updateProfileState = (state) => state.get(UPDATE_USER_PROFILE_PATH);

export const makeProfileImageSelector = () => createSelector(

    updateProfileState,
    (updateProfileState) => {

        if (updateProfileState != null)
            return updateProfileState.get("profilePicture");
        else{
            return null;
        }
    }

);