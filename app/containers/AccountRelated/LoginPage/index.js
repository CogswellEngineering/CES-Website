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
    LoginInput,
    LoginButton,

} from 'components/StyledComponents/LoginPage';

class LoginPage extends Component { 
    
    
    


    componentDidMount(){

        console.log("Props",this.props);

        //So now need to check query params
        
    }

    componentDidUpdate(){

      //  console.log("Props",this.props);

        //Store auth token into cookies for subdomains to use to log in and maintain auth state
        if (this.props.doneLoggingIn){


            const cookiesOptions = {
                path: '/',
                domains:"http://localhost"
            };

            //Setting it is fucking it up?
            this.props.cookies.set("authToken",this.props.authToken,cookiesOptions);

            //This is needed as they will printing service will require credits, and layout there need display name.
            //Also other information for ordering print and other services.
            this.props.cookies.set("loggedInProfile", this.props.loggedInProfile, cookiesOptions);

            console.log("cookies", this.props.cookies);

           //Why did this break???

            this.props.history.push("/");   
        }
    }
    render(){
        
        const props = this.props;
        return (
            <LoginWrapper>
                
                <MainContent onSubmit = {(evt) => {evt.preventDefault();
                //So, basically I need to change this cause I need the token.
                    props.firebase.login({email:props.email,password:props.password});
                    //Need to figure out when I'll set the cookies on this end.
                }
                    }>

                    <FormGroup>
                    <StyledLabel htmlFor="email"> Email </StyledLabel>
                    <LoginInput autoFocus type="email" id = "email" name ="email" value={props.email} onChange={(evt)=>{props.fieldChanged(evt)}}/>
                    </FormGroup>

                    <FormGroup>
                    <StyledLabel htmlFor="password"> Password </StyledLabel>
                    <LoginInput type="password" id="password" name="password" value={props.password} onChange={(evt)=>{props.fieldChanged(evt)}}/>
                    </FormGroup>

                    <LoginButton type="submit"> Login </LoginButton> 
                    
                 

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


//With router not here?
export default compose(
  withConnect,
  withSaga,
  withFirebase,
  withReducer,
  withCookies,
)(LoginPage);
