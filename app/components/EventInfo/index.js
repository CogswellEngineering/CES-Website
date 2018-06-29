
//This component is for
import React from 'react';
import styled from 'styled-components';


const Button = styled.button`

`;

const EventInfoWrapper = styled.div`



`;


const InfoBlock = styled.div`



`

const EventTitle = styled.p`



`;

const EventDescription = styled.p`



`;

const TimeInfo = styled.div`


`
const Actions = styled.div`


`

//There will be event list via bigCalendar and clicking on them will pop up this page.
const EventInfo = (props) => {


    //If no event passed in or no longer clicking on event, then this shouldn't render anything.
    if (props.event == null || props.onExit == null){
            return null;
    }


   
    const {event, error, loading, isAttendee,loggedInUser} = props;

    console.log("logged in User", loggedInUser);
   
    var {title, description, startDate, endDate } = event;
    //Will turn this to a pop over, well does it need to be a pop over? should I make each thing click to spawn a popover instead of
    //this? Or make this into a wrapper around a popover. Pop over not neccessarry, should just pop subpanel.
    return (<EventInfoWrapper>
            
                {loading?
                        //Will add spinner animation here later. If this ternary doesn't work will just turn to normal if.
                        <p> Loading Event</p>
                :
                               
                        <InfoBlock>
                                <EventTitle>{title}</EventTitle>
                                <EventDescription> {description} </EventDescription>
                                <TimeInfo> {startDate + " - " + endDate} </TimeInfo>
                        </InfoBlock>
                }

                {loggedInUser == null?

                        <p> You must be logged in to mark yourself an attendee of this event </p>
                :
                        isAttendee? 
                                
                                <Button onClick = { () => {props.onCancel(event)}}> Cancel Attendance </Button>
                        :
                                <Button hidden = {props.onAttend == null } onClick = { () => {props.onAttend(event)}}> Attend </Button>
                 }

                 <Button onClick = { () => {props.onExit()} }> Close </Button>
                 <p> {error} </p>


        
        </EventInfoWrapper>);

}


export default EventInfo;