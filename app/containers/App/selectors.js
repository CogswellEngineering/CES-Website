import { createSelector } from 'reselect';
import { create } from 'domain';

const selectRoute = (state) => state.get('route');
const selectFirebase = (state) => state.get('firebase');
const selectCES = (state) => state.get("CES");

const makeSelectLoggedIn = () => createSelector(

  selectFirebase,
  (firebaseState) => {
    if (firebaseState == null) return null;
    return firebaseState.auth;
  }
)
const makeSelectLoggedInProfile = () => createSelector(

  selectCES,
  (CESState) => {
    if (CESState == null) return null;

    return CESState.get("loggedInProfile");
  }
)
const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => {
    return routeState.get('location').toJS();
  }
);

const makeSelectDoneLoading = () => createSelector(

  selectCES,
  (cesState) => {

    if (cesState == null) return false;
    return cesState.get("doneLoadingCache");
  }

);



export {
  makeSelectDoneLoading,
  makeSelectLocation,
  makeSelectLoggedIn,
  makeSelectLoggedInProfile,
};
