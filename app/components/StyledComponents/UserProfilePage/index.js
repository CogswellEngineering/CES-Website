import styled from 'styled-components';
import { Link }  from 'react-router-dom';
import Linkify from 'react-linkify';
import media from 'theme/media';

import EventCard from 'components/EventCard';

//Current layout is very mobile friendly
const ProfileWrapper = styled.div`

   // border:2px solid green;
    margin-top: 5%;
    padding-bottom:5%;
    color: rgb(254, 161, 0);
    //Or can separate more?
    display:grid;

    grid-template-columns: auto;
    grid-template-rows: 1fr auto auto;
    grid-template-areas: 
    "header"
    "concentrations"
    "footer";
    justify-items:center;
    width:100%;
    margin:auto;
`;

const Header = styled.div`

    grid-area:header;
    display:grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto 2fr auto auto;
    grid-template-areas:
    ". actions"
    "role role"
    "profilePicture profilePicture"
    "name name"
    "standing standing";
    justify-items: center;

    //With amount of times I do this, really need to fill that theme folder with font sizes too.
    ${media.tablet}

    ${media.phone}

`;

const ProfileImage = styled.img`

    //This is fine, change later to be similar to how I did event page
    grid-area:profilePicture;
    max-width:100%;
`;

const Options = styled.div`

    grid-area:options;
    width:100%;
    display:grid;
    grid-template-columns: 1fr 1fr 1fr;

    //I don't want gaps to be thing.
    grid-column-gap:50px;
`;

//Will Actually be custom button for this.
const Option = styled.div`

    cursor:pointer;
    text-align:center;
    border-bottom: ${props => props.selected? "2px solid rgb(254, 161, 0)" : "0"};
    text-transform:uppercase;

    ${media.tablet}

    ${media.phone}
`;

const Content = styled.div`


    
    width:100%; 
    grid-area:content;
    display:flex;
    flex-wrap:wrap;
    margin-top:5%;
    

`;

const ListWrapper = styled.div`


`;

const Footer = styled.div`

    grid-area:footer;
    width:100%;
    display:grid;
    grid-template-columns: auto 100% auto;

    grid-template-rows: auto auto;
    grid-template-areas:
    //Maybe these three will be different actually.
    ". options ."
    "content content content";

`;


//Oh actually may want to add contact
const Links = styled.div`

    width: 40%;
    float:right;
    border:2px solid;
    margin-top:5%;
    
`;




const ProfileBio = styled.div`

    border:2px solid black;
    width:100%;
    margin-top:5%;

   
`

const BioHeader = styled.h3`

    text-align:center;
    text-transform:uppercase;
    ${media.tablet`

        font-size:48px;
    `}

    ${media.phone`

        font-size:18px;

    `}

`
const BioText = styled(Linkify)`
    
    ${media.tablet}

    ${media.phone}

    width: 100%;

`;





const StyledImageLink = styled.img`

    
    width:100%;

`;

export {

    ProfileWrapper,
    ProfileImage,
    Header,
    Options,
    Option,
    Footer,
    Content,
    BioText,
    BioHeader,
    ProfileHeadLineH1,
    ProfileHeadLineH2,
    Links,
    ProfileLink,
    StyledLink,
    StyledImageLink,
};