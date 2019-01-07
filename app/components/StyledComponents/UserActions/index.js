import styled from 'styled-components';
import {Link} from 'react-router-dom';


//Probably turning this into popover, to match how linked in and stuff does for it,
//better than just spacing them out differently.
//Really account wrapper but keeping name
//same for now.
const UserActionsWrapper = styled.div`

    display:flex;
    flex-wrap:nowrap;
    justify-content:space-evenly;
    align-items:center;
    text-align:center;
    width:10%;

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
    text-align:center;
    color: rgb(254, 161, 0);
  
`;


const Button = styled.button`



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