import { createSelector } from 'reselect';
import { USER_INVENTORY_PATH} from 'components/Header/pages';

const inventoryState = (state) => state.get(USER_INVENTORY_PATH);



export const makeSelectCurrent = (currentID) => createSelector(

    inventoryState,
    (invState) => {
        if (invState == null){
            return null;
        }
        return invState.get(currentID)
    }



)

export const makeSelectCollection = (collectionName) => createSelector(

    profileState,
    (profileState) => {

        if (profileState == null) return [];

        return profileState.get(collectionName);
    });

