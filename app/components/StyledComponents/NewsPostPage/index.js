import styled from 'styled-components';
import Linkify from 'react-linkify';


//Need to do alot of refactoring to reuse stuff.
const Title = styled.p`


`;



const Wrapper = styled.div`

    display:grid;
    width:60%;
    margin:auto;
    margin-top:5%;
    grid-template-columns:auto;
    grid-template-rows: 3fr auto auto 1fr auto;

    grid-template-areas:
    "thumbnail"
    "header"
    "body"
    "footer"
    "comments";

    grid-row-gap: 10px;


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
    width:50%;
    margin:auto;
    //border:2px solid black;
    display:grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
    "title title"
    "date author";
`;

const Body = styled(Linkify)`

    grid-area:body;
`;

const Footer = styled.div`

   // margin-left:10%;
    grid-area:footer;
    display:grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
    "tagTitle shareTitle"
    "tags share";

  //  justify-items: center;

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
    Title,
    Footer,
    SharedSection,
 
};