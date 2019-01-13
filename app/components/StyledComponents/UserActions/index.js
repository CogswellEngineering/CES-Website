import styled from 'styled-components';
import {Link} from 'react-router-dom';


//Probably turning this into popover, to match how linked in and stuff does for it,
//better than just spacing them out differently.
//Really account wrapper but keeping name
//same for now.
const UserActionsWrapper = styled.div`

    display:flex;
    width:25%;
    justify-content:flex-end;    
`

const DisplayName = styled.p`

    color:black;
    font-size:20px;
`;

const UserActionLink = styled(Link)`

    text-decoration:none;
    margin-right:5%;
    color: rgb(254, 161, 0);
    &:hover {
        color:white;
      };
`;


const Button = styled.button`



    &:hover {
        color:white;
      };

`;
const LogoutButton = styled.button`

    color:black;
    &:hover {
        background: white;
      };
    color: rgb(254, 161, 0);
    text-transform:uppercase;  

`;


export {
    
    UserActionsWrapper,
    UserActionLink,
    DisplayName,
    Button,
    LogoutButton,
};