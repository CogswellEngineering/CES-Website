import React, { Component} from 'react'
import PropTypes from 'prop-types';
import {fieldChanged} from 'containers/App/actions';
import  {StyledButton,StyledLabel,ErrorMessage,StyledInput, StyledLink } from 'components/StyledForm'
import {connect} from 'react-redux';
import {compose} from 'redux';
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import FormSelectors from 'utils/genericFormSelectors';
import saga from './saga';
import { onRegisterClicked } from './actions';
import { withFirebase } from 'react-redux-firebase';
import injectSaga from 'utils/injectSaga';
import { LOGIN_PATH, REGISTER_PATH} from 'SiteData/constants';

import  {
    RegistrationWrapper,
    StyledDropDown,
} from 'components/StyledComponents/RegistrationPage';

import {DropdownSection} from 'components/StyledComponents/UpdateProfilePage';

import {
    Button
} from 'components/General';

class RegistrationPage extends Component{
 
    constructor(props){

        super(props);

          //Might turn these into classses to avoid constatnly remaking this.
          this.years = [
                    
            "Freshman",
            "Sophomore",
            "Junior",
            "Senior",
            "Alumni",
            ];

            

        this.majors = [

            "Computer Science",
            "Digital Audio Technology",
            "Digital Arts Engineering",
            "Digital Arts Animation",
            "Game Design Engineering",
            "Game Design Writing",
            "Game Design Art",
            "Project Management",
        ];
       
    }

    
    render(){

        const props = this.props;

   
        if (props.doneRegistering){

            console.log("here done registering");
            return (
                <div>

                {/*  Might not have verification to reduce hassle on them <p> A verification email has been sent*/}
                    <p> Your account has been created, click <StyledLink to={LOGIN_PATH}> here </StyledLink> to login. </p>
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
        
   
        return (
            <RegistrationWrapper>
                
                    
                       
                        <StyledLabel htmlFor="email"> Email (Must be a cogswell email) </StyledLabel>
                        <StyledInput  type="email" id = "email" name ="email" value={props.email} onChange={(evt)=>{props.fieldChanged(evt)}} autoFocus/>
                        <StyledLabel htmlFor="password"> Password </StyledLabel>
                        <StyledInput type="password" id="password" name="password" value={props.password} onChange={(evt)=>{props.fieldChanged(evt)}}/>


                        <StyledLabel htmlFor="displayName"> Display Name </StyledLabel>
                        
                        <StyledInput type="text" id = "displayName" name ="displayName" value={props.displayName} onChange={(evt)=>{props.fieldChanged(evt)}}/>

                        <StyledLabel htmlFor="firstName"> First Name </StyledLabel>
                        <StyledInput type="text" id = "firstName" name ="firstName" value={props.firstName} onChange={(evt)=>{props.fieldChanged(evt)}}/>
                        <StyledLabel htmlFor="lastName"> Last Name </StyledLabel>
                        <StyledInput type="text" id = "lastName" name ="lastName" value={props.lastName} onChange={(evt)=>{props.fieldChanged(evt)}}/>
                 

                    
                    <DropdownSection style = {{width:"100%"}}>
                    <div>
                        <StyledLabel htmlFor = "major"> Major </StyledLabel>
                        <StyledDropDown id = "major" options={this.majors} 
                                    onChange={(evt)=>{ console.log(evt);fieldChanged("major",evt.value); }} 
                                    value={props.major} placeholder="Select your major" />
                    </div>

                    <div>
                        <StyledLabel htmlFor = "year"> Year </StyledLabel>
                        <StyledDropDown id = "year" options={this.years} 
                                    onChange={(evt)=>{ console.log(evt);fieldChanged("year",evt.value); }} 
                                    value={props.year} placeholder="Select your year" />
                    </div>
                    </DropdownSection>
                    <ErrorMessage> {props.error} </ErrorMessage>
                    <Button type="submit"  onClick = {(evt) => {props.onRegister(evt,props.displayName,props.firstName,props.lastName,props.email,props.password,props.major);}}> Register </Button> 
                    <p>Already have an account? <StyledLink to = {LOGIN_PATH}> Login  </StyledLink> </p>



            </RegistrationWrapper>
        )
    }
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
           return dispatch(fieldChanged(REGISTER_PATH,target.name,target.value))

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
