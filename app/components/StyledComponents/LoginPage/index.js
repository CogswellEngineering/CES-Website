import styled from 'styled-components';
import {Link} from 'react-router-dom';

const LoginWrapper = styled.div`

width:50%;
margin:auto;
margin-top:5%;
padding-bottom:20%;
border:2px solid black;

`

const LoginButton = styled.button`

margin-left:1%;

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

}