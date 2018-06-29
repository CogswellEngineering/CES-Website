import styled from 'styled-components';
import Dropdown from 'react-dropdown'

const RegistrationWrapper = styled.div`

    width:50%;
    margin:auto;
    margin-top:5%;
    padding-bottom:20%;
    border:2px solid black;

`

const CredentialInfo = styled.div`

    width:100%;
    margin-left: 30%;
    margin-top:10%;

`;

const GeneralInfo = styled.div`

    width:100%;
    margin-left: 30%;
    margin-top:2%;
`;

const StyledDropDown = styled(Dropdown)`

    width:40%;
    margin-top:2%;
    

`;

export {
    RegistrationWrapper,
    CredentialInfo,
    GeneralInfo,
    StyledDropDown,

};