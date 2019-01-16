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
import styled from 'styled-components';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector} from 'reselect';

import Header from 'components/Header';
import Footer from 'components/Footer';
import {withFirebase} from 'react-redux-firebase';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import NewsPage from 'containers/NewsPage/Loadable';
import NewsPostPage from 'containers/NewsPostPage/Loadable';
import EventsPage from 'containers/EventsPage';
import EventPage from 'containers/EventPage';
import AdminPage from 'containers/AdminPage';
import Login from 'containers/AccountRelated/LoginPage/Loadable';
import Register from 'containers/AccountRelated/RegistrationPage/Loadable';
import AccountRecovery from 'containers/AccountRelated/AccountRecovery/Loadable';
import ResetPasswordPage from 'containers/AccountRelated/ResetPasswordPage/Loadable';

import UserProfilePage from 'containers/ProfileRelated/UserProfilePage/Loadable';
import UpdateProfilePage from 'containers/ProfileRelated/UpdateProfilePage';


import { LOGIN_PATH,REGISTER_PATH,
  ACCOUNT_RECOVERY_PATH, RESET_PASSWORD_PATH, 
  USER_PROFILE_PATH, UPDATE_USER_PROFILE_PATH,
  BLOG_PATH,SPECIFIC_POST,  EVENTS_PATH, SPECIFIC_EVENT , ADMIN_PATH} from 'components/Header/pages';
import LoginPage from '../AccountRelated/LoginPage';
import { withCookies } from 'react-cookie';
import { makeSelectLocation, makeSelectDoneLoading, makeSelectLoggedInProfile} from './selectors';



const AppWrapper = styled.div`

  
  background-color: rgb(15, 65, 65);
  //display:grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns:100%;
  border:2px solid black;
  margin:0;
  height: ${props => props.height};
  padding:0;
`;

const BodyWrapper = styled.div`

  //Like, I want this, but not, cause then padds when not needed.
  //but better than having fatty white space.
  min-height:100vh;
  margin:0;
  padding:0;
`;

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

          

          //Okay, so the problem is it isn't set on time? Fuck single logout then
          //Single isgn on, but if they logout one place, not log out everywhere else.
          //For now.
          
          if (cookies.get("loggedInProfile") == null){
            
              //So then this should also be logged out.
              console.log("I'm happening?")
            //  this.props.firebase.logout();
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
      console.log("props", props);
      //I don't think it was anything I changed.
      //I'll test the old working version and see.
      //Yeah, auto logged out there too. It's the connection here.

      console.log("window outer height", window.innerHeight);
      return (
        <AppWrapper height = {window.innerHeight + window.outerHeight}>
          <Header activePage={this.props.location.pathname}/>
          <BodyWrapper>
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
                
                console.log("router props", routerProps);
                //Check if logged in already.
                if (props.firebase.auth().currentUser == null){

                  return <Register {...routerProps}/>;
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

                  return <ResetPasswordPage {...routerProps}/>;
                }
                else{
                  return <Redirect to ="/"/>;
                }
              
            }}/>


              <Route exact path = {USER_PROFILE_PATH} component = {UserProfilePage}/>
              <Route exact path = {USER_PROFILE_PATH+"/update"} component = {UpdateProfilePage}/>
            
              <Route exact path = {BLOG_PATH} component = {NewsPage}/>
              <Route exact path = {SPECIFIC_POST} component = {NewsPostPage}/>
              <Route exact path = {EVENTS_PATH} component = {EventsPage}/>
              <Route exact path = {SPECIFIC_EVENT} component = {EventPage}/>
              <Route path = {ADMIN_PATH} render = {routerProps => {
                
                console.log("props at admin path", props);
                if (props.loggedInProfile && props.loggedInProfile.isAdmin){

                  return <AdminPage {...routerProps}/>
                }
                else{

                  return <Redirect to = "/"/>
                }
                
                
              }}/>
              <Route component={NotFoundPage} />


            </Switch>

          </BodyWrapper>
          <Footer/>

        </AppWrapper>
      )
    }
  }



const mapStateToProps = createStructuredSelector({

    location: makeSelectLocation(),
    loggedInProfile: makeSelectLoggedInProfile(),
    doneLoading: makeSelectDoneLoading(),


});


const withConnect = connect(mapStateToProps);
const withReducer = injectReducer({key:"CES",reducer});
//If this doesn't work here, cause the action form Login isn't sent to there, or saga in here not sent to reducer in Login
//Then I'll move it

export default compose(
  withReducer,
  withConnect,
  withFirebase,
  withCookies,
  withRouter,
)(App);


