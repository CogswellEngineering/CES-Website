import { createSelector } from 'reselect';
import { LOGIN_PATH } from 'SiteData/constants';

const selectLogin = (state => state.get(LOGIN_PATH));


const createSelectAuthToken = () => createSelector(

    selectLogin,
    (selectLogin) => {

        if (selectLogin == null) return null;

        return selectLogin.get("authToken");
    }

)

export{
    createSelectAuthToken,

}