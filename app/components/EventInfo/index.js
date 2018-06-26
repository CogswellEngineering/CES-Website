
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


    const {title, description, startDate, endDate,
         } = props.event;

    //If going to add attend / RSVP buttons then this can no longer be a component
    //but has to be a container for attend? Or have the attend be within same div, but outside of this component
    //I'll try ladder.

    //Will turn this to a pop over, well does it need to be a pop over? should I make each thing click to spawn a popover instead of
    //this? Or make this into a wrapper around a popover. Pop over not neccessarry, should just pop subpanel.
    return (<EventInfoWrapper>
            
                
                <Button onClick = { props.onExit(); }> Close </Button>
                <EventTitle>{title}</EventTitle>
                <EventDescription> {description} </EventDescription>
                <TimeInfo> {timeStart + " - " + timeEnd} </TimeInfo>
        
        </EventInfoWrapper>);

}


export default EventInfo;