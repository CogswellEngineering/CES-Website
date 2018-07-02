import React, { Component} from 'react'
import PropTypes from 'prop-types';
import {fieldChanged} from 'containers/App/actions';
import StyledForm, { FormGroup,StyledButton,StyledLabel,ErrorMessage,StyledInput} from 'components/StyledForm'
import {connect} from 'react-redux';
import {compose} from 'redux';
import { withFirebase } from 'react-redux-firebase'
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import { createStructuredSelector } from 'reselect';
import saga from'./saga';
import reducer from './reducer';
import FormSelectors from 'utils/genericFormSelectors';
import { ACCOUNT_RECOVERY_PATH, REGISTER_PATH, LOGIN_PATH } from 'components/Header/pages';
import { withCookies, Cookies } from 'react-cookie';
import { makeSelectLoggedInProfile } from 'containers/App/selectors';
import { createSelectAuthToken} from './selectors';

const CircularJSON = require('circular-json');

var util = require('util');

import {
    
    StyledLink,
    LoginWrapper,
    MainContent,
    AlternativeOptions,

} from 'components/StyledComponents/LoginPage';

class LoginPage extends Component { 
    
    
    



    componentDidUpdate(){


        //Store auth token into cookies for subdomains to use to log in and maintain auth state
        if (this.props.doneLoggingIn){


            const cookiesOptions = {
                path: '/',
                domains:"http://localhost"
            };

            //If i could sign in with the token using react-redux-firebase instance
            //then I should be good.

            //Okay it works, here but it is deprecated like the signing in.
            //Okay, whatever I do on service side, I'm done on this end, except maybe changing login to set profile
            //depending on my decision there.

          //  this.props.firebase.login({token:this.props.authToken});


            //console.log("profile",this.props.loggedInProfile)
            this.props.cookies.set("authToken",this.props.authToken,cookiesOptions);
            //this.props.cookies.set("loggedInProfile", this.props.loggedInProfile, cookiesOptions);

            this.props.history.push("/");   
        }
    }
    render(){
        const props = this.props;
        return (
            <LoginWrapper>
                
                <MainContent onSubmit = {(evt) => {evt.preventDefault();
                //So, basically I need to change this cause I need the token.
                    props.firebase.login({email:props.email,password:props.password})}
                    }>

                    <FormGroup>
                    <StyledLabel htmlFor="email"> Email </StyledLabel>
                    <StyledInput autoFocus type="email" id = "email" name ="email" value={props.email} onChange={(evt)=>{props.fieldChanged(evt)}}/>
                    </FormGroup>

                    <FormGroup>
                    <StyledLabel htmlFor="password"> Password </StyledLabel>
                    <StyledInput type="password" id="password" name="password" value={props.password} onChange={(evt)=>{props.fieldChanged(evt)}}/>
                    </FormGroup>

                    <StyledButton type="submit"> Login </StyledButton> 
                    
                 

                    <ErrorMessage> {props.error} </ErrorMessage>
                    
                </MainContent>
    
                <AlternativeOptions>
                    <StyledLink to = {ACCOUNT_RECOVERY_PATH}> Forgot Password? </StyledLink> 
                    <p>Don't have an account? <StyledLink to = {REGISTER_PATH}> Join here </StyledLink> </p>
                </AlternativeOptions>
    
            </LoginWrapper>
        )
    }
}


//Not really needed for pages like this, more fitting for components / visual stuff than containers, since these aren't passed in
//on creation
LoginPage.propTypes = {
    email : PropTypes.string,
    password: PropTypes.string,
    error: PropTypes.string,
    doneLoggingIn : PropTypes.bool,
}

const formSelector = new FormSelectors(LOGIN_PATH);

const mapStateToProps = createStructuredSelector({

    email: formSelector.makeSelectField("email"),
    password : formSelector.makeSelectField("password"),
    doneLoggingIn : formSelector.makeSelectDone("doneLoggingIn"),
    error : formSelector.makeSelectError(),
    authToken : createSelectAuthToken(),
    loggedInProfile : makeSelectLoggedInProfile(),

});


function mapDispatchToProps(dispatch){
    return {

        fieldChanged : (evt) => {
            const target = evt.target;
            if (evt && evt.preventDefault) evt.preventDefault();
          
           return dispatch(fieldChanged(LOGIN_PATH,target.name,target.value))

        },

        onSubmit : (evt) => {
            const target = evt.target;

        }
    };
}

const withConnect = connect(mapStateToProps,mapDispatchToProps);
const withReducer = injectReducer({key:LOGIN_PATH,reducer});
const withSaga = injectSaga({key:LOGIN_PATH, saga});


export default compose(
  withConnect,
  withSaga,
  withFirebase,
  withReducer,
  withCookies,
)(LoginPage);
