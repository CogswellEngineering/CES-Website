
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
        margin-top:5%;

`;

const EventInfoWrapper = styled(Modal)`
      
        margin-top:3%;
        //background:black;
        
`;

const HostLink = styled.a`

       // display:block;
        font-style:italic;
        color:green;
        text-decoration:none;


`


const InfoBlock = styled.div`

        margin-top:50px;
        border-bottom: 1px solid black;


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
const Actions = styled.div`

        text-align:center;


`

const GuestBlock = styled.span`



`



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
   
    const {event, error, loading, isAttendee,loggedInUser,} = props;

    console.log("logged in User", loggedInUser);
   
    var {title, host, description, startDate, endDate } = event;

    const formattedStartDate = formatMDY(startDate);
    const formattedEndDate = formatMDY(endDate);
    //This will be pop up over the calendar instead, probably modal.

    return (
       
        <EventInfoWrapper  
                
                open = {props.event != null}
                onClose={() => {props.onExit()}}
                center = {true}>
            
                {loading?

                        <p> Loading Event</p>
                
                        :                               
                        <InfoBlock>
                                <EventHeader>
                                        <EventTitle>{title}</EventTitle>
                                        {  " hosted by "} <HostLink href="#"> {host || "TBD"} </HostLink> 
                                        <TimeInfo> 
                                           
                                                Date: {formattedStartDate + " - " + formattedEndDate} 
                                
                                        </TimeInfo>

                                </EventHeader>
                                <GuestBlock>
                                        {/*Here will iterate through array of guests*/}
                                </GuestBlock>
                                
        
                                <EventDescription> {description} </EventDescription>
                        </InfoBlock>
                }

                {loggedInUser == null?

                        <p> You must be logged in to mark yourself an attendee of this event </p>
                :
                        isAttendee? 
                                <Actions>
                                        <Button onClick = { () => {props.onCancel(event)}}> Cancel Attendance </Button>
                                </Actions>
                        :
                                <Actions>
                                        <Button hidden = {props.onAttend == null } onClick = { () => {props.onAttend(event)}}> Attend </Button>
                                </Actions>
                 }

                 <p> {error} </p>


        
        </EventInfoWrapper>
        );

}


export default EventInfo;