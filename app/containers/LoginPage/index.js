import React from 'react'
import {Link,Route} from 'react-router-dom';
import {loginPressed} from './actions';
import {fieldChanged} from 'containers/App/actions';
import StyledForm from 'components/StyledForm'
import StyledButton from 'components/StyledForm/button';
import StyledLabel from 'components/StyledForm/label';
import ErrorMessage from 'components/StyledForm/errorMessage';

import {connect} from 'react-redux';
import {compose} from 'redux';
import reducer from './reducer';
import injectReducer from 'utils/injectReducer';

import {createSelector} from 'reselect';

const LoginPage = (props) => {

    console.log("rendering Login");
    return (
        <div>
             <StyledForm onSubmit = {() => {props.onSubmit()}}>
                 <StyledLabel htmlFor="email"> Email </StyledLabel>
                 <input type="email" id = "email" name ="email" value={props.email} onChange={(evt)=>{props.fieldChanged(evt)}}/>
                 <StyledLabel htmlFor="password"> Password </StyledLabel>
                 <input type="password" id="password" name="password" value={props.password} onChange={(evt)=>{props.fieldChanged(evt)}}/>
                 <ErrorMessage> {props.error} </ErrorMessage>
                 <StyledButton type="submit"> Login </StyledButton> 
                 <Link to ="/ForgotPassword"> Forgot Password? </Link> <Link to ="/Register"> Don't have an account? Register here. </Link>
            </StyledForm>
        </div>
    )
}

//Will problaby switch this to be selector later.
function mapStateToProps(state){

    var props = {}
    if (state.get("requireVerification")){
        props["error"]  = "Requires Verification";
    }
    props["email"] = state.get("email");
    props["password"] = state.get("password");

    return props;
}

function mapDispatchToProps(dispatch){
    return {

        fieldChanged : (evt) => {
            const target = evt.target;
           return dispatch(fieldChanged(target.name,target.value))

        },

        onSubmit : (evt) => {
            const target = evt.target;

        }
    }
}

const withConnect = connect(mapStateToProps,mapDispatchToProps)
const withReducer = injectReducer({key:"Login",reducer});

export default compose(
  withConnect,
  withReducer
)(LoginPage);
