//The card view for grid view of events instead of calendar.
import React from 'react';
import styled from 'styled-components';
import dateFns from 'date-fns';



const Card = styled.div`

    
    cursor:pointer;
    background-image: url(${props => props.image});
    background-size: 100% 100%;
    height:100%;
    background-position: center;
    background-repeat: no-repeat;
    

    display:grid;
    grid-template-columns: 100%;
    grid-template-rows: 1fr 2fr 1fr;
    grid-template-areas:
    "prize"
    "host"
    "fade";  
    //color:rgb(254, 161, 0);
    color:white;
    font-weight:bold;

    transition: transform .2s; /* Animation */

    &:hover{

        //padding:5px;
        //Maybe transform instead.
        transform: scale(1.05);
    }
    
`;


const FadeArea = styled.div`

    grid-area:fade;
    height:100%;
    background: linear-gradient(
        to top,
        black, 
        transparent
      );

    display:grid;
    grid-template-columns:auto;
    grid-template-rows: 1fr auto ;
    grid-template-areas:
    "title"
    "footer";
`;


//Will always be there, but will not always be populated.
const PrizeInfo = styled.div`

    grid-area:prize;

    
    background-image: url(${props => props.image});

    //Size will likely change.
    background-size: 100% 100%;
    background-position: center;

    justify-self: end;
    margin-right:2.5%;
`;


//Contain host Icon, so profile picture
//or if host omseone else we'll get from somewhere else.
const HostIcon = styled.div`


    grid-area:host;
    background-image:url(${props => props.image});
    width:40%;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;

    justify-self:center;
`;

const Title = styled.p`

    grid-area:title;
    justify-self:center;
    font-size:2.5em;
`;


const Footer = styled.div`

    grid-area:footer;
    margin:auto;
    display:flex;
    width:90%;
    justify-content: space-between;
    display:grid;
    grid-template-columns:auto auto;
    grid-template-rows: 100%;
    padding-bottom:5px;
`;

const Location = styled.div`

    place-self:end;

`;

const Date = styled.div`
    
    justify-self:start;
    align-self:end;

`;

const EventCard = props => {


    //Maybe just an image?
    //Becaues will be filtered by year / semester, only need month and day.
    const dateFormat = "MMM DD";
    const {title,host, location, startDate, endDate, thumbnail, prizeInfo, onClickCard} = props;

    //Will be up to discretion of uploader of event.


    const hostIcon = "https://firebasestorage.googleapis.com/v0/b/ceswebsite-cf841.appspot.com/o/EventThumbnails%2FCES_Signup_Poster.png?alt=media&token=cc890cb6-c48c-4972-bdca-184df8d8e2f9";

    const sameDay = dateFns.isSameDay(startDate, endDate);
    console.log("hostIcon", hostIcon);
    return (

            <Card image = {thumbnail} style = {props.style} onClick = {onClickCard}>

            
                <PrizeInfo image = {prizeInfo}> prize Info </PrizeInfo>

                <HostIcon image = {hostIcon}>  </HostIcon>

                <FadeArea>


                <Title> {title} </Title>

                <Footer>
                    
                    <Date> 
                        {dateFns.format(startDate,dateFormat)} {!sameDay && <span> - </span>} { !sameDay && <span> - </span> && dateFns.format(endDate,dateFormat) }
                    </Date>

                    <Location> {location ||  "Rm. 147, Cogswell College"} </Location>

                </Footer>

                </FadeArea>

            </Card>





    )

}

export default EventCard;