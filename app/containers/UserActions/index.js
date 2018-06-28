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

export const UserActionLink = styled(Link)`

    color:blue;
    text-align:center;
    text-decoration:none;
    margin-left:1em;

`;

const UserActions  = (props) => {
    

     if (props.loggedInUser.isEmpty){

        return (<span>
                <UserActionLink to ={LOGIN_PATH} > Login </UserActionLink>
                <UserActionLink to = {REGISTER_PATH}> Register </UserActionLink>
            </span>
        )
    }
    
    //Otherwise render Link to profile, logout button, etc.
    const profilePath = USER_PROFILE_PATH.split(":")[0];
    
    return (
        <span>
            <p> Logged in as {props.profile.displayName} </p>
            <UserActionLink to = {profilePath+props.loggedInUser.uid}> Profile </UserActionLink>
            <button  onClick = {() => {props.firebase.logout();}}> Logout </button>
        </span>
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