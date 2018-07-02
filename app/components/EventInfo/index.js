
//This component is for
import React from 'react';
import styled from 'styled-components';
import { formatMDY} from 'utils/formatDate'; 




const Button = styled.button`

`;

const EventInfoWrapper = styled.div`
      
        margin-top:3%;
`;

const HostLink = styled.a`

        
`


const InfoBlock = styled.div`



`

const EventTitle = styled.h2`

        display:inline;

`;

const EventDescription = styled.p`

        

`;

const TimeInfo = styled.div`


`
const Actions = styled.div`


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


    return (<EventInfoWrapper>
            
                {loading?

                        <p> Loading Event</p>
                
                        :                               
                        <InfoBlock>
                                <EventTitle>{title}</EventTitle>
                                 { " hosted by"} <HostLink> {host} </HostLink> 
                                <GuestBlock>
                                        {/*Here will iterate through array of guests*/}
                                </GuestBlock>
                                <TimeInfo> Date: {formattedStartDate + " - " + formattedEndDate} </TimeInfo>
        
                                <EventDescription> {description} </EventDescription>
                        </InfoBlock>
                }

                {loggedInUser == null?

                        <p> You must be logged in to mark yourself an attendee of this event </p>
                :
                        isAttendee? 
                                
                                < Button onClick = { () => {props.onCancel(event)}}> Cancel Attendance </Button>
                        :
                                <Button hidden = {props.onAttend == null } onClick = { () => {props.onAttend(event)}}> Attend </Button>
                 }

                 <Button onClick = { () => {props.onExit()} }> Close </Button>
                 <p> {error} </p>


        
        </EventInfoWrapper>);

}


export default EventInfo;