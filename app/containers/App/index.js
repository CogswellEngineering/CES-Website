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
import { compose } from 'redux';
import { LOGIN_PATH,REGISTER_PATH,ACCOUNT_RECOVERY_PATH, RESET_PASSWORD_PATH } from 'components/Header/pages';

const App  = (props) => {

  
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path = {LOGIN_PATH} component={Login}/>
          <Route path = {REGISTER_PATH} component={Register}/>
          <Route path = {ACCOUNT_RECOVERY_PATH} component={AccountRecovery}/>
          <Route path = {RESET_PASSWORD_PATH} component={}


          <Route component={NotFoundPage} />
        </Switch>
      </div>
    )
  }


const withReducer = injectReducer({key:"CES",reducer});
//If this doesn't work here, cause the action form Login isn't sent to there, or saga in here not sent to reducer in Login
//Then I'll move it

export default compose(
  withReducer,
)(App);


