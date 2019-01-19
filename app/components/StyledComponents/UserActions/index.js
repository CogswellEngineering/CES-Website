import styled from 'styled-components';
import {Link} from 'react-router-dom';
import media from 'theme/media';

//Probably turning this into popover, to match how linked in and stuff does for it,
//better than just spacing them out differently.
//Really account wrapper but keeping name
//same for now.
const UserActionsWrapper = styled.div`

    ${media.tablet`
        
        display:flex;
        width:auto;
        flex-direction:column;        
    `}
`

const DisplayName = styled.p`

    color:black;
`;


const LogoutButton = styled.button`

    &:hover {
        color: white;
      };
    color: rgb(254, 161, 0);
    text-transform:uppercase;  
    cursor:pointer;
    margin-left:20px;
    ${media.tablet`
      border-bottom: 0.5px solid white;
      color: ${props => props.active == 'true'? "white" : "rgb(254, 161, 0)"};
      margin-top:5%;
      margin-left:0px;
    `}
`;


export {
    
    UserActionsWrapper,
    UserActionLink,
    DisplayName,
    Button,
    LogoutButton,
};