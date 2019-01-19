import styled from 'styled-components';
import {Link} from 'react-router-dom';
import media from 'theme/media';
//
export const NavLink = styled(Link)`

    color: rgb(254, 161, 0);

    text-decoration:none;
    transition:padding-bottom .2s ease-in-out;
    transition:color .3s ease-in-out;
    
    color: ${props => props.active == 'true'? 'white': ''};
    margin-left:20px;

    ${media.tablet`

        border-bottom: 0.5px solid white;
        margin-left:0px;
        color: ${props => props.active == 'true'? "white" : "rgb(254, 161, 0)"};
        margin-top:5%;
        padding-bottom:0;
    `}

`;

//Might change css here, has may put services under dropdown instead.
export const ServiceLink = styled.a`


    margin-left:1em;
    text-decoration:none;
    width:40%;
    text-align:center;

`;


//Todo: Ask her to change resolution of image to be bigger, changing height and width here fine, but makes it pixelated.
export const ServiceIcon= styled.img`

    display:block;
    width:100%;
    
`