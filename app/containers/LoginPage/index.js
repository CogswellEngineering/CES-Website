import React from 'react'
import PropTypes from 'prop-types';
import {Link,Route} from 'react-router-dom';
import {fieldChanged} from 'containers/App/actions';
import StyledForm, {StyledButton,StyledLabel,ErrorMessage,StyledInput} from 'components/StyledForm'
import {connect} from 'react-redux';
import {compose} from 'redux';
import { withFirebase } from 'react-redux-firebase'
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import FormSelectors from 'utils/genericFormSelectors';
import { ACCOUNT_RECOVERY_PATH, REGISTER_PATH, LOGIN_PATH } from 'components/Header/pages';

const LoginPage = (props) => {

    //WHAT HAPPEND, THIS WAS WORKING FINE WTF, oh wait no the error stuff working was in register,
    if (props.doneLoggingIn){
        //For now just go back, then I'll redirect as neccessarry coming from other places
        //Whether I'll set up the back like did in previous is another story, I should, reason is if redirected to here from printing page.
             props.history.push("/");   
        return null;
    }
   
   
    return (
        <div>
            
             <StyledForm onSubmit = {(evt) => {evt.preventDefault();
                props.firebase.login({email:props.email,password:props.password})}
                }>
                 <StyledLabel htmlFor="email"> Email </StyledLabel>
                 <StyledInput type="email" id = "email" name ="email" value={props.email} onChange={(evt)=>{props.fieldChanged(evt)}}/>
                 <StyledLabel htmlFor="password"> Password </StyledLabel>
                 <StyledInput type="password" id="password" name="password" value={props.password} onChange={(evt)=>{props.fieldChanged(evt)}}/>
                 <ErrorMessage> {props.error} </ErrorMessage>
                 <StyledButton type="submit"> Login </StyledButton> 
                 <Link to ={ACCOUNT_RECOVERY_PATH}> Forgot Password? </Link> <Link to ={REGISTER_PATH}> Don't have an account? Register here. </Link>
            </StyledForm>
        </div>
    )
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
    error : formSelector.makeSelectError()

});


function mapDispatchToProps(dispatch){
    return {

        fieldChanged : (evt) => {
            const target = evt.target;
            if (evt && evt.preventDefault) evt.preventDefault();
           return dispatch(fieldChanged(target.name,target.value))

        },

        onSubmit : (evt) => {
            const target = evt.target;

        }
    };
}

const withConnect = connect(mapStateToProps,mapDispatchToProps);
const withReducer = injectReducer({key:LOGIN_PATH,reducer});


export default compose(
  withConnect,
  withFirebase,
  withReducer
)(LoginPage);
