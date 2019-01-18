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
        text-align:right;
    `}
`

const DisplayName = styled.p`

    color:black;
    font-size:20px;
`;

const UserActionLink = styled(Link)`

    text-decoration:none;
    color: rgb(254, 161, 0);
    &:hover {
        color:white;
      };

    
    ${media.tablet`
      border-bottom: 0.5px solid white;
      color: ${props => props.active == 'true'? "white" : "rgb(254, 161, 0)"};
      margin-top:5%;
    `}

`;

const LogoutButton = styled.button`

    &:hover {
        color: white;
      };
    color: rgb(254, 161, 0);
    text-transform:uppercase;  
    cursor:pointer;
       
    ${media.tablet`
      border-bottom: 0.5px solid white;
      color: ${props => props.active == 'true'? "white" : "rgb(254, 161, 0)"};
      margin-top:5%;
      text-align:right;
    `}
`;


export {
    
    UserActionsWrapper,
    UserActionLink,
    DisplayName,
    Button,
    LogoutButton,
};