import styled from 'styled-components';
import React from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase'
import {compose} from 'redux';

import {logout} from './actions'
//Elements such as login, register, logout, userprofile, etc.
import {LOGIN_PATH,REGISTER_PATH} from 'components/Header/pages';
import reducer from './reducer';
import injectReducer from 'utils/injectReducer';

export const UserActionLink = styled(Link)`

    color:blue;
    text-align:center;
    text-decoration:none;
    margin-left:1em;

`;

const UserActions  = (props) => {
    
    
    //If not logged in render login, register
    console.log(props.loggedInUser);

    if (!props.doneLoading){
        return null;
    }
    
    else if (props.loggedInUser.isEmpty){

        return (<span>
                <UserActionLink to ={LOGIN_PATH} > Login </UserActionLink>
                <UserActionLink to = {REGISTER_PATH}> Register </UserActionLink>
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
    var doneLoading = false;
    if (state.get("UserActions")){

        doneLoading = state.get("UserActions").get("doneLoadingCache");
    }
    
    return {
            loggedInUser : auth,
            doneLoading : doneLoading,
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
console.log(reducer);
const withReducer = injectReducer({key:"UserActions",reducer});
export default compose(
    withConnect,
    withReducer,
    withFirebase
)(UserActions);