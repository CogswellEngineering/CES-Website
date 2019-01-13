import styled from 'styled-components';
import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase'
import {compose} from 'redux';

import {logout} from './actions'
import {LOGIN_PATH,REGISTER_PATH, USER_PROFILE_PATH, ADMIN_PATH} from 'components/Header/pages';
import reducer from './reducer';
import { createStructuredSelector } from 'reselect'; 
import { makeSelectLoggedIn, makeSelectLoggedInProfile } from 'containers/App/selectors';
import injectReducer from 'utils/injectReducer';
import { withCookies } from 'react-cookie';

import {
    
    LogoutButton,
    UserActionsWrapper,
    UserActionLink,
    DisplayName,
    Button,

} from 'components/StyledComponents/UserActions';


class UserActions extends React.PureComponent{
    
    
  
    
    
        render(){
        

            const props = this.props;
            var actions = null; 

            const profilePath = USER_PROFILE_PATH.split(":")[0];

            console.log("loggedin", props.loggedInUser);
           actions = !props.profile?

                //If it's empty then remove the cookie

                (<UserActionsWrapper>

                        <UserActionLink to={LOGIN_PATH} > Login </UserActionLink>
                        <UserActionLink to={REGISTER_PATH} > Join us </UserActionLink>

                    </UserActionsWrapper>
                )
            
            
            :
          (
                <UserActionsWrapper >

                    {/* Hello, {props.profile.displayName} */}

                    {props.profile.isAdmin && <UserActionLink to = {ADMIN_PATH}> Admin Panel </UserActionLink>}
                        <UserActionLink to = {profilePath+props.loggedInUser.uid}> View Profile </UserActionLink>

                        {/*Will switch to include uid if do decide make inventory public
                     <UserActionLink to = {"/account/inventory"}> Inventory </UserActionLink>
*/}
                        <LogoutButton  onClick = {() => {

                            //Remove cookies, there should be a centralized domain I go to
                            //that then redirects back to same page. It's something need to look into more
                            //for now this works.
                            props.cookies.remove("authToken");
                            props.cookies.remove("loggedInProfile");
                            //Dispatch logout
                            props.firebase.logout();}
                            
                            
                            }> Logout </LogoutButton>
                    
                </UserActionsWrapper>

                
            )
            
            return actions;

    }
}

const mapStateToProps = createStructuredSelector({

    loggedInUser : makeSelectLoggedIn(),
    profile : makeSelectLoggedInProfile(),
}
    
);


const withConnect = connect(mapStateToProps);
const withReducer = injectReducer({key:"UserActions",reducer});
export default compose(
    withConnect,
    withReducer,
    withFirebase,
    withCookies,
)(UserActions);