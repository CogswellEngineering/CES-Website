import styled from 'styled-components';
import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase'
import {compose} from 'redux';

import {logout} from './actions'
import {LOGIN_PATH,REGISTER_PATH, USER_PROFILE_PATH, ADMIN_PATH} from 'SiteData/constants';
import reducer from './reducer';
import { createStructuredSelector } from 'reselect'; 
import { makeSelectLoggedIn, makeSelectLoggedInProfile } from 'containers/App/selectors';
import injectReducer from 'utils/injectReducer';
import { withCookies } from 'react-cookie';
import {NavLink} from 'components/Header/NavLink';
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
            const {onActionSelected} = props;
            const profilePath = USER_PROFILE_PATH.split(":")[0];

            console.log("loggedin", props.loggedInUser);
            console.log("active page", props.activePage);
            console.log(LOGIN_PATH);
            console.log(LOGIN_PATH == props.activePage);
           actions = !props.profile?

                //If it's empty then remove the cookie

                (<UserActionsWrapper style = {this.props.style}>

                        <NavLink to={LOGIN_PATH} onClick = {onActionSelected  } active = {(LOGIN_PATH == props.activePage).toString()}> Login </NavLink>
                        <NavLink to={REGISTER_PATH} onClick = {onActionSelected } active = {(REGISTER_PATH == props.activePage).toString()}> Join us </NavLink>

                    </UserActionsWrapper>
                )
            
            
            :
          (
                <UserActionsWrapper  style = {this.props.style}>

                    {/* Hello, {props.profile.displayName} */}

                    {props.profile.isAdmin && <NavLink to = {ADMIN_PATH} onClick = {onActionSelected} active = {(ADMIN_PATH == props.activePage).toString()}>
                         Admin Panel </NavLink>}
                        <NavLink to = {profilePath+props.loggedInUser.uid} onClick = {onActionSelected} active = {(profilePath+props.loggedInUser.uid == props.activePage).toString()}
                        > View Profile </NavLink>

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
                            props.firebase.logout();
                            onActionSelected();
                            }
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