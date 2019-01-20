import styled from 'styled-components';
import EventCard from 'components/EventCard';

const EventsWrapper = styled.div`

    margin-top:5%;
    padding-bottom:5%;
    display:grid;
    grid-template-columns: auto;
    grid-template-rows:1fr auto ;
    grid-template-areas:
    "header"
    "content";
    "footer";
    grid-row-gap:20px;

`
const Header = styled.div`

    grid-area:header;
    width:100%;
    margin:auto;
    place-self:center;
    display:grid;
    place-items:center;

`;

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

    flex-wrap:wrap;
    justify-content:space-evenly;
    align-items: flex-start;
    align-content: space-around;

  

`;

export{

    EventsWrapper,
    Header,
    GridView,
    ViewSelection,

};