import styled from 'styled-components';
import { Link }  from 'react-router-dom';


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



const ProfileHeadLineH1 = styled.h1`

    font-weight:600;
`
const ProfileHeadLineH2 = styled.h2`

    font-weight:500;
`

const ProfileImage = styled.img`

    margin-top:1%;
    margin-right:25%;
`;


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





const ProfileLink = styled(Link)`

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

export {

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
};