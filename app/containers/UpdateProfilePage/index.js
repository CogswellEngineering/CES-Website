import React, { Component} from 'react'
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import ReactAvatarEditor from 'react-avatar-editor';
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
import { onUpdateClicked, profilePictureUploaded, onUpdateCancelled, pageLoaded } from './actions';
import injectSaga from 'utils/injectSaga';
import { UPDATE_USER_PROFILE_PATH, LOGIN_PATH } from 'components/Header/pages';
import {dimensions} from 'components/ProfileImage';
import {ProfileImage } from 'containers/UserProfilePage/';

const BioInput = styled.textarea`


    


`

const ProfileDropzone = styled(Dropzone)    `

    margin-top:1%;
    width : ${props =>  props.width};
    height : ${props => props.height};
    border:3px dashed black;
    
    margin-left:1%;
`

const DropzonePrompt = styled.div`
    width : ${props =>  props.width};
    height : ${props => props.height};
    margin-left:3%;

`

const FieldDiv = styled.div`


    margin-top:1%;
`
//Todo: 
//Make Styled components for this so it actually looks pretty. It is fully functional.
//Move years and majors info into file called schoolInfo so not keep initializing it.
//
  

class UpdateProfilePage extends Component{


    constructor(props){

        super(props);
         
        this.years = [

            "Freshman",
            "Sophomore",
            "Junior",
            "Senior",
            "Alumni",
        ];

        //later will be pulling these from firestore, for now this is fine.
        this.majors = [

            "Computer Science",
            "Game Design Engineering",
            "Audio Engineering",
            "Digital Arts Engineering",
        ];

    }
    
    componentDidMount(){

         const currentUser = this.props.firebase.auth().currentUser;

         if (currentUser == null){
             //Or just not found it?
            this.props.history.push(LOGIN_PATH);
         }

         this.profileUrl = "/account/"+currentUser.uid;

         //Because of the slight delay for profile data to load, it might actually better for me to just do the ifs to get it to work.
         this.props.onLoad(this.props.profile);
    }

    componentDidUpdate(){

        if (this.props.doneUpdating){

            this.props.history.push(this.profileUrl);
        }
    }
    
    render(){

        //I should have been doing this deconstructing in other cases too.
        const  { loading, profile, displayName, profilePicture, firstName,lastName, major, year, bio,
        fieldChanged, onCancel, profilePictureUploaded, onUpdate, error, firebase} = this.props;

      //  console.log("profile",profile);
        
       
        if (loading){
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
                    evt.preventDefault();
                    //These will be set up with original profile if empty
                    //There has to be cleaner way than this, yeahh setting up initial state to be this.
                    //Just looping

                    console.log("Profile submited in update",major);
                    const update = {

                    
                        //Should work cause will use key to get same value from profile object.
                        displayName: displayName == ""? profile.displayName : displayName,
                        firstName: firstName == ""? profile.firstName : firstName,
                        lastName: lastName == ""? profile.lastName : lastName,
                        major: major == ""? profile.major : major,
                        year: year == ""? profile.year : year,
                        bio: bio == ""? profile.bio : bio,
                       
                    };

                    console.log("Profile picture",profilePicture);

                    const profileImgs = {
                        
                            old:profile.profilePicture, 
                            new:profilePicture,
                        
                    };

                     const uid = firebase.auth().currentUser.uid;
                    
                     onUpdate(uid,profileImgs,update);
                    
                    }}>

                    <ProfileDropzone  width={dimensions.width} height={dimensions.height} onDrop = {(fileDropped) => {

                        profilePictureUploaded(fileDropped);
                        
                    }}>

                    {
                        profilePicture != null?
                            <img src={profilePicture.preview} width={dimensions.width} height={dimensions.height}/>
                        : profile.profilePicture != null?
                            <img src={profile.profilePicture.url} width={dimensions.width} height={dimensions.height}/>
                        : <DropzonePrompt  width={dimensions.width} height={dimensions.height}>

                                <p> Click / Drag profile picture here </p>

                           </DropzonePrompt>
                            

                    }

                    {/*<ReactAvatarEditor width = {dimensions.width} height = {dimensions.height}
                    image = {profilePicture ||  profile.profilePicture}/>*/}

                    </ProfileDropzone>

                    <FieldDiv>
                        
                        <StyledLabel htmlFor="displayName"> Display Name </StyledLabel>
                        <StyledInput type="text" id = "displayName" name ="displayName" placeholder = {profile.displayName} value={displayName} onChange={(evt)=>{fieldChanged(evt)}}/>

                        <StyledLabel htmlFor="firstName"> First Name </StyledLabel>
                        <StyledInput type="text" id = "firstName" name ="firstName"  placeholder = {profile.firstName} value={firstName} onChange={(evt)=>{fieldChanged(evt)}}/>
                        <StyledLabel htmlFor="lastName"> Last Name </StyledLabel>
                        <StyledInput type="text" id = "lastName" name ="lastName"  placeholder = {profile.lastName} value={lastName} onChange={(evt)=>{fieldChanged(evt)}}/>
                        
                        
                        {/*prob use reactstrap again and grab the dropdown, or find another one, or make my own, whatever's gravy*/}
                        <StyledLabel htmlFor="major"> Major </StyledLabel>


                        <StyledSelect id="major" name="major" value={major} onClick={(evt) => {fieldChanged(evt)}}>
                            {this.majors.map(major => {
                                return <StyledOption key={major} value = {major} > {major} </StyledOption>
                            })}
                        
                        </StyledSelect>
                        
                        <StyledLabel htmlFor="Year"> Year </StyledLabel>
                        <StyledSelect id="year" name="major" value={major} onClick={(evt) => {fieldChanged(evt)}}>
                            {this.years.map(year => {
                                return <StyledOption key = {year} value = {year} > {year} </StyledOption>
                            })}

                        </StyledSelect>


                        <StyledLabel htmlFor="bio"> Bio </StyledLabel>
                        <BioInput id="bio" name="bio" rows="6" cols="10" placeholder={profile.bio} value={bio} onChange={(evt) => {fieldChanged(evt)}}> </BioInput>

                        <ErrorMessage> {error} </ErrorMessage>
                        <StyledButton type="submit"> Update </StyledButton> 
                        <StyledButton onClick = {(evt) => {onCancel();}}> Cancel </StyledButton>
                    </FieldDiv>
                </StyledForm>
            </div>
     )
    }
}


const formSelector = new FormSelectors(UPDATE_USER_PROFILE_PATH);

const mapStateToProps = createStructuredSelector({


    doneUpdating: formSelector.makeSelectDone("doneUpdating"),
    //Should all be in newProfile to make updating it easier in terms of onload, but nah.
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


        onLoad : (loggedInProfile) => {

                return dispatch(pageLoaded(loggedInProfile));
        },

        profilePictureUploaded: (img) => {

            return dispatch(profilePictureUploaded(img));            
        },

        fieldChanged : (evt) => {

            console.log(evt);
            const target = evt.target;
            if (evt.preventDefault) evt.preventDefault();
           return dispatch(fieldChanged(target.name,target.value))

        },

        onCancel : (evt) => {

            if (evt && evt.preventDefault){
                evt.preventDefault();
            }
            return dispatch(onUpdateCancelled());
        },

        //Instead of passing in uid, coulld just get it, but since loading profile, might as well use it from there too.
        onUpdate : (uid,profilePicture,update) => {
            
           

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
