import React from 'react'
import {Link,Route} from 'react-router-dom';
import {fieldChanged} from 'containers/App/actions';
import StyledForm from 'components/StyledForm'
import StyledButton from 'components/StyledForm/button';
import StyledLabel from 'components/StyledForm/label';
import ErrorMessage from 'components/StyledForm/errorMessage';

import {connect} from 'react-redux';
import {compose} from 'redux';
import reducer from './reducer';
import { withFirebase } from 'react-redux-firebase'
import injectReducer from 'utils/injectReducer';
import {makeSelectField,makeSelectError} from './selectors';
import { createStructuredSelector } from 'reselect';

const LoginPage = (props) => {

   
    //All this time and effor, and their login is using depreacted version
    //I could try to take from their example and do this my self, r since I've already got sagas file made
    //Nah, I mean it works and get's information I need. I need spend more time
    // for more important things than basics like logging in.
    if (props.error !== ""){
        props.firebase.logout();
    }
    return (
        <div>
            
             <StyledForm onSubmit = {(evt) => {evt.preventDefault();props.firebase.login({email:props.email,password:props.password})}}>
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
const mapStateToProps = createStructuredSelector({

    email: makeSelectField("email"),
    password : makeSelectField("password"),
    error : makeSelectError()

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
    }
}

const withConnect = connect(mapStateToProps,mapDispatchToProps)
const withReducer = injectReducer({key:"LoginPage",reducer});


export default compose(
  withConnect,
  withFirebase,
  withReducer
)(LoginPage);
