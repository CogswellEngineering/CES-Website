
//This component is for
import React from 'react';
import styled from 'styled-components';
import dateFns from 'date-fns';
import Modal from 'react-responsive-modal';




const Button = styled.button`

        border:1px solid black;
        &:hover{

                background:#D9D7D6;

        };

`;

const EventInfoWrapper = styled(Modal)`
      
        display:grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 2fr 1fr;
        grid-template-areas:
        "header header"
        "body body"
        "footer footer";
`;

const Footer = styled.div`

        grid-area:footer;
        display:flex;
        justify-content:space-between;

`;

const HostLink = styled.a`

       // display:block;
        font-style:italic;
        color:green;
        text-decoration:none;
`


const InfoBlock = styled.div`

        margin-top:50px;
        grid-area:header;

`

const EventHeader = styled.div`

        border-bottom: 1px solid black;
`;

const EventTitle = styled.h2`

        display:inline;
`;

const EventDescription = styled.p`

        grid-area:body;
        line-height:1.6em;
        height:6em;
        overflow:hidden;
`;

const TimeInfo = styled.div`
`


//Could remake this to be Link, did and worked fine, but the scrolling not as intended.
const ViewMoreButton = styled.div`

        cursor:pointer;
        place-self:center;
        text-decoration:underline;

`;



const GuestBlock = styled.span`

`

const AttendingNotice = styled.p`

        color:green;
`;

//There will be event list via bigCalendar and clicking on them will pop up this page.
const EventInfo = (props) => {


    //If no event passed in or no longer clicking on event, then this shouldn't render anything.
    if (props.event == null || props.onExit == null){
            return null;
    }


    //Something good to add here would be the publicist poster for the event(If it exists, since others are outside events.);
    //Also add hosted by in here as well.
    /*
        Publicist Event Poster
        Host(s) of event
        Guest Attendees.(Non-student industry or alumni attendees)
    */
   
    const {event, isAttendee,loggedInUser,
        onMoreClicked} = props;

   
    var {title, host, description, startDate, endDate } = event;

    const format = "MM/D/YYYY";
    const formattedStartDate = dateFns.format(startDate,format);
    const formattedEndDate = dateFns.format(endDate,format);
    //This will be pop up over the calendar instead, probably modal.
    console.log("props of event info", props);

    //So either reformat this
    //or say fuck it. Remake this
    //Or both?

    console.log("loggedInUser", loggedInUser);
    return (
       
        <EventInfoWrapper  
                
                open = {props.event != null}
                onClose={() => {props.onExit()}}
                center = {true}>
            

                                        
                        <InfoBlock>
                                <EventHeader>
                                        <EventTitle>{title}</EventTitle>
                                        {  " hosted by "} <HostLink href="#"> {host.name || "TBD"} </HostLink> 
                                        <TimeInfo> 
                                           
                                                Date: {formattedStartDate + " - " + formattedEndDate} 
                                
                                        </TimeInfo>

                                </EventHeader>
                                <GuestBlock>
                                        {/*Here will iterate through array of guests Will be in full page? Or good on preview hmm.*/}
                                </GuestBlock>
                                
        
                        </InfoBlock>
                        <EventDescription> {description} </EventDescription>
                
                <Footer>
                {loggedInUser &&
                        <AttendingNotice>  
                                
                                {isAttendee? 
                                        "You are attending this event"
                                :       ""
                                }


                        </AttendingNotice>
                 }

                 <ViewMoreButton onClick = { () => {props.onExit(); onMoreClicked(); }}> See more </ViewMoreButton>
                 </Footer>
        </EventInfoWrapper>
        );

}


export default EventInfo;