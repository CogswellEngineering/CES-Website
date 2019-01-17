import styled from 'styled-components';
import { Link }  from 'react-router-dom';


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
    //Last two rows can be put inline, image could technically be too but already existed.

`;

const ProfileImage = styled.img`

    //This is fine, change later to be similar to how I did event page
    grid-area:profilePicture;
    max-width:100%;
`;

const Options = styled.div`

    grid-area:options;
    display:grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap:10em;
`;

//Will Actually be custom button for this.
const Option = styled.div`

    cursor:pointer;
    text-align:center;
    border-bottom: ${props => props.selected? "2px solid rgb(254, 161, 0)" : "0"};
    font-size:1.5em;

`;

const Content = styled.div`


    

    grid-area:content;
    display:flex;
    flex-wrap:wrap;
    margin-top:5%;
    justify-content:center;
    

`;

const Footer = styled.div`

    grid-area:footer;
    display:grid;
    grid-template-columns: 1fr auto 1fr;

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
    width:60%;
    margin:auto;
    margin-top:5%;

`

const BioHeader = styled.h3`

    text-align:center;

`
const BioText = styled.p`

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