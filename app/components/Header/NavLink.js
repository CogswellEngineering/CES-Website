import styled from 'styled-components';
import {Link} from 'react-router-dom';

//
export const PageLink = styled(Link)`

    color: rgb(254, 161, 0);

    margin-left:1em;
    text-decoration:none;
    border-bottom: 1px solid  ${props => props.active == 'true'? 'rgb(14, 80, 38)' : 'clear'};
    padding-bottom: ${props => props.active? '0.5em' : '0'};

    &:hover{

        color:white;
    }

`;

//Might change css here, has may put services under dropdown instead.
export const ServiceLink = styled.a`


    margin-left:1em;
    text-decoration:none;
    width:40%;
    text-align:center;
    display:inline-block;

`;


//Todo: Ask her to change resolution of image to be bigger, changing height and width here fine, but makes it pixelated.
export const ServiceIcon= styled.img`

    display:block;
    width:100%;
    
`