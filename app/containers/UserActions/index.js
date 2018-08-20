import styled from 'styled-components';
import React, {Component} from 'react'
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase'
import {compose} from 'redux';

import {logout} from './actions'
import {LOGIN_PATH,REGISTER_PATH, USER_PROFILE_PATH} from 'components/Header/pages';
import reducer from './reducer';
import { createStructuredSelector } from 'reselect'; 
import { makeSelectLoggedIn, makeSelectLoggedInProfile } from 'containers/App/selectors';
import injectReducer from 'utils/injectReducer';
import { withCookies } from 'react-cookie';
import Popover from 'react-simple-popover';

import {
    
    LoggedOutSection,
    LogoutButton,
    LoggedInSection,
    UserActionsWrapper,
    UserActionLink,
    DisplayName,
    Button,

} from 'components/StyledComponents/UserActions';


class UserActions extends Component{
    
    
    constructor(props){

        super(props);

        this.state = {
            servicesOpen : false,
        };


        this.toggleServices = this.toggleServices.bind(this);
        this.closeServices = this.closeServices.bind(this);

    }

    toggleServices(){

        this.setState({
          servicesOpen: !this.state.servicesOpen
        });
    
        console.log("services open", this.state.servicesOpen);
      }

      closeServices(){

        this.setState({
          servicesOpen:false,
        });
      }
    
    
    
        render(){
        

            const props = this.props;
            var actions = null; 

            const profilePath = USER_PROFILE_PATH.split(":")[0];

           actions = props.loggedInUser.isEmpty?

                //If it's empty then remove the cookie

                (<LoggedOutSection>

                        <UserActionLink to={LOGIN_PATH}> Login </UserActionLink>
                        <UserActionLink to={REGISTER_PATH}> Register </UserActionLink>

                    </LoggedOutSection>
                )
            
            
            :
          (
                <LoggedInSection>

                    {/* Hello, {props.profile.displayName} */}

                        <UserActionLink to = {profilePath+props.loggedInUser.uid}> View Profile </UserActionLink>
                        {/*Will switch to include uid if do decide make inventory public*/}
                        <UserActionLink to = {"/account/inventory"}> Inventory </UserActionLink>

                        <hr/>  
                        <LogoutButton  onClick = {() => {

                            //Remove cookies, there should be a centralized domain I go to
                            //that then redirects back to same page. It's something need to look into more
                            //for now this works.
                            props.cookies.remove("authToken");
                            props.cookies.remove("loggedInProfile");
                            //Dispatch logout
                            props.firebase.logout();}
                            
                            
                            }> Logout </LogoutButton>
                    
                </LoggedInSection>

                
            )
            
            return  (

                <UserActionsWrapper>

                    <Button ref="target"  onClick = {this.toggleServices}> Account </Button>
                    <Popover
                        placement='bottom'
                        target={this.refs.target}
                        show={this.state.servicesOpen}
                        onHide={this.closeServices}
                    >
                        <DisplayName> {props.profile.displayName} </DisplayName>
                        <hr/>
                        {actions}

                    </Popover>

            </UserActionsWrapper>
            );

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