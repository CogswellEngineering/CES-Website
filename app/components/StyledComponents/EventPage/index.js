
import styled from 'styled-components';

const Wrapper = styled.div`

    //This will be huge grid for whole thing.
    display:grid;
    width:80%;
    margin:auto;
    margin-top:5%;

    
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 2fr 1fr 2fr 1fr;
    //temp to see how big they are
    grid-row-gap: 5%;
    grid-column-gap: 5%;

    grid-template-areas:
    "Poster Header"
    "Gallery Gallery"
    "Body Body"
    "Footer Footer";

`;

const Poster = styled.div`

    border:2px solid black;
    grid-area: Poster;
    background-image:url(${props => props.image});
    background-size: cover;
    background-position:center;
    background-repear: no-repeat;

`;

const Header = styled.div`

    grid-area:Header;
    border:2px solid black;
    display:grid;

    grid-template-columns: 100%;
    grid-template-rows: 0.5fr 0.25fr 0.25fr 1fr;
    grid-template-areas:
    "date"
    "title"
    "host"
    "footer";
  
`;

const Gallery = styled.div`

    grid-area:Gallery;
    border:2px solid black; 
`;

const Picture = styled.div`

    background-image:url(${props => props.image});
   
    width:20%;
    height:100%;
    margin-left:5%;
    display:inline-block;
    cursor:pointer;
   // border:2px solid black;
    background-size: cover;
    background-position:center;
    background-repeat: no-repeat;

    border: ${props => props.selected? "2px solid rgb(254, 161, 0)" : "0"};

    
`;

const Body = styled.div`
    border:2px solid black;
    grid-area: Body;

`;


const Footer = styled.div`

    grid-area: Footer;
    border:2px solid black;

`;

const Description = styled.div`



`;

const DateAndTime = styled.div`


`;

const Location = styled.div`


`;

const Agenda = styled.div`


`;

//Will contain time frame and activity
const AgendaItem = styled.div`


`;

const Contact = styled.div`


`;

const CallToAction = styled.div`


`;

const Tags = styled.div`


`;

const Share = styled.div`


`;

export {

    Wrapper,
    Gallery,
    Picture,
    Header,
    Poster,
    Description,
    Body,
    DateAndTime,
    Agenda,
    AgendaItem,
    Contact,
    CallToAction,
    Footer,
    Tags,
    Location,
    Share,
}