//The card view for grid view of events instead of calendar.
import React from 'react';
import styled from 'styled-components';
import dateFns from 'date-fns';
import Tags from 'components/Tags';
import media, {sizes} from 'theme/media';

const Card = styled.div`

    
    cursor:pointer;
    background-image: url(${props => props.image});
    background-size: 100% 100%;
    height:100%;
    background-position: center;
    background-repeat: no-repeat;
    
    height:20em;
    margin-bottom:5em;

    display:grid;
    grid-template-columns: 100%;
    grid-template-rows: 1fr auto;
    grid-template-areas:
    "extraInfo"
    "fade";  
    //color:rgb(254, 161, 0);
    color:white;
    font-weight:bold;

    transition: transform .2s; 

  
    &:hover{

        //padding:5px;
        //Maybe transform instead.
        transform: scale(1.05);
    }    //Ahhh this is problem.
    

    width:30%;  
    margin:auto;
    margin-top:5%;
    ${media.tablet`

        width:90%;
    `}

    ${media.phone}
    
    
`;


const FadeArea = styled.div`

    grid-area:fade;
    height:100%;
    background-size: 100% 100%;
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
const ExtraInfo = styled.div`

    grid-area:extraInfo;
    
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
    width:100%;
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;

    justify-self:center;
`;

const Title = styled.p`

    grid-area:title;
    justify-self:center;
    text-align:center;
    ${media.tablet`

        font-size:64px;
    `}
    ${media.phone`
        
        font-size:30px;
    `}
`;


const Footer = styled.div`

    grid-area:footer;
    margin:auto;
    display:flex;
    width:100%;
    display:grid;
    grid-template-columns:auto auto;
    grid-template-rows: 100%;
    padding-bottom:5px;
    ${media.tablet`

        //Actually do have to change it.
        grid-template-columns:100%;
        grid-template-rows:auto auto;

    `}

    
`;

const Location = styled.p`

    place-self:end;
    margin-right:2.5%;
   ${media.tablet`

        margin-left:2.5%;
        margin-right:0;
        place-self:start;
    `}
    ${media.phone}

`;

const Date = styled.p`
    
    
    justify-self:start;
    align-self:end;
    margin-left:2.5%;
    ${media.tablet`
        align-self:start;
        place-self:start;
    `}
    ${media.phone}
    
`;

const EventCard = props => {


    //Becaues will be filtered by year / semester, only need month and day.
    const dateFormat = "MMM DD";
    const {title,host, location, startDate, endDate, thumbnail, tags, prizeInfo, onCardClicked} = props;
    console.log("host", host);
    const sameDay = dateFns.isSameDay(startDate, endDate);
    return (

            <Card image = {thumbnail} style = {props.style} onClick = {onCardClicked} >

            
                {prizeInfo && <ExtraInfo image = {prizeInfo}>  </ExtraInfo>}
                {/*Tags is too much happening on the card*/}
                {/*<Tags tags = {tags} style = {{gridArea:"extraInfo", }}/>*/}

                {/*I'll get feedback for this later <HostIcon image = {hostIcon}>  </HostIcon>
                */}
                <FadeArea>


                <Title> {title} </Title>

                <Footer>
                    
                    <Date> 
                        {dateFns.format(startDate,dateFormat)} {!sameDay && <span> - </span>} { !sameDay && <span> - </span> && dateFns.format(endDate,dateFormat) }
                    </Date>

                    <Location> {location} </Location>

                </Footer>

                </FadeArea>

            </Card>





    )

}

export default EventCard;