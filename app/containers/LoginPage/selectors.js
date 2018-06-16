import {createSelector} from 'reselect';

const selectLogin = (state) => state.get('LoginPage');

export const makeSelectField = (fieldName) => createSelector(
    selectLogin,
    (loginState) => {
        if (loginState == null) return ""

        return loginState.get(fieldName);
    }
);

export const makeSelectError = () => createSelector(
    selectLogin,
    (loginState) => {

        if (loginState){
            return loginState.get("error");
        }
        else{
            return "";
        }
    }
)
