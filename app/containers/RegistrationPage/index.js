import React from 'react'
import PropTypes from 'prop-types';
import {Link,Route} from 'react-router-dom';
import {fieldChanged} from 'containers/App/actions';
import StyledForm, {StyledButton,StyledLabel,ErrorMessage,StyledInput, StyledSelect, StyledOption} from 'components/StyledForm'
import {connect} from 'react-redux';
import {compose} from 'redux';
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import FormSelectors from 'utils/genericFormSelectors';
import saga from './saga';
import { onRegisterClicked } from './actions';
import injectSaga from 'utils/injectSaga';
import { LOGIN_PATH, REGISTER_PATH} from 'components/Header/pages';

const RegistrationPage = (props) => {

   
    if (props.doneRegistering){

        console.log("here done registering");
        return (
            <div>

              {/*  Might not have verification to reduce hassle on them <p> A verification email has been sent*/}
                <p> Your account has been created, click <Link to={LOGIN_PATH}> here </Link> to login. </p>
            </div>


        )
    }
   else if (props.loading){
       //replace with spinner later.
       return (
            <div>
                
                <p> Registering... </p>
            </div>
            
       )
   }
     
   //Might turn these into classses to avoid constatnly remaking this.
   const years = [
        
    "Freshman",
    "Sophomore",
    "Junior",
    "Senior",
    "Alumni",
    ];

    //later will be pulling these from firestore, for now this is fine.
    const majors = [

        "Computer Science",
        "Game Design Engineering",
        "Audio Engineering",
        "Digital Arts Engineering",
    ]
    return (
        <div>
            
             <StyledForm onSubmit = {(evt) => {props.onRegister(evt,props.displayName,props.firstName,props.lastName,props.email,props.password,props.major);}}>
                 
                 <StyledLabel htmlFor="displayName"> Display Name </StyledLabel>
                 <StyledInput type="text" id = "displayName" name ="displayName" value={props.displayName} onChange={(evt)=>{props.fieldChanged(evt)}}/>

                 <StyledLabel htmlFor="firstName"> First Name </StyledLabel>
                 <StyledInput type="text" id = "firstName" name ="firstName" value={props.firstName} onChange={(evt)=>{props.fieldChanged(evt)}}/>
                 <StyledLabel htmlFor="lastName"> Last Name </StyledLabel>
                 <StyledInput type="text" id = "lastName" name ="lastName" value={props.lastName} onChange={(evt)=>{props.fieldChanged(evt)}}/>
                 
                 <StyledLabel htmlFor="email"> Email (Must be a cogswell email) </StyledLabel>
                 <StyledInput type="email" id = "email" name ="email" value={props.email} onChange={(evt)=>{props.fieldChanged(evt)}}/>
                 
                 <StyledLabel htmlFor="password"> Password </StyledLabel>
                 <StyledInput type="password" id="password" name="password" value={props.password} onChange={(evt)=>{props.fieldChanged(evt)}}/>
                 
                 <StyledLabel htmlFor="major"> Major </StyledLabel>
                 <StyledSelect id="major">
                    {majors.map(major => {
                        return <StyledOption name="major" value = {major} onClick={(evt) => {props.fieldChanged(evt)}}> {major} </StyledOption>
                    })}
                 
                 </StyledSelect>
                 
                 <StyledLabel htmlFor="Year"> Year </StyledLabel>
                 <StyledSelect id="year">
                    {years.map(year => {
                        return <StyledOption name="year" value = {year} onClick={(evt) => {props.fieldChanged(evt)}}> {year} </StyledOption>
                    })}

                 </StyledSelect>

                 <ErrorMessage> {props.error} </ErrorMessage>
                 <StyledButton type="submit"> Register </StyledButton> 
                 <Link to = {LOGIN_PATH}> Already have an account? Login here. </Link>
            </StyledForm>
        </div>
    )
}


RegistrationPage.propTypes = {
    doneRegistering: PropTypes.bool,
    email : PropTypes.string,
    password: PropTypes.string,
    displayName: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,

    major: PropTypes.string.isRequired,
}


const formSelector = new FormSelectors(REGISTER_PATH);

const mapStateToProps = createStructuredSelector({


    email: formSelector.makeSelectField("email"),
    password : formSelector.makeSelectField("password"),
    doneRegistering: formSelector.makeSelectDone("doneRegistering"),
    major : formSelector.makeSelectField("major"),
    displayName : formSelector.makeSelectField("displayName"),
    firstName: formSelector.makeSelectField("firstName"),
    lastName: formSelector.makeSelectField("lastName"),
    error : formSelector.makeSelectError(),
    loading : formSelector.makeSelectDone("loading"),
});


function mapDispatchToProps(dispatch){
    return {

        fieldChanged : (evt) => {
            const target = evt.target;
            if (evt.preventDefault) evt.preventDefault();
           return dispatch(fieldChanged(target.name,target.value))

        },

        onRegister : (evt,displayName,firstName,lastName,email,password,major) => {
            
            if (evt.preventDefault){
                evt.preventDefault();
            }
            console.log("email here,", email);
            
            const credentials = {

                displayName,
                firstName,
                lastName,
                email,
                password,
                major,
            };

            return dispatch(onRegisterClicked(credentials))

        }
    };
}

const withConnect = connect(mapStateToProps,mapDispatchToProps);
const withReducer = injectReducer({key:REGISTER_PATH,reducer});
const withSaga = injectSaga({key:REGISTER_PATH,saga});

export default compose(
  withConnect,
  withReducer,
  withSaga,
)(RegistrationPage);
