import React from 'react';
import styled from 'styled-components';
import media from 'theme/media';
import {TEXT_COLOR, UNIMPORTANT_TEXT_COLOR} from 'theme/colors';
import Tags from 'components/Tags';
import {StyledButton} from 'components/StyledForm';
import {USER_PROFILE_PATH} from 'SiteData/constants';

const defaultAvatar = require('images/default_avatar.png');
//I want the cards to display:
/*
    Name
    Major Year? Prob same line here.
    Concentrations //Prob take up at most 2 lines.
    profile Picture 
    //Whole card will be clickable.
*/
const Wrapper = styled.div`


    display:grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
    "profilePicture name"
    "profilePicture status"
    "profilePicture concentrations";
    grid-column-gap:10px;
    
    ${media.phone`
        grid-template-rows: auto auto auto auto;
        grid-template-areas:
        "name name"
        "profilePicture profilePicture"
        "status status"
        "concentrations concentrations";
        place-items:center;
    `}

`;

const ProfilePicture = styled.img`


    cursor:pointer;
    grid-area:profilePicture;
    border-radius: 60px;
    width:125px;
    height:125px;

    ${media.tablet`

        width:200px;
        height:200px;

    `};

    ${media.phone`

        width:50px;
        height:50px;

    `}
`;

//Prob doesn't have to be own thing.
//CHanged to styled Link
const Name = styled.div`

    grid-area:name;
    cursor:pointer;
    color: ${TEXT_COLOR};
    ${media.tablet};
    ${media.phone};
`;

const Status = styled.div`

    grid-area:status;
//    display:flex;
    color: ${UNIMPORTANT_TEXT_COLOR};

    ${media.tablet};
    ${media.phone};
`;


//Concentrations will be tags.
//Unlike events there' won't be event cards, since only difference is events and news which are collections
//no other extra info, except for Bio. hmm
const UserCard = props => {

    
    const {uid, profilePicture, displayName, firstName, lastName, major, year, concentrations, onClick, onClickConcentration} = props;

    const name = firstName + " " + lastName;

  
    return (<Wrapper >

            <ProfilePicture src = {(profilePicture? profilePicture.url : defaultAvatar)} onClick = {() => {onClick(uid);}}/>
            <Name onClick = {() => {onClick(uid);}}> {name} </Name>

            <Status>
                {/*maybe major and year also filter? Hmm.*/}
                 {major}, {year}
            </Status>

            <Tags tags = {concentrations} onTagClicked = {onClickConcentration} style = {{gridArea:"concentrations"}}/>
        
        </Wrapper>)
}

export default UserCard;