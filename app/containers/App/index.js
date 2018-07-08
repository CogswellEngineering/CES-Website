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

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Header from 'components/Header';
import {withFirebase} from 'react-redux-firebase';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import BlogPage from 'containers/BlogPage/Loadable';
import EventsPage from 'containers/EventsPage';


import Login from 'containers/AccountRelated/LoginPage/Loadable';
import Register from 'containers/AccountRelated/RegistrationPage/Loadable';
import AccountRecovery from 'containers/AccountRelated/AccountRecovery/Loadable';
import ResetPasswordPage from 'containers/AccountRelated/ResetPasswordPage/Loadable';

import UserProfilePage from 'containers/ProfileRelated/UserProfilePage/Loadable';
import UpdateProfilePage from 'containers/ProfileRelated/UpdateProfilePage';


import { LOGIN_PATH,REGISTER_PATH,
  ACCOUNT_RECOVERY_PATH, RESET_PASSWORD_PATH, 
  USER_PROFILE_PATH, UPDATE_USER_PROFILE_PATH,
  BLOG_PATH, EVENTS_PATH } from 'components/Header/pages';
import 'react-dropdown/style.css'
import LoginPage from '../AccountRelated/LoginPage';
import { withCookies } from 'react-cookie';


//In component did mount in here
//basically same thing as in service, have the call back, then check cookies
class App  extends Component{
  


    componentDidMount(){

      //This is slightly different, basically check cookies, if cookies have userProfile or auth token as null
      //then I know logged out, so I'll sign out here too.

      this.props.firebase.auth().onAuthStateChanged(user => {

        if (user){
    
          //If loged in then check cookies.
          const cookies = this.props.cookies;

          //If logged in and this is null, then means logged out.
          //What I could do is use location change to trigger checking cookies
          //so don't have to refresh. TODO.
          
          //Priority first is midterm lol.
          if (cookies.get("loggedInProfile") == null){
            
              //So then this should also be logged out.
              this.props.firebase.logout();
          }

        }

      })

    }

  
    render(){

      const props = this.props;


      if (!props.doneLoading){
        //This isn't the problem, something happend, cause not re-rendering anymore
        return null;
      }

      return (
        <div>
          <Header/>
          <Switch>
            
            <Route exact path="/" component={HomePage} />
            <Route path = {LOGIN_PATH} render ={(routerProps) => {
              
                console.log("router props", routerProps);
                //Check if logged in already.
                if (props.firebase.auth().currentUser == null){

                  //Will also pass in props for where coming in maybe
                  //so redirect back to it, that'll just be query param probably

                  return <Login {...routerProps}/>
                }
                else{
                  return <Redirect to ="/"/>
                }
              
            }}/>

            {/*basicalyl same exact process for rest of it*/}
            <Route path = {REGISTER_PATH} render ={(routerProps) => {
              
              //Check if logged in already.
              if (props.firebase.auth().currentUser == null){

                return <Register/>;
              }
              else{
                return <Redirect to ="/"/>;
              }
            
          }}/>
            <Route path = {ACCOUNT_RECOVERY_PATH}  render ={(routerProps) => {
              
              //Check if logged in already.
              if (props.firebase.auth().currentUser == null){

                return <AccountRecovery/>;
              }
              else{
                return <Redirect to ="/"/>;
              }
            
          }}/>
            <Route path = {RESET_PASSWORD_PATH}  render ={(routerProps) => {
              
              //Check if logged in already. 
              if (props.firebase.auth().currentUser == null){

                return <ResetPasswordPage/>;
              }
              else{
                return <Redirect to ="/"/>;
              }
            
          }}/>


            <Route exact path = {USER_PROFILE_PATH} component = {UserProfilePage}/>
            <Route exact path = {USER_PROFILE_PATH+"/update"} component = {UpdateProfilePage}/>
          
            <Route path = {BLOG_PATH} component = {BlogPage} />
            <Route path = {EVENTS_PATH} component = {EventsPage}/>
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      )
    }
  }


function mapStateToProps(state){

  if (state == null) 
    return {
      doneLoading : false,
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
  withFirebase,
)(App);


