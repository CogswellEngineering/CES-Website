
//This component is for
import React from 'react';
import styled from 'styled-components';
import { formatMDY} from 'utils/formatDate'; 
import Modal from 'react-responsive-modal';




const Button = styled.button`

        border:1px solid black;
        &:hover{

                background:#D9D7D6;

        };

`;

const EventInfoWrapper = styled(Modal)`
      
        
`;

const HostLink = styled.a`

       // display:block;
        font-style:italic;
        color:green;
        text-decoration:none;
`


const InfoBlock = styled.div`

        margin-top:50px;


`

const EventHeader = styled.div`

        border-bottom: 1px solid black;
`;

const EventTitle = styled.h2`

        display:inline;
`;

const EventDescription = styled.p`
`;

const TimeInfo = styled.div`
`

const ViewMoreButton = styled.div`

        cursor:pointer;
        text-decoration:underline;

`;



const GuestBlock = styled.span`

`

const AttendingNotice = styled.p`


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

    const formattedStartDate = formatMDY(startDate);
    const formattedEndDate = formatMDY(endDate);
    //This will be pop up over the calendar instead, probably modal.
    console.log("props of event info", props);


    return (
       
        <EventInfoWrapper  
                
                open = {props.event != null}
                onClose={() => {props.onExit()}}
                center = {true}>
            
                                        
                        <InfoBlock>
                                <EventHeader>
                                        <EventTitle>{title}</EventTitle>
                                        {  " hosted by "} <HostLink href="#"> {host || "TBD"} </HostLink> 
                                        <TimeInfo> 
                                           
                                                Date: {formattedStartDate + " - " + formattedEndDate} 
                                
                                        </TimeInfo>

                                </EventHeader>
                                <GuestBlock>
                                        {/*Here will iterate through array of guests Will be in full page? Or good on preview hmm.*/}
                                </GuestBlock>
                                
        
                                <EventDescription> {description} </EventDescription>
                        </InfoBlock>
                

                {loggedInUser && isAttendee &&

                        <AttendingNotice> You are attending this event</AttendingNotice>
                 }

                 <ViewMoreButton onClick = { () => {onMoreClicked(); props.onExit();}}> See more </ViewMoreButton>

        </EventInfoWrapper>
        );

}


export default EventInfo;