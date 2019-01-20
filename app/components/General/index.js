import styled from 'styled-components';
import {Link} from 'react-router-dom';
import media from 'theme/media';



export const Headline = styled.h1`

    
    font-size: 3em;
    text-transform:uppercase;
    text-align:center;

    ${media.tablet`

        font-size:2.5em;
    `}

    ${media.phone`

        font-size:1.2em;
    `}

`;  

//Goes under headline
export const Subtitle = styled.h2`

    text-transform:uppercase;
    text-align:center;
    font-size:1.5em;


`;

export const ProfilePicture = styled.img`

    width:300px;
    height:250px;

    ${media.tablet`

        width:250px;
        height:200px;

    `}

    ${media.phone`

        width:150px;
        height:150px;
    `}


`;

export const UserLink = styled(Link)`

    text-decoration:none;
    font-style:italic;
    color:white;
    &:hover{

        color: rgb(254, 161, 0);

    }
    ${media.tablet}
    ${media.phone}
`;

export const Button = styled.button`

    cursor:pointer;
    border: 2px solid rgb(2, 28, 73);
    padding:5px;
    color: rgb(254, 161, 0);
    background-color:black;
    ${media.tablet}
    ${media.phone}
`;