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

const LoginPage = (props) => {

   
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
                 <Link to ="/ForgotPassword"> Forgot Password? </Link> <Link to ="/Register"> Don't have an account? Register here. </Link>
            </StyledForm>
        </div>
    )
}


LoginPage.propTypes = {
    email : PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
}

const formSelector = new FormSelectors("LoginPage");

const mapStateToProps = createStructuredSelector({

    email: formSelector.makeSelectField("email"),
    password : formSelector.makeSelectField("password"),
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
const withReducer = injectReducer({key:"LoginPage",reducer});


export default compose(
  withConnect,
  withFirebase,
  withReducer
)(LoginPage);
