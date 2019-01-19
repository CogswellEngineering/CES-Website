import React, { Component} from 'react'
import PropTypes from 'prop-types';
import ReactAvatarEditor from 'react-avatar-editor';
import { withFirebase} from 'react-redux-firebase';
import {Link} from 'react-router-dom';
import Dropdown from 'react-dropdown'

import {fieldChanged} from 'containers/App/actions';
import StyledForm, {StyledButton,StyledLabel,ErrorMessage,StyledInput, StyledSelect, StyledOption,
ContentField} from 'components/StyledForm'
import {connect} from 'react-redux';
import {compose} from 'redux';
import injectReducer from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import Dropzone from 'react-dropzone';

import { makeSelectLoggedIn, makeSelectLoggedInProfile } from 'containers/App/selectors';

import { makeProfileImageSelector } from './selectors';
import FormSelectors from 'utils/genericFormSelectors';
import saga from './saga';
import { onUpdateClicked, profilePictureUploaded, onUpdateCancelled, pageLoaded } from './actions';
import injectSaga from 'utils/injectSaga';
import { UPDATE_USER_PROFILE_PATH, LOGIN_PATH } from 'SiteData/constants';
import {dimensions} from 'components/ProfileImage';

import {ProfilePicture} from 'components/General';
import TagForm from 'components/TagForm';
import Tags from 'components/Tags';
import {
    UpdateProfileWrapper,
    BioInput,
    BioTextarea,
    BioLabel,
    ProfilePictureLabel,
    ProfilePictureDropzone,
    DropzonePrompt,
    DropdownSection,
    Footer,
} from 'components/StyledComponents/UpdateProfilePage';

import 'react-dropdown/style.css'


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
            concentrations:[],
        };

        this.onFieldUpdate = this.onFieldUpdate.bind(this);
        this.onAddConcentration = this.onAddConcentration.bind(this);
        this.onRemoveConcentration = this.onRemoveConcentration.bind(this);
        this.onDropdownSelected = this.onDropdownSelected.bind(this);
    
        this.onProfilePictureUpdated = this.onProfilePictureUpdated.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
    
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

    onAddConcentration(concentration){

        this.setState(state => {

            const newConcentrations = state.concentrations.concat(concentration);


            return {

                concentrations: newConcentrations,
            }
        });

    }

    onRemoveConcentration(concentration){
        
        this.setState(state => {

            //Filtering to not include the removed tag
            const newConcentrations = state.concentrations.filter( currentConcentration => {

                return concentration.title !== concentration.title;
            });


            return {
                concentrations: newConcentrations
            };
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
         this.setState({
             bio:this.props.profile.bio,
             concentrations: this.props.profile.concentrations,
         });

         this.props.onLoad(this.props.profile);
    }

    componentDidUpdate(){

        if (this.props.doneUpdating){

            this.props.history.push(this.profileUrl);
        }
    }

    onUpdate(){

        const  { displayName, profilePicture, concentrations, profilePicturePreview, firstName,lastName, major, year, bio } = this.state;

        const { profile, onUpdate, firebase} = this.props;

                    
        const update = {
            //Should work cause will use key to get same value from profile object.
            displayName: displayName == ""? profile.displayName : displayName,
            firstName: firstName == ""? profile.firstName : firstName,
            concentrations: concentrations,
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

        //Replace with selector later.
         const uid = firebase.auth().currentUser.uid;
        
         onUpdate(uid,profileImgs,update);
        
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
                
                
                        <Dropzone onDrop = {this.onProfilePictureUpdated}>

                        {({getRootProps, getInputProps}) => (
                        <ProfilePictureDropzone {...getRootProps()}>
                        <input {...getInputProps()} />
                            
                        {
                            profilePicture != null?
                            <ProfilePicture src={profilePicturePreview}/>
                            : profile && profile.profilePicture != null?
                                <ProfilePicture src={profile.profilePicture.url} />
                            : <DropzonePrompt  width={dimensions.width} height={dimensions.height}>

                                    <p> Click or Drag profile picture here </p>

                             </DropzonePrompt>
                
                        }
                        </ProfilePictureDropzone>   
                        )}
                        </Dropzone>

                        
                            <StyledLabel htmlFor="displayName"> Display Name </StyledLabel>
                            <StyledInput type="text" id = "displayName" name ="displayName" placeholder = {profile.displayName} value={displayName} 
                                onChange={this.onFieldUpdate}/>

                            <StyledLabel htmlFor="firstName"> First Name </StyledLabel>
                            <StyledInput type="text" id = "firstName" name ="firstName"  placeholder = {profile.firstName} value={firstName} 
                              onChange={this.onFieldUpdate}/>
                        
                            <StyledLabel htmlFor="lastName"> Last Name </StyledLabel>
                            <StyledInput type="text" id = "lastName" name ="lastName"  placeholder = {profile.lastName} value={lastName} 
                                onChange={this.onFieldUpdate}/>
                            
                        <DropdownSection>
                        <div>
                            <StyledLabel htmlFor = "major"> Major </StyledLabel>
                            <Dropdown id="major" options={this.majors} 
                                onChange={ (evt) => {this.onDropdownSelected(evt,"major")} }
                                value={major} placeholder={profile.major || "Select your major"} />
                        </div>


                        <div>
                            <StyledLabel htmlFor = "year"> Year </StyledLabel>
                            <Dropdown id = "year" options={this.years} 
                                onChange={ (evt) => {this.onDropdownSelected(evt,"year")}} 
                                value={year} placeholder={profile.year} />
                        </div>
                        </DropdownSection>

                        <div>
                            {/*Later add functionality to search users with this concentration*/}
                            <Tags tags = {this.state.concentrations}/>
                            <TagForm onAddTag = {this.onAddConcentration}/>

                        </div>

                        <BioInput>

                            <BioLabel htmlFor="bio"> Bio </BioLabel>
                            
                            <ContentField id="bio" name="bio" value={bio} 
                            onChange={this.onFieldUpdate}> 
                            </ContentField>

                        </BioInput>
                          
                       

                        <ErrorMessage> {error} </ErrorMessage>
                        <Footer>
                        <StyledButton onClick = {this.onUpdate}> Update </StyledButton> 
                        <StyledButton onClick = {onCancel}> Cancel </StyledButton>
                        </Footer>

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
