import styled from 'styled-components';
import Linkify from 'react-linkify';

const Wrapper = styled.div`

    display:grid;
    grid-template-columns:auto;
    grid-template-rows: auto 1fr auto 1fr auto;

    grid-template-areas:
    "thumbnail"
    "header"
    "body"
    "footer"
    "comments";

`;


const Thumbnail = styled.div`

    grid-area:thumbnail;
    background-image: url(${props => props.image});
    background-size: 100% 100%;
    background-position:center;
    background-repeat: no-repeat;

    border:2px solid black;

`;

const Header = styled.div`

    grid-area:header;
    border:2px solid black;

`;

const Body = styled(Linkify)`

    border:2px solid black;
    grid-area:body;
    display:grid;
    grid-template-columns: auto auto;
    grid-template-rows: 2fr 1fr;

    grid-template-areas:
    "title title"
    "postDate author";

`;

const Footer = styled.div`

    border:2px solid black;

    grid-area:footer;
`;



export{

    Wrapper,
    Thumbnail,
    Header,
    Body,
    Footer,

 
};