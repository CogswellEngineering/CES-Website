import React from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import ReactAvatorEditor from 'react-avatar-editor';
import { withFirebase} from 'react-redux-firebase';
import {Link} from 'react-router-dom';
import {fieldChanged} from 'containers/App/actions';
import StyledForm, {StyledButton,StyledLabel,ErrorMessage,StyledInput, StyledSelect, StyledOption} from 'components/StyledForm'
import {connect} from 'react-redux';
import {compose} from 'redux';
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import { makeSelectLoggedIn, makeSelectLoggedInProfile } from 'containers/App/selectors';

import { makeProfileImageSelector } from './selectors';
import FormSelectors from 'utils/genericFormSelectors';
import saga from './saga';
import { onUpdateClicked, profilePictureUploaded } from './actions';
import injectSaga from 'utils/injectSaga';
import { UPDATE_USER_PROFILE_PATH } from 'components/Header/pages';
import {dimensions} from 'components/ProfileImage';

const BioInput = styled.textarea`


    


`
//Todo: 
//Make Styled components for this so it actually looks pretty. It is fully functional.
//Move years and majors info into file called schoolInfo so not keep initializing it.
//
  

const UpdateProfilePage = (props) => {

    
   
    const profileUrl = props.location.pathname.replace("/update","");
    
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
    ];

    //I should have been doing this deconstructing in other cases too.
    const  {loggedInUser, profile, displayName, profilePicture, firstName,lastName, major, year, bio} = props;

    //Once done updating, redirect back to profile.
    if (props.doneUpdating){

        props.history.push(profileUrl);
    }
   else if (props.loading){
       //replace with spinner later.
       return (
            <div>
                
                <p> Updating... </p>
            </div>
            
       )
   }
   
    return (
        <div>
            
             <StyledForm onSubmit = {(evt) => {
                
                //Will clean up this line on register page too later.

                const update = {

                
                    displayName,
                    firstName,
                    lastName,
                    email,
                    password,
                    major,
                    bio,
                };

                 const profileImgs = {
                    
                        old:profile.profile.profilePicture, 
                        new:profilePicture,
                    
                 };
                 
                 props.onUpdate(evt,profileImgs,update);
                 
                 }}>

                 <Dropzone onDrop = {(fileDropped) => {

                    props.profilePictureUploaded(fileDropped);

                     
                 }}>

                 {/* it should match dimensions in profile
                Is this of editor or of cropped image? Cropped Image.*/}
                 <ReactAvatarEditor width = {dimensions.width} height = {dimensions.height}image = {props.profilePicture}/>
                 </Dropzone>
                 
                 <StyledLabel htmlFor="displayName"> Display Name </StyledLabel>
                 <StyledInput type="text" id = "displayName" name ="displayName" value={props.displayName} onChange={(evt)=>{props.fieldChanged(evt)}}/>

                 <StyledLabel htmlFor="firstName"> First Name </StyledLabel>
                 <StyledInput type="text" id = "firstName" name ="firstName" value={props.firstName} onChange={(evt)=>{props.fieldChanged(evt)}}/>
                 <StyledLabel htmlFor="lastName"> Last Name </StyledLabel>
                 <StyledInput type="text" id = "lastName" name ="lastName" value={props.lastName} onChange={(evt)=>{props.fieldChanged(evt)}}/>
                 
                 
                 {/*prob use reactstrap again and grab the dropdown, or find another one, or make my own, whatever's gravy*/}
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


                 <StyledLabel htmlFor="bio"> Bio </StyledLabel>
                 <BioInput id="bio" name="bio" rows="6" cols="10" value={bio} onChange={(evt) => {props.fieldChanged(evt)}}> </BioInput>

                 <ErrorMessage> {props.error} </ErrorMessage>
                 <StyledButton type="submit"> Update </StyledButton> 
                 <Link to = {profileUrl}> Cancel </Link>
            </StyledForm>
        </div>
    )
}


const formSelector = new FormSelectors(UPDATE_USER_PROFILE_PATH);

const mapStateToProps = createStructuredSelector({


    doneUpdating: formSelector.makeSelectDone("doneUpdating"),
    major : formSelector.makeSelectField("major"),
    year: formSelector.makeSelectField("year"),
    bio: formSelector.makeSelectField("bio"),
    displayName : formSelector.makeSelectField("displayName"),
    firstName: formSelector.makeSelectField("firstName"),
    lastName: formSelector.makeSelectField("lastName"),
    error : formSelector.makeSelectError(),
    loading : formSelector.makeSelectDone("loading"),
    loggedInUser : makeSelectLoggedIn(),
    profile : makeSelectLoggedInProfile(),
    profilePicture: makeProfileImageSelector(),
});


function mapDispatchToProps(dispatch){
    
    return {


        profilePictureUploaded: (img) => {

            return dispatch(profilePictureUploaded(img));            
        },

        fieldChanged : (evt) => {
            const target = evt.target;
            if (evt.preventDefault) evt.preventDefault();
           return dispatch(fieldChanged(target.name,target.value))

        },

        //Instead of passing in uid, coulld just get it, but since loading profile, might as well use it from there too.
        onUpdate : (evt,uid,profilePicture,update) => {
            
            if (evt.preventDefault){
                evt.preventDefault();
            }
            
           

            return dispatch(onUpdateClicked(uid,profilePicture,update))

        }
    };
}

const withConnect = connect(mapStateToProps,mapDispatchToProps);
const withReducer = injectReducer({key:UPDATE_USER_PROFILE_PATH,reducer});
const withSaga = injectSaga({key:UPDATE_USER_PROFILE_PATH,saga});

export default compose(
  withConnect,
  withReducer,
  withSaga,
  withFirebase,
)(UpdateProfilePage);
