import styled from 'styled-components';
import Linkify from 'react-linkify';

import media from 'theme/media';
import {TEXT_COLOR} from 'theme/colors';





const Wrapper = styled.div`

    display:grid;
    width:60%;
    margin:auto;
    margin-top:5%;
    padding-bottom:5%;
    grid-template-columns:auto;
    grid-template-rows: auto auto auto 1fr auto;

    grid-template-areas:
    "thumbnail"
    "header"
    "body"
    "footer"
    "comments";

    grid-row-gap: 10px;

    ${media.tablet`

        width:90%;
    `}

    ${media.phone`

        width:80%;
    `}


`;


const Thumbnail = styled.div`

    grid-area:thumbnail;
    
    background-image: url(${props => props.image});
    background-size: 100% 100%;
    background-position:center;
    background-repeat: no-repeat;

    ${media.giant`

        height:800px;
    `}

    ${media.desktop`

        height:350px;
    `}

    ${media.tablet`

        height:300px;

    `}
    ${media.phone`

        height:200px;
    `}

`;

const Header = styled.div`

    grid-area:header;
    width:50%;
    margin:auto;
    //border:2px solid black;
    display:grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
    "title title"
    "date author";

    ${media.tablet`

        width:100%;
    `}
`;

const Body = styled(Linkify)`

    text-align: justify;
    text-justify: inter-word;
    grid-area:body;
    & > a {

        text-decoration:none;
        font-style:italic;
        color:${TEXT_COLOR};
        cursor:pointer;
       
      
    }
`;

const Footer = styled.div`

    grid-area:footer;
    display:grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows:auto auto;
    grid-template-areas:
    "tagTitle shareTitle"
    "tags share";

    ${media.tablet`

        display:block;
    `}

`;


const SharedSection = styled.div`

    display:flex;
    grid-area:share;


`;
export{

    Wrapper,
    Thumbnail,
    Header,
    Body,
    Footer,
    SharedSection,
 
};