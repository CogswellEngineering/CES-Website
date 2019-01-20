import styled from 'styled-components';
import {Link} from 'react-router-dom';

const Wrapper = styled.div`

    width:90%;
    margin: 0 auto;
    margin-top: 5%;
    padding-bottom: 5%;
    height: auto;
    
`;


const Picture = styled.div`

    grid-area:picture;
    background-image: url(${props => props.image});
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;

    border:2px solid black;
`;

const Title = styled.div`
  
    text-transform:uppercase;
    text-align:center;
    color: rgb(254, 161, 0);

`;

const SubTitle = styled.div`

    grid-area:subtitle;
    font-weight:bold;
`;

const Description = styled.div`

    grid-area:description;
    text-align: justify;
    text-justify: inter-word;
    color:white;
`;

//This will have to be updated every time officer core changes.
const WhoWeAre = styled.div`


    text-align:center;
    margin:auto;

    ${Description}{

        width:30%;
        margin:auto;
    }
    
`;

const WhatWeDo = styled.div`

    margin: 0 auto;
    width:60%;
    margin-top:5%;


    

`;

const HelpStudentsBlock = styled.div`

    display:grid;
    grid-template-columns: 0.6fr 1fr;
    grid-column-gap: 1%;
    grid-template-rows: auto auto;
    grid-template-areas:
    "picture subtitle"
    "picture description";
`;


const StyledLink = styled(Link)`


    color: rgb(254, 161, 0);
    text-decoration:none;
`;


const HostEventsBlock = styled.div`

    margin-top:5%;
    display:grid;
    grid-template-columns:  1fr 1fr;
    grid-template-rows: 0.5fr 0.5fr;

    grid-template-areas:
    "subtitle eventHeader"
    "description eventList";

`;

const EventList = styled.ul`

    list-style:none;
    grid-area: eventList;
    display:flex;
    flex-wrap:wrap;
    justify-content:space-evenly;
`;

const EventHeader = styled.div`

    grid-area:eventHeader;
    font-weight: bold;
`;

const EventItem = styled.li`

`;

const OtherServicesBlock = styled.div`



`;



const JoinUs = styled.div`

    margin-top:5%;

`;

export {

    WhoWeAre, WhatWeDo, HelpStudentsBlock, 
    HostEventsBlock, EventList, EventHeader, EventItem, 
    OtherServicesBlock, JoinUs, Title, SubTitle, Description,Picture, StyledLink
};


export default Wrapper;