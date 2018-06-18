import React, { Component} from 'react';
import styled from 'styled-components';
import FormSelectors from 'utils/genericFormSelectors';
import { Link }  from 'react-router-dom';
import { withFirebase} from 'react-redux-firebase';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import saga from './saga';
import reducer from './reducer';
import { loadProfile, loadedProfile } from './actions'
import { makeSelectCollection, makeSelectProfile, makeSelectNeedReload } from './selectors';
import { createStructuredSelector } from 'reselect';
import { USER_PROFILE_PATH } from 'components/Header/pages';
import { makeSelectLoggedInProfile } from 'containers/App/selectors';


//Will move all these styled components into own folder in components folder later, just here for testing.

const ProfileWrapper = styled.div`



    width:60%;

    margin:auto;
    border:2px solid red;

`

const HeaderDiv = styled.div`

    //display:inline;
    width:90%;
    border-bottom: 2px solid black;
    margin:auto;


`;

const ProfileHeadline = styled.div`

    width:30%;
    margin-top:1%;
    padding-bottom:1%;

`;

const ProfileBio = styled.div`

    border:2px solid black;
    width:60%;
    margin:auto;
    margin-top:5%;

`

const BioHeader = styled.h3`

    text-align:center;

`
const BioText = styled.p`



`



const ProfileHeadLineH1 = styled.h1`

    font-weight:600;
`
const ProfileHeadLineH2 = styled.h2`

    font-weight:500;
`

const ProfileImage = styled.img`

    margin-top:1%;
    width:20%;
    height:30%;
    border: 1px solid black;
    margin-right:25%;
`;


const Links = styled.div`

    width: 40%;
    float:right;
    border:2px solid;
    margin-top:5%;
    
`;

const UpdateProfileLink = styled(Link)`

    text-decoration:none;
    display:block;
    margin-top:1%;
    text-align:center;
    width:20%;

`

const StyledLink = styled.a`

    width:10%;
    display:block;
    margin-top:1%;
`
const StyledImageLink = styled.img`

    
    width:100%;

`;







class UserProfilePage extends Component{


    componentDidMount(){

                    
        this.loadProfile();
    }

    loadProfile(){
        const uid = this.props.match.params.uid;

        if (uid != this.props.firebase.auth().currentUser.uid){

            this.props.loadProfile(uid);
        }
        else{
            //Right, this isn't using state firebase, it's using uid
            this.props.alreadyLoaded(this.props.loggedInUser.profile);
        }
    }

    componentDidUpdate(){

        if (this.props.needReload == true){
            this.loadProfile();
        }
    }

    render(){

        const props = this.props;
        
        const profile = props.profile;

        if (!profile ){
            return (<div><p> Profile loading </p></div>);
        }

        return (
            <ProfileWrapper>
                <HeaderDiv>
                
                <UpdateProfileLink to={props.location.pathname+"/update"}> Update Profile </UpdateProfileLink>

                <ProfileImage src="https://otakukart.com/wp-content/uploads/2017/10/033791b7-2d25-498f-b46e-92cd388b9be6-384x384.jpg"/>
                <Links>
                
                    {/*Need to add media links, and bio in update profile.*/}
                    { (profile.mediaLinks == null)? null : 

                        profile.mediaLinks.map(link => {

                            return (<StyledLink href={link.url}> <StyledImageLink src = {link.image}/> {link.name} </StyledLink>);
                        })
                    }
                    
                <StyledLink href="https://github.com/ChristianBasiga"><StyledImageLink  src="https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png"/></StyledLink>


                </Links>

                <ProfileHeadline> 
                    <ProfileHeadLineH1>{profile.firstName} {profile.lastName}</ProfileHeadLineH1>
                      <ProfileHeadLineH2> {profile.major} </ProfileHeadLineH2>

                </ProfileHeadline>
                
            
                </HeaderDiv>


                <ProfileBio>
                    <BioHeader> Bio </BioHeader>
                    <BioText> {profile.bio || "No Bio given"} </BioText>
                    
                </ProfileBio>
               

               {/*To add here is the paginator with tabs for purchases, library, and borrowed */}

                

            </ProfileWrapper>


        )

    }
}



const mapStateToProps = createStructuredSelector({

    needReload: makeSelectNeedReload(),
    loggedInUser: makeSelectLoggedInProfile(),
    profile: makeSelectProfile(),
    library: makeSelectCollection("library"),
    orders : makeSelectCollection("orders"),
    borrowed: makeSelectCollection("borrowed"),

});

function mapDispatchToProps(dispatch){

    return {
        loadProfile : (uid) => {
            return dispatch(loadProfile(uid));
        },
        alreadyLoaded: (profile) => {
            return dispatch(loadedProfile(profile));
        }
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
