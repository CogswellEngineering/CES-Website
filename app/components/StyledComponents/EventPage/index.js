
import styled from 'styled-components';
import media from 'theme/media';

const Wrapper = styled.div`

    //This will be huge grid for whole thing.
    display:grid;
    width:80%;
    margin:0 auto;
    margin-top:5%;
    padding-bottom:5%;

    grid-row-gap:10px;
    //For desktop view.
    grid-template-columns: 1.5fr 1fr;
    grid-template-rows: 1fr 1fr auto 2fr auto;
    grid-template-areas:
    "Poster Header"
    "Poster Header"
    "Gallery Gallery"
    "Body Body" 
    "Footer Footer";


    //Doing just tablet, cause same css for both phones and tablets.
    ${media.tablet`

        grid-template-columns: 100%;
        grid-template-rows: auto auto auto 2fr auto;
        grid-template-areas:
        "Poster"
        "Header"
        "Gallery"
        "Body"
        "Footer";
    `};

    ${media.tablet`

        grid-template-columns: 100%;
        grid-template-rows: auto auto auto 2fr auto;
        grid-template-areas:
        "Poster"
        "Header"
        "Gallery"
        "Body"
        "Footer";
    `}

`;

const Poster = styled.div`

    grid-area: Poster;
    background-image:url(${props => props.image});
    background-size: 100% 100%;
    height:300px;
    background-position:center;
    background-repeat: no-repeat;
`;

const Header = styled.div`

    grid-area:Header;
    display:grid;
    grid-template-columns: auto;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-template-areas:
    "date"
    "title"
    "host"
    "footer";

    ${media.phone`

    `};
`;



const Gallery = styled.div`

    grid-area:Gallery;
    white-space: nowrap; /* will prevent text from wrapping */

    overflow-x: ${props => props.isEmpty? "hidden" : "scroll"};
`;

const Picture = styled.img`

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
    grid-column-gap:5%;

    //I want to do the spanning stuff
    grid-template-rows: auto auto;


    //Was too specific with it don't need to be.
    //Agenda is part of description
    //and this makes it so optional and still nice.
    grid-template-areas:
    "description aside"
    "description .";

    ${media.tablet`

        grid-template-areas:
        "aside aside"
        "description description";
        place-items:center;
        grid-column-gap:0%;
    `};

`;




const Footer = styled.div`

    grid-area: Footer;
    grid-template-columns: auto;
    grid-template-rows: 1fr 1fr;
`;

const Title = styled.p`

    grid-area:title;
    font-weight:bold;
    //I could put this somewhere
    ${media.tablet}
    ${media.phone}

`;

const Description = styled.div`


    grid-area:description;
    ${media.tablet}
    ${media.phone}
`;

//These should be just be one, an aside.
const DateAndTime = styled.div`

    grid-area:dateAndTime;
    padding-bottom: 5%;
    //Putting in global styles doesn't work
     ${media.tablet}
    ${media.phone}
`;

const Location = styled.div`

    grid-area:location;
    padding-bottom: 5%;
    ${media.tablet}
    ${media.phone}

`;

const Agenda = styled.div`


    ${media.tablet}
    ${media.phone}
`;

//Will contain time frame and activity
const AgendaItem = styled.div`

    display:grid;
    width:55%;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
    grid-template-areas:
    "timeFrame activity";

    //may not need.
    //${media.tablet}
    //${media.phone}
`;

const Contact = styled.div`

    grid-area:contact;
    ${media.tablet}
    ${media.phone}
`;

const HostLink = styled.a`

    text-decoration:none;

    color:white;
    &:hover{


        color:  rgb(254, 161, 0);
    }

`;

const CallToAction = styled.p`

    font-weight:bold;
    font-style:italic;
    ${media.tablet}
    ${media.phone}
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