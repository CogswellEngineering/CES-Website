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
import { UPDATE_USER_PROFILE_PATH, LOGIN_PATH } from 'SiteData/constants';
import {dimensions} from 'components/ProfileImage';
import Dropzone from 'react-dropzone';


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
       
        this.state = {

            profilePicture:null,
            profilePicturePreview:"",
            displayName:"",
            firstName:"",
            lastName:"",
            bio:"",
            major:"",
            year:"",
        };

        this.onFieldUpdate = this.onFieldUpdate.bind(this);
        this.onDropdownSelected = this.onDropdownSelected.bind(this);
        this.onProfilePictureUpdated = this.onProfilePictureUpdated.bind(this);
    }


    componentWillUnmount(){

        this.resetState();
    }

    resetState() {


        if (this.state.profilePicture){

            window.URL.revokeObjectURL(this.state.profilePicturePreview);
        }

        this.setState( {

            profilePicture:null,
            profilePicturePreview:"",
            displayName:"",
            firstName:"",
            lastName:"",
            bio:"",
            major:"",
            year:"",
        });
    }

    onFieldUpdate(evt){

        const target = evt.target;
        this.setState({

            [target.id] : target.value
        });
    }

    onProfilePictureUpdated(acceptedFiles, rejectedFiles){


        this.setState( state => {

            const lastUploaded = state.profilePicture;

            if (lastUploaded != null){

                window.URL.revokeObjectURL(state.profilePicturePreview);
            }

            const profilePicturePreview = window.URL.createObjectURL(acceptedFiles[0]);
                                
            const profilePicture = acceptedFiles[0];

            return {

                profilePicturePreview,
                profilePicture,
            };


        })

    }

    onDropdownSelected(evt, dropDown){

        console.log("evt on dropdown", evt);

        this.setState({

            [dropDown] : evt.value
        });
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


        const  { displayName, profilePicture, profilePicturePreview, firstName,lastName, major, year, bio } = this.state;
        const {  loading, profile, onCancel, onUpdate, error, firebase} = this.props;

        
       
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


                    //So can delete old one.
                    const profileImgs = {
                        
                            old:profile.profilePicture, 
                            new:profilePicture,
                        
                    };

                     const uid = firebase.auth().currentUser.uid;
                    
                     onUpdate(uid,profileImgs,update);
                    
                    }}>



                        <Dropzone onDrop = {this.onProfilePictureUpdated}>

                        {({getRootProps, getInputProps}) => (
                        <ProfilePictureDropzone {...getRootProps()} width = {dimensions.width} height = {dimensions.height}>
                        <input {...getInputProps()} />
                            
                        {
                            profilePicture != null?
                            <img src={profilePicturePreview} width={dimensions.width} height={dimensions.height}/>
                            : profile && profile.profilePicture != null?
                                <img src={profile.profilePicture.url} width={dimensions.width} height={dimensions.height}/>
                            : <DropzonePrompt  width={dimensions.width} height={dimensions.height}>

                                    <p> Click or Drag profile picture here </p>

                             </DropzonePrompt>
                
                        }
                        </ProfilePictureDropzone>   
                        )}
                        </Dropzone>

                    <FieldDiv>
                        
                        <NameDiv>
                            <StyledLabel htmlFor="displayName"> Display Name </StyledLabel>
                            <StyledInput type="text" id = "displayName" name ="displayName" placeholder = {profile.displayName} value={displayName} 
                                onChange={this.onFieldUpdate}/>

                            <StyledLabel htmlFor="firstName"> First Name </StyledLabel>
                            <StyledInput type="text" id = "firstName" name ="firstName"  placeholder = {profile.firstName} value={firstName} 
                              onChange={this.onFieldUpdate}/>
                        
                            <StyledLabel htmlFor="lastName"> Last Name </StyledLabel>
                            <StyledInput type="text" id = "lastName" name ="lastName"  placeholder = {profile.lastName} value={lastName} 
                                onChange={this.onFieldUpdate}/>
                            
                        
                        </NameDiv>
                        <StyledDropdown id="major" options={this.majors} 
                            onChange={ (evt) => {this.onDropdownSelected(evt,"major")} }
                            value={major} placeholder={profile.major || "Select your major"} />



                        <StyledDropdown options={this.years} 
                            onChange={ (evt) => {this.onDropdownSelected(evt,"year")}} 
                            value={year} placeholder={profile.year} />
                        <BioInput>

                            <BioLabel htmlFor="bio"> Bio </BioLabel>
                            
                            <BioTextarea id="bio" name="bio" rows="1" placeholder={profile.bio} value={bio} 
                            onChange={this.onFieldUpdate}> 
                            <a href ="#"> test</a>
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
    error : formSelector.makeSelectError(),
    loading : formSelector.makeSelectDone("loading"),
    loggedInUser : makeSelectLoggedIn(),
    profile : makeSelectLoggedInProfile(),
});


function mapDispatchToProps(dispatch){
    
    return {


        onLoad : (loggedInProfile) => {

                return dispatch(pageLoaded(loggedInProfile));
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
