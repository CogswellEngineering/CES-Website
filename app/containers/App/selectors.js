import { createSelector } from 'reselect';

const selectRoute = (state) => state.get('route');
const selectUser = (state) => state.get('loggedInUser');
const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);


export {
  makeSelectLocation,
};
