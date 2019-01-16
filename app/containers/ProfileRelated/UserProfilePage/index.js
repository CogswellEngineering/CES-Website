import React, { Component} from 'react';
import { withFirebase} from 'react-redux-firebase';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import saga from './saga';
import reducer from './reducer';
import { loadProfile, loadedProfile, foundOwnerStatus } from './actions'
import {makeSelectProfile, makeSelectNeedReload, makeSelectOwnership, } from './selectors';
import { createStructuredSelector } from 'reselect';
import { USER_PROFILE_PATH, UPDATE_USER_PROFILE_PATH } from 'components/Header/pages';
import { makeSelectLoggedInProfile, makeSelectLoggedIn } from 'containers/App/selectors';
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
        
        console.log("loggedInProfile", this.props.loggedInUserProfile);

        const uid = this.props.match.params.uid;
        const currUser = this.props.loggedInUser;

        if (currUser == null || uid != currUser.uid){

            this.props.loadProfile(uid);
        }
        else{
                            
            this.props.alreadyLoaded(this.props.loggedInUserProfile);
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

        const uid = this.props.match.params.uid;
        const ownProfile = (uid == props.loggedInUser.uid);

        //Gotta do this every render cause they log out.
        return (
            <ProfileWrapper>
                <HeaderDiv>
                
                
               
                    {ownProfile?  
                    //It's so weird that /account/update doesn't work. Not even go to not found. I'm not using anything specific from url th
                        <div>
                            
                            <ProfileLink to={props.location.pathname+"/update"}> Update Profile </ProfileLink>
                            
                        </div>
                    : null }



                {/*If profile image not downloaded then stop, it no longer takes while
                after first session I could send get request for profile lodaed
                This works, but so that image loads in faster, I will instead send ftp request and save it
                locally.*/}
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

    needReload: makeSelectNeedReload(),
    loggedInUser: makeSelectLoggedIn(),
    loggedInUserProfile: makeSelectLoggedInProfile(),
    userInfo: makeSelectProfile(),

});

function mapDispatchToProps(dispatch){

    return {

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
