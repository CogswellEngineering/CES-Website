import styled from 'styled-components';
import {Link} from 'react-router-dom';
import media from 'theme/media';
import {TEXT_COLOR, ACTIVE_PAGE_COLOR} from 'theme/colors';
//
export const NavLink = styled(Link)`

    color: ${TEXT_COLOR};

    text-decoration:none;
    transition:padding-bottom .2s ease-in-out;
    transition:color .3s ease-in-out;
    
    color: ${props => props.active == 'true'? ACTIVE_PAGE_COLOR : ''};
    margin-left:20px;

    ${media.tablet`

        border-bottom: 0.5px solid white;
        margin-left:0px;
        color: ${props => props.active == 'true'? "white" : "rgb(254, 161, 0)"};
        margin-top:5%;
        padding-bottom:0;
    `}

`;
