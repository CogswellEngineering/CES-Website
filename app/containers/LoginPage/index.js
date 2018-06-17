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

    if (props.doneLoggingIn){
        //For now just go back, then I'll redirect as neccessarry coming from other places
        //Whether I'll set up the back like did in previous is another story.
        props.history.goBack();
    }
   
    if (props.error !== ""){
        props.firebase.logout();
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


LoginPage.propTypes = {
    email : PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    error: PropTypes.string,
}

const formSelector = new FormSelectors(LOGIN_PATH);

const mapStateToProps = createStructuredSelector({

    email: formSelector.makeSelectField("email"),
    password : formSelector.makeSelectField("password"),
    doneLoggingIn : formSelector.makeSelectField("doneLoggingIn"),
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
