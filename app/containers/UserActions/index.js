import styled from 'styled-components';
import React from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase'
import {compose} from 'redux';

import {logout} from './actions'
//Elements such as login, register, logout, userprofile, etc.


export const UserActionLink = styled(Link)`

    color:blue;
    text-align:center;
    text-decoration:none;
    margin-left:1em;

`;

const UserActions  = (props) => {
    
    
    console.log("render");
    //If not logged in render login, register
    console.log(props.loggedInUser);
    if (!props.loggedInUser){

        return (<span>
                <UserActionLink to ="/Login" > Login </UserActionLink>
                <UserActionLink to = "/Register"> Register </UserActionLink>
                    
            </span>
        )
    }


    //Otherwise render Link to profile, logout button, etc.
    return (
        <span>
            <p> Logged in as {props.loggedInUser.displayName} </p>
            <UserActionLink to = {"/:"+props.loggedInUser.uid}> Profile </UserActionLink>
            <button  onClick = {() => {props.firebase.logout();}}> Logout </button>
        </span>
    )    


}

function mapStateToProps(state){
   
    const auth = state.get("firebase").auth;
    console.log("State,",state)
    console.log(auth);
    if (auth && !auth.isEmpty){
        return {
            loggedInUser : auth
        }
    }
    return {
        loggedInUser : false
    }
}

function mapDispatchToProps(dispatch){
    return {
        onLogout : (evt) => {
            if (evt && evt.preventDefault) {
                evt.preventDefault();
            }
           return dispatch(logout())
        }
    }
}

const withConnect = connect(mapStateToProps,mapDispatchToProps);

export default compose(
    withConnect,
    withFirebase
)(UserActions);