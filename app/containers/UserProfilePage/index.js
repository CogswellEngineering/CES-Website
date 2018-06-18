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
import { loadProfile, loadedProfile, nextPageClicked } from './actions'
import { makeSelectCollection, makeSelectProfile, makeSelectNeedReload } from './selectors';
import { createStructuredSelector } from 'reselect';
import { USER_PROFILE_PATH } from 'components/Header/pages';
import { makeSelectLoggedInProfile } from 'containers/App/selectors';
import  Pagination from 'react-js-pagination';

import { Tabs} from 'react-simpletabs';



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

export const ProfileImage = styled.img`

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
        

        const userInfo = props.userInfo;

        //Borrowed will prob go into library under a filter.
        const library = profile.library;
  
        const profile = userInfo.profile

        const inventory = [
            {
                name : "Library",
                data :userInfo.library,
        
            },
            {
                name : "Purchases",
                data :userInfo.purchases,
        
            }, 
            {
                name : "Borrowed",
                data :userInfo.borrowed,
        
            },
            
        ]

        //Might be too much in here, I'll rethink moving it to it's own thing.
        const pageRange = 5;

        if (!profile ){
            return (<div><p> Profile loading </p></div>);
        }

        return (
            <ProfileWrapper>
                <HeaderDiv>
                
                <UpdateProfileLink to={props.location.pathname+"/update"}> Update Profile </UpdateProfileLink>

                <ProfileImage src={profile.profileImage}/>
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
               

               {/*To add here is the paginator with tabs for purchases, library, and borrowed 
                Mix of both, going to have logic for filtering which bits of array I'm using same, but will be using
               react-js-pagination package for visuals, Might just compile it all into here*/}
                <Tabs>

                 
                    {
                        inventory.map(inventoryBlock => {
                            
                            //Yeah, this class getting bloated, will port it to own component
                            //It will recieve data like array made in here, splicing will get wierd, though could also do that logic
                            //there, but that means would pass in everything over there, making it pointless to even have here.
                            //Keeping here for now.
                            if (inventoryBlock.data.length == 0) return null;

                            //Populates panel with pagination.
                            return <Tabs.Panel title = {inventoryBlock.name}>
                                        <Pagination 
                                        pageCount = {inventoryBlock.data.length * pageRange} 
                                        pageRangeDisaplyed = {pageRange}
                                        onPageChange = {(page) => { props.replaceInventory(inventoryBlock.name,page);}}
                                        >
                                        
                                        {/*Need to port over my model block info component and create blockinfos for purchase too*/}
                                        {/*Populates pagination with with spliced inventory. */ }
                                        {inventoryBlock.data.map(item => {

                                            //For tseting;
                                            return <p> {item.toString()} </p>
                                        })}

                                        </Pagination>

                                    </Tabs.Panel>
                        

                        })

                    }


                </Tabs>               




                

            </ProfileWrapper>


        )

    }
}



const mapStateToProps = createStructuredSelector({

    needReload: makeSelectNeedReload(),
    loggedInUser: makeSelectLoggedInProfile(),
    userInfo: makeSelectProfile(),
    library: makeSelectCollection("library"),
    orders : makeSelectCollection("orders"),
    borrowed: makeSelectCollection("borrowed"),

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
