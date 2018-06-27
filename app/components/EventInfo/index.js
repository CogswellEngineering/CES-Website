
//This component is for
import React from 'react';
import styled from 'styled-components';
import { Button} from 'react-strap';


const EventInfoWrapper = styled.div`



`;

const EventTitle = styled.p`



`;

const EventDescription = styled.p`



`;

const TimeInfo = styled.div`


`


//There will be event list via bigCalendar and clicking on them will pop up this page.
const EventInfo = (props) => {


    //If no event passed in or no longer clicking on event, then this shouldn't render anything.
    if (props.event == null || props.onExit == null){
            return null;
    }


   
    const {event, error, loading, submitting, isAttendee} = props;
   
    const {title, description, startDate, endDate } = event;


    //If going to add attend / RSVP buttons then this can no longer be a component
    //but has to be a container for attend? Or have the attend be within same div, but outside of this component
    //I'll try ladder.

    //Will turn this to a pop over, well does it need to be a pop over? should I make each thing click to spawn a popover instead of
    //this? Or make this into a wrapper around a popover. Pop over not neccessarry, should just pop subpanel.
    return (<EventInfoWrapper>
            
                {loading?
                        //Will add spinner animation here later. If this ternary doesn't work will just turn to normal if.
                        <p> Loading Event</p>
                :
                        <EventTitle>{title}</EventTitle>
                        <EventDescription> {description} </EventDescription>
                        <TimeInfo> {timeStart + " - " + timeEnd} </TimeInfo>
                }

                {isAttendee? 
                        //ToDo: turn this into cancel attendance button instead.
                        <p> You are marked as an attendee for this event </p>

                        //This can't be how I manage this. Because it's not based on them having submitted, but whether or not
                        //the user is already attending it. Could be another prop I give here, doesn't need to be a new prop in 
                        //EventsPage container though because well wait it's check. Fuck me this feels like I should have all attendees pulled too
                        //No fuck that. Okay so here's what I could do on
                        <Button onClick = {props.onCancelAttendance()}> Cancel Attendance </Button>
                :
                        <Button hidden = {props.onAttend == null } onClick = {props.onAttend();}> Attend <Button>
                 }

                 <Button onClick = { props.onExit(); }> Close </Button>
                 <p> {error} </p>


        
        </EventInfoWrapper>);

}


export default EventInfo;