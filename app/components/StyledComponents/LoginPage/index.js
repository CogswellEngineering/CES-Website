import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {StyledInput, StyledButton,} from 'components/StyledForm'

const LoginInput = styled(StyledInput)`

    width:40%;

`;

const LoginWrapper = styled.div`

    width:50%;
    margin:auto;
    margin-top:5%;
    padding-bottom:20%;

`

const LoginButton = styled(StyledButton)`

margin-top:5%;


`

const StyledLink = styled(Link)`

text-decoration:none;

`;

const MainContent = styled.form`

width:100%;
margin-left:30%;
margin-top:5%;

`

const AlternativeOptions = styled.div`
margin-left:30%;
width:100%;
`


export{
    
    StyledLink,
    LoginWrapper,
    MainContent,
    AlternativeOptions,
    LoginInput,
    LoginButton,

}