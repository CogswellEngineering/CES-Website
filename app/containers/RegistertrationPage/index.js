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
import saga from './saga';
import { onRegisterClicked } from './actions';
import injectSaga from 'utils/injectSaga';

const RegistrationPage = (props) => {

   
   
    return (
        <div>
            
             <StyledForm onSubmit = {(evt) => {props.onRegister(evt,props.displayName,props.email,props.password);}}>
                 
                 <StyledLabel htmlFor="displayName"> Display Name </StyledLabel>
                 <StyledInput type="text" id = "displayName" name ="displayName" value={props.displayName} onChange={(evt)=>{props.fieldChanged(evt)}}/>
                 
                 <StyledLabel htmlFor="email"> Email (Must be a cogswell email) </StyledLabel>
                 <StyledInput type="email" id = "email" name ="email" value={props.email} onChange={(evt)=>{props.fieldChanged(evt)}}/>
                 
                 <StyledLabel htmlFor="password"> Password </StyledLabel>
                 <StyledInput type="password" id="password" name="password" value={props.password} onChange={(evt)=>{props.fieldChanged(evt)}}/>
                 
                 <StyledLabel htmlFor="major"> Major </StyledLabel>

                 <ErrorMessage> {props.error} </ErrorMessage>
                 <StyledButton type="submit"> Register </StyledButton> 
                 <Link to ="/Login"> Already have an account? Login here. </Link>
            </StyledForm>
        </div>
    )
}


RegistrationPage.propTypes = {
    email : PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
   // major: PropTypes.string.isRequired,
}


const formSelector = new FormSelectors("RegistrationPage");

const mapStateToProps = createStructuredSelector({

    email: formSelector.makeSelectField("email"),
    password : formSelector.makeSelectField("password"),
 //   major : formSelector.makeSelectField("major"),
    displayName : formSelector.makeSelectField("displayName"),
    error : formSelector.makeSelectError()
});


function mapDispatchToProps(dispatch){
    return {

        fieldChanged : (evt) => {
            const target = evt.target;
            if (evt.preventDefault) evt.preventDefault();
           return dispatch(fieldChanged(target.name,target.value))

        },

        onRegister : (evt,displayName,email,password) => {
            
            if (evt.preventDefault){
                evt.preventDefault();
            }
            const formData = new FormData();
            formData.append("displayName",displayName);
            formData.append("email",email);
            formData.append("password",password);
            formData.append("major","High");


            return dispatch(onRegisterClicked(formData))

        }
    };
}

const withConnect = connect(mapStateToProps,mapDispatchToProps);
const withReducer = injectReducer({key:"RegistrationPage",reducer});
const withSaga = injectSaga({key:"RegistrationPage",saga});

export default compose(
  withConnect,
  withFirebase,
  withReducer,
  withSaga,
)(RegistrationPage);
