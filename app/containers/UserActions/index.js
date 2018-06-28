import styled from 'styled-components';
import React from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase'
import {compose} from 'redux';

import {logout} from './actions'
//Elements such as login, register, logout, userprofile, etc.
import {LOGIN_PATH,REGISTER_PATH, USER_PROFILE_PATH} from 'components/Header/pages';
import reducer from './reducer';
import { createStructuredSelector } from 'reselect'; 
import { makeSelectLoggedIn, makeSelectLoggedInProfile } from 'containers/App/selectors';
import injectReducer from 'utils/injectReducer';
import LoginPage from 'containers/LoginPage';


//Not including Login?
const LoggedOutSection = styled.span`
    margin-left:50%;
    width:50%;
`

const LoggedInSection = styled.span`

    width:55%;
    margin-left:30%;

`

export const UserActionLink = styled(Link)`

    color:blue;
    text-align:center;
    margin-left:1%;
    text-decoration:none;

`;

const UserActions  = (props) => {
    

     if (props.loggedInUser.isEmpty){

        return (<LoggedOutSection>

                <UserActionLink to={LOGIN_PATH}> Login </UserActionLink>
                <UserActionLink to={REGISTER_PATH}> Register </UserActionLink>

            </LoggedOutSection>
        )
    }
    
    //Otherwise render Link to profile, logout button, etc.
    const profilePath = USER_PROFILE_PATH.split(":")[0];

    
    //Just so that all pops up at once, instead of delay on display name.
    if (props.profile.displayName == null){
        return null;
    }
    return (
        <LoggedInSection>

                Hello, {props.profile.displayName} 

                <UserActionLink to = {profilePath+props.loggedInUser.uid}> Profile </UserActionLink>
                {/*Will switch to include uid if do decide make inventory public*/}
                <UserActionLink to = {"/account/inventory"}> Inventory </UserActionLink>
                
                <button  onClick = {() => {props.firebase.logout();}}> Logout </button>
            
        </LoggedInSection>
    )    


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
    withFirebase
)(UserActions);