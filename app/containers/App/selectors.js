import { createSelector } from 'reselect';

const selectRoute = (state) => state.get('route');
const selectFirebase = (state) => state.get('firebase');

const makeSelectLoggedIn = () => createSelector(

  selectFirebase,
  (firebaseState) => {
    if (firebaseState == null) return null;
    return firebaseState.auth;
  }
)
const makeSelectLoggedInProfile = () => createSelector(

  selectFirebase,
  (firebaseState) => {
    if (firebaseState == null) return null;
    return firebaseState.profile;
  }
)
const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => {
    return routeState.get('location').toJS();
  }
);


export {
  makeSelectLocation,
  makeSelectLoggedIn,
  makeSelectLoggedInProfile,
};
