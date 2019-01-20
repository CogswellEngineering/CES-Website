
import styled from 'styled-components';

import {StyledLabel,ContentField } from 'components/StyledForm';
import media from 'theme/media';

const UpdateProfileWrapper = styled.div`

    width:100%;    
    display:grid;
    place-items:center;
    margin-top:5%;
    padding-bottom:5%;

`;

const NameDiv = styled.div`


    margin:auto;
    margin-top:3%;
    padding-bottom:5%;

`


const BioInput = styled.div`


    padding-bottom:5%;
    width:80%;



`

const BioTextarea = styled.textarea`

    resize:none;
    width:100%;
    padding-bottom:20%;
    margin:auto;
    border: 1px solid black;
`

const BioLabel = styled(StyledLabel)`

`

const ProfilePictureDiv = styled.div`

`

const ProfilePictureLabel = styled(StyledLabel)`



`;

const ProfilePictureDropzone = styled.div`


   
    border:2px dashed black;

`;

const DropzonePrompt = styled.div`
    
    margin-left:3%;

`

const DropdownSection = styled.div`

    display:flex;
    margin-top:5%;
    padding-bottom:5%;
    width:50%;
    justify-content:space-evenly;

    > div{
        margin-left:5px;
    }
    ${media.tablet`

        width:60%;

        flex-direction:column;

        > div{
            margin-top:5%;
        }

    `}
    ${media.phone}
`;

const Footer = styled.div`


    width:90%;
    display:flex;
    justify-content:space-evenly;
`;


export {


    UpdateProfileWrapper,
    BioInput,
    BioTextarea,
    BioLabel,
    ProfilePictureLabel,
    ProfilePictureDropzone,
    DropzonePrompt,
    DropdownSection ,
    Footer,
};