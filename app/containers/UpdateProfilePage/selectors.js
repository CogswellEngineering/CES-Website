import {createSelector} from 'reselect';
import { UPDATE_USER_PROFILE_PATH } from 'components/Header/pages';

//Oveboard to have selectors just for image, but this only place used so not make since to put in global state.

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