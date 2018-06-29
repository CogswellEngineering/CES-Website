import React, { Component} from 'react';
import { withFirebase} from 'react-redux-firebase';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import saga from './saga';
import reducer from './reducer';
import { loadProfile, loadedProfile, foundOwnerStatus } from './actions'
import { makeSelectCollection, makeSelectProfile, makeSelectNeedReload, makeSelectOwnership, } from './selectors';
import { createStructuredSelector } from 'reselect';
import { USER_PROFILE_PATH, UPDATE_USER_PROFILE_PATH } from 'components/Header/pages';
import { makeSelectLoggedInProfile } from 'containers/App/selectors';
import {dimensions} from 'components/ProfileImage';


import {

    ProfileWrapper,
    HeaderDiv,
    ProfileHeadline,
    ProfileBio,
    ProfileImage,
    BioText,
    BioHeader,
    ProfileHeadLineH1,
    ProfileHeadLineH2,
    Links,
    ProfileLink,
    StyledLink,
    StyledImageLink,
} from 'components/StyledComponents/UserProfilePage';





class UserProfilePage extends Component{

    componentDidMount(){

        this.loadProfile();
    }

    loadProfile(){
        

        const uid = this.props.match.params.uid;
      
        const currUser = this.props.firebase.auth().currentUser;

        if (currUser == null || uid != currUser.uid){

         //   this.props.ownsProfile(false);
            this.props.loadProfile(uid);
        }
        else{
            
            //The doneloading cache thing is done in app, but if go to this url directly, will reset needReload before have something to reload
            //so this check needed for that.
            if (!this.props.loggedInUserProfile.isEmpty){
                 
                this.props.ownsProfile(true);
                this.props.alreadyLoaded(this.props.loggedInUserProfile);
            }
        }


        
    }

    

    componentDidUpdate(){


        
        //Does get updated here, but need reload shouldn't happen
        if (this.props.needReload == true){

                this.loadProfile();
        }
    }


    render(){

        
        
        //Welp, all the userINfo stuff was waste of time, but still works.
        const props = this.props;

        if (!props.userInfo){
            return null;
        }

        const {firstName, lastName, bio, major, year, profilePicture, mediaLinks} = props.userInfo;

        var profilePicUrl = "default_avator.png";
       
        if (profilePicture != null){
            profilePicUrl = profilePicture.url;
        }
        
        return (
            <ProfileWrapper>
                <HeaderDiv>
                
                
               
                    {props.ownProfile?  
                    //It's so weird that /account/update doesn't work. Not even go to not found. I'm not using anything specific from url th
                        <div>
                            
                            <ProfileLink to={props.location.pathname+"/update"}> Update Profile </ProfileLink>
                            
                        </div>
                    : null }



                {/*If profile image not downloaded then stop, it no longer takes while
                after first session I could send get request for profile lodaed*/}
                <ProfileImage src={profilePicUrl} alt={"No image given"}  width={dimensions.width} height={dimensions.height}/>
                <Links>
                
                    {/*Need to add media links, and bio in update profile.*/}
                    { (mediaLinks == null)? null : 

                        mediaLinks.map(link => {

                            return (<StyledLink href={link.url}> <StyledImageLink src = {link.image}/> {link.name} </StyledLink>);
                        })
                    }
                    
                <StyledLink href="https://github.com/ChristianBasiga"><StyledImageLink  src="https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png"/></StyledLink>


                </Links>

                <ProfileHeadline> 
                    <ProfileHeadLineH1>{firstName} {lastName}</ProfileHeadLineH1>
                      <ProfileHeadLineH2> {major} </ProfileHeadLineH2>
                      <ProfileHeadLineH2> {year} </ProfileHeadLineH2>

                </ProfileHeadline>
                
            
                </HeaderDiv>


                <ProfileBio>
                    <BioHeader> Bio </BioHeader>
                    <BioText> {bio || "No Bio given"} </BioText>
                </ProfileBio>          

            </ProfileWrapper>

        )
    }
}



const mapStateToProps = createStructuredSelector({

    ownProfile : makeSelectOwnership(),
    needReload: makeSelectNeedReload(),
    loggedInUserProfile: makeSelectLoggedInProfile(),
    userInfo: makeSelectProfile(),

});

function mapDispatchToProps(dispatch){

    return {

        ownsProfile : (doesOwn) => {
            return dispatch(foundOwnerStatus(doesOwn));
        },
        replaceInventory : (inventoryID, page ) => {

            return dispatch(nextPageClicked(inventoryID,page));
        },

        loadProfile : (uid) => {

            return dispatch(loadProfile(uid));
        },
        alreadyLoaded: (profile) => {

            return dispatch(loadedProfile(profile));
        },
    }
}


const withConnect = connect(mapStateToProps,mapDispatchToProps);
const withReducer = injectReducer({key:USER_PROFILE_PATH,reducer});
const withSaga = injectSaga({key:USER_PROFILE_PATH,saga})

export default compose(
    withConnect,
    withReducer,
    withFirebase,
    withSaga,
)(UserProfilePage);
