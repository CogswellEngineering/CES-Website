import styled from 'styled-components';
import React from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from './actions'
//Elements such as login, register, logout, userprofile, etc.


export const UserActionLink = styled(Link)`

    color:blue;
    text-align:center;
    text-decoration:none;
    margin-left:1em;

`;

const UserActions  = (props) => {
    
    console.log(props);
    console.log("render");
    //If not logged in render login, register
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
            <UserActionLink to = {"/:"+props.loggedInUser.name}> Profile </UserActionLink>
            <button  onClick = {() => {props.onLogout()}}> Logout </button>
        </span>
    )    


}

function mapStateToProps(state){
   

    if (state.get("CES") != null){
        console.log(state.get("CES"));
        return {
            loggedInUser : state.get("CES").get("loggedInUser")
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

export default connect(mapStateToProps,mapDispatchToProps)(UserActions);