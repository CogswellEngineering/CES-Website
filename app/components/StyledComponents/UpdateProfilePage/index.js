
import Dropdown from 'react-dropdown'
import styled from 'styled-components';
import Dropzone from 'react-dropzone';


import {StyledLabel } from 'components/StyledForm';


const UpdateProfileWrapper = styled.div`

    width:60%;
    margin:auto;
    

`;

const NameDiv = styled.div`


    margin:auto;
    width:70%;
    margin-top:3%;

`


const BioInput = styled.div`


    clear:both;
    width:50%;
    margin-left:20%;
    margin-top:2%;


`

const BioTextarea = styled.textarea`

    resize:none;
    width:100%;
    padding-bottom:20%;
    clear:both;
    margin:auto;
    border: 1px solid black;
`

const BioLabel = styled(StyledLabel)`

    clear:both;
`

const ProfilePictureDiv = styled.div`

    margin-top:1%;
    margin-left:5%;
`

const ProfilePictureLabel = styled(StyledLabel)`



`;

const ProfilePictureDropzone = styled(Dropzone)    `

    margin-top:1%;
    width : ${props =>  props.width};
    height : ${props => props.height};
    border:3px dashed black;
    
    margin-left:1%;
`

const DropzonePrompt = styled.div`
    width : ${props =>  props.width};
    height : ${props => props.height};
    margin-left:3%;

`

const StyledDropdown = styled(Dropdown)`

    width:30%;
    margin-left:2%;
    margin-top:2%;
    

`;

const FieldDiv = styled.div`


    margin-top:1%;
`


export {


    UpdateProfileWrapper,
    NameDiv,
    BioInput,
    BioTextarea,
    BioLabel,
    ProfilePictureDiv,
    ProfilePictureLabel,
    ProfilePictureDropzone,
    DropzonePrompt,
    StyledDropdown,
    FieldDiv,
};