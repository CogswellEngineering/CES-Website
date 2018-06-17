/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from 'components/Header';
import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import Login from 'containers/LoginPage/Loadable';
import Register from 'containers/RegistrationPage/Loadable';
import AccountRecovery from 'containers/AccountRecovery/Loadable';
import ResetPasswordPage from 'containers/ResetPasswordPage/Loadable';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { LOGIN_PATH,REGISTER_PATH,ACCOUNT_RECOVERY_PATH, RESET_PASSWORD_PATH } from 'components/Header/pages';

const App  = (props) => {


    if (!props.doneLoading){
      //This isn't the problem, something happend, cause not re-rendering anymore
      return null;
    }

    return (
      <div>
        <Header/>
        <Switch>
          
          <Route exact path="/" component={HomePage} />
          <Route path = {LOGIN_PATH} component={Login}/>
          <Route path = {REGISTER_PATH} component={Register}/>
          <Route path = {ACCOUNT_RECOVERY_PATH} component={AccountRecovery}/>
          <Route path = {RESET_PASSWORD_PATH} component={ResetPasswordPage}/>
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    )
  }


//So this is the problem, makes sense they prob make it so doesn't re-render if no longer changes.
function mapStateToProps(state){

  if (state == null) 
    return {
      doneLoading : false,
      //Redundant data just to force render when changes, thought if don't make it selector, wouldn't make that optimization.
      //though, if just did normal connect would be good, but then no reducer, cause need to inject it
      mainContentPath: "",
    };

  return {
    doneLoading : state.get("CES").get("doneLoadingCache"),
    mainContentPath: state.get("CES").get("mainContentPath"),

  };
}

const withConnect = connect(mapStateToProps);
const withReducer = injectReducer({key:"CES",reducer});
//If this doesn't work here, cause the action form Login isn't sent to there, or saga in here not sent to reducer in Login
//Then I'll move it

export default compose(
  withReducer,
  withConnect,
)(App);


