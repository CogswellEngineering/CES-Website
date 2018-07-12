import React, { Component} from 'react'
import PropTypes from 'prop-types';
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

import {
    UpdateProfileWrapper,
    NameDiv,
    BioInput,
    BioTextarea,
    BioLabel,
    ProfilePictureDiv,
    ProfilePictureLabel,
    ProfilePictureDropzone,
    DropzonePrompt,
    StyledDropdown,
    FieldDiv,
} from 'components/StyledComponents/UpdateProfilePage';

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
    
    componentDidMount(){

         const currentUser = this.props.firebase.auth().currentUser;

         if (currentUser == null){
            this.props.history.push(" ");
         }

         this.profileUrl = "/account/"+currentUser.uid;

         this.props.onLoad(this.props.profile);
    }

    componentDidUpdate(){

        if (this.props.doneUpdating){

            this.props.history.push(this.profileUrl);
        }
    }
    
    render(){


        const  { loading, profile, displayName, profilePicture, firstName,lastName, major, year, bio,
        fieldChanged, onCancel, profilePictureUploaded, onUpdate, error, firebase} = this.props;

        
       
        if (loading){
            //replace with spinner later.
            return (
                    <div>
                        
                        <p> Updating... </p>
                    </div>
                    
            )
         }
    
       
        return (
            <UpdateProfileWrapper>
                
                <StyledForm onSubmit = {(evt) => {
                    
                    evt.preventDefault();
                    //These will be set up with original profile if empty
                    //There has to be cleaner way than this. 
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


                    <ProfilePictureDiv>

                        <StyledLabel> Drag an image into or click on the image to change it</StyledLabel>

                        <ProfilePictureDropzone  width={dimensions.width} height={dimensions.height} onDrop = {(fileDropped) => {

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

                        {/* Will get feedback if having avatar editor is too much.
                        <ReactAvatarEditor width = {dimensions.width} height = {dimensions.height}
                        image = {profilePicture ||  profile.profilePicture}/>*/}

                        </ProfilePictureDropzone>   
                    </ProfilePictureDiv>

                    <FieldDiv>
                        
                        <NameDiv>
                            <StyledLabel htmlFor="displayName"> Display Name </StyledLabel>
                            <StyledInput type="text" id = "displayName" name ="displayName" placeholder = {profile.displayName} value={displayName} 
                                onChange={(evt)=>{fieldChanged(evt.target.name,evt.target.value)}}/>

                            <StyledLabel htmlFor="firstName"> First Name </StyledLabel>
                            <StyledInput type="text" id = "firstName" name ="firstName"  placeholder = {profile.firstName} value={firstName} 
                            onChange={(evt)=>{fieldChanged(evt.target.name,evt.target.value);}}/>
                        
                            <StyledLabel htmlFor="lastName"> Last Name </StyledLabel>
                            <StyledInput type="text" id = "lastName" name ="lastName"  placeholder = {profile.lastName} value={lastName} 
                                onChange={(evt)=>{fieldChanged(evt.target.name,evt.target.value);}}/>
                            
                        
                        </NameDiv>
                        <StyledDropdown id="major" options={this.majors} 
                            onChange={(evt)=>{ console.log(evt);fieldChanged("major",evt.value); }} 
                            value={major} placeholder={profile.major || "Select your major"} />



                        <StyledDropdown options={this.years} 
                            onChange={(evt)=>{ console.log(evt);fieldChanged("year",evt.value); }} 
                            value={year} placeholder={profile.year} />


                        <BioInput>

                            <BioLabel htmlFor="bio"> Bio </BioLabel>
                            
                            <BioTextarea id="bio" name="bio" rows="1" placeholder={profile.bio} value={bio} 
                            onChange={(evt)=>{fieldChanged(evt.target.name,evt.target.value)}}> 
                            
                            </BioTextarea>

                        </BioInput>
                          
                       

                        <ErrorMessage> {error} </ErrorMessage>
                        <StyledButton type="submit"> Update </StyledButton> 
                        <StyledButton onClick = {(evt) => {onCancel();}}> Cancel </StyledButton>
                    </FieldDiv>
                </StyledForm>
            </UpdateProfileWrapper>
     )
    }
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


        onLoad : (loggedInProfile) => {

                return dispatch(pageLoaded(loggedInProfile));
        },

        profilePictureUploaded: (img) => {

            return dispatch(profilePictureUploaded(img));            
        },

        fieldChanged : (name,value) => {
          
            return dispatch(fieldChanged(UPDATE_USER_PROFILE_PATH,name,value))
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
