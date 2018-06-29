import styled from 'styled-components';
import {Link} from 'react-router-dom';

const LoggedOutSection = styled.span`
margin-left:50%;
width:50%;
`

const LoggedInSection = styled.span`

width:55%;
margin-left:30%;

`

const UserActionLink = styled(Link)`

color:blue;
text-align:center;
margin-left:1%;
text-decoration:none;

`;

export {
    
    LoggedOutSection,
    LoggedInSection,
    UserActionLink,

};