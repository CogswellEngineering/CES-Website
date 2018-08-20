import styled from 'styled-components';
import {Link} from 'react-router-dom';


//Probably turning this into popover, to match how linked in and stuff does for it,
//better than just spacing them out differently.
//Really account wrapper but keeping name
//same for now.
const UserActionsWrapper = styled.span`

`
const LoggedOutSection = styled.span`

        

`;

const LoggedInSection = styled.span`

   


`;


const DisplayName = styled.p`

    color:black;
    font-size:20px;
`;

const UserActionLink = styled(Link)`

    text-decoration:none;
    color:black;
    border:1px solid black;
    display:block;
    margin-top:1em;
    text-align:center;
    &:hover{

        background:#D9D7D6;
    }

`;


const Button = styled.button`

    color:black;
    &:hover {
        color:white;
      };

`;
const LogoutButton = styled.button`

    border:1px solid black;
    color:black;
    &:hover {
        background: #D9D7D6;
      };

`;


export {
    
    UserActionsWrapper,
    LoggedOutSection,
    LoggedInSection,
    UserActionLink,
    DisplayName,
    Button,
    LogoutButton,
};