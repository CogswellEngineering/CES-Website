
import styled from 'styled-components';


const Wrapper = styled.div`

    //This will be huge grid for whole thing.
    display:grid;
    width:80%;
    margin:0 auto;
    margin-top:5%;
    padding-bottom:5%;

    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr auto 2fr auto;
    //temp to see how big they are
    grid-row-gap:1%;
    grid-column-gap:5%;
    grid-template-areas:
    "Poster Header"
    "Poster Header"
    "Gallery Gallery"
    "Body Body" 
    "Footer Footer";

`;

const Poster = styled.div`
    grid-area: Poster;
    background-image:url(${props => props.image});
    background-size: 100% 100%;
    background-position:center;
    
    background-repeat: no-repeat;
`;

const Header = styled.div`

    grid-area:Header;
    display:grid;
    grid-template-columns: auto;
    grid-template-rows: 1fr 0.5fr 0.5fr 1fr;
    grid-template-areas:
    "date"
    "title"
    "host"
    "footer";
`;



const Gallery = styled.div`

    grid-area:Gallery;
    white-space: nowrap; /* will prevent text from wrapping */

    overflow-x: ${props => props.isEmpty? "hidden" : "scroll"};
     position: relative;
`;

const Picture = styled.img`

    background-image:url(${props => props.image});
    cursor:pointer;
    width:100px;
    height:96px;

    border: ${props => props.selected? "2px solid rgb(254, 161, 0)" : "2px solid black;"};
    border-bottom:0;
`;

const Body = styled.div`

    grid-area: Body;

    display:grid;
    grid-template-columns: 1fr 1fr;
    grid-row-gap:5%;
    grid-column-gap:5%;

    //I want to do the spanning stuff
    grid-template-rows: auto auto;


    //Was too specific with it don't need to be.
    //Agenda is part of description
    //and this makes it so optional and still nice.
    grid-template-areas:
    "description aside"
    "description .";

`;




const Footer = styled.div`

    grid-area: Footer;
    grid-template-columns: auto;
    grid-template-rows: 1fr 1fr;
`;

const Title = styled.p`

    font-weight:bold;

`;

const Description = styled.div`


    grid-area:description;
`;

//These should be just be one, an aside.
const DateAndTime = styled.div`

    grid-area:dateAndTime;
    padding-bottom: 5%;
`;

const Location = styled.div`

    grid-area:location;
    padding-bottom: 5%;

`;

const Agenda = styled.div`



`;

//Will contain time frame and activity
const AgendaItem = styled.div`

    display:grid;
    width:55%;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-template-areas:
    "timeFrame activity";

`;

const Contact = styled.div`

    grid-area:contact;
`;

const HostLink = styled.a`

    text-decoration:none;

    color:white;
    &:hover{


        color:  rgb(254, 161, 0);
    }

`;

const CallToAction = styled.div`

    font-weight:bold;
    font-style:italic;
`;

const Tags = styled.div`


    display:flex;
    flex-wrap:wrap;
`;

const Share = styled.div`

    display:flex;
    flex-wrap:no-wrap;
    width:auto;
`;

export {

    HostLink,
    Wrapper,
    Gallery,
    Picture,
    Title,
    Header,
    HeaderButton,
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