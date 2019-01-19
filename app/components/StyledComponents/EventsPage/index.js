import styled from 'styled-components';
import EventCard from 'components/EventCard';

const EventsWrapper = styled.div`

    margin-top:5%;
    padding-bottom:5%;
    display:grid;
    grid-template-columns: auto;
    grid-template-rows:1fr auto;
    grid-template-areas:
    "header"
    "content";

`


const ViewSelection = styled.div`

    margin:auto;
    width:20%;
    grid-area:header;   
    display:flex;
    justify-content: space-evenly;
`;



const GridView = styled.div`

    grid-area:content;

    width:100%;
    display:flex;
    margin-top:5%;

    flex-wrap:wrap;
    justify-content:space-evenly;
    align-items: flex-start;
    align-content: space-around;

  

`;

export{

    EventsWrapper,
    GridView,
    ViewSelection,

};