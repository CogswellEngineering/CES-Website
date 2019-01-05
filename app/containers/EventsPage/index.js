import React, { Component} from 'react';
import styled from 'styled-components';
import EventInfo from 'components/EventInfo';
import { withFirebase} from 'react-redux-firebase';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './custom-big-calendar.css';

import moment from 'moment'

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import reducer from './reducer';
import injectReducer from 'utils/injectReducer';
import saga from './saga';
import injectSaga from 'utils/InjectSaga';
import { EVENTS_PATH } from 'components/Header/pages';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

import {

    monthSelected,
    eventSelected,
    attendPressed,
    updateEvents,
    closeEvent,
    cancelAttendance,
    filterChanged,

} from './actions';

import {

    createSelectEvents,
    createSelectEvent,
    createSelectMonth,
    createSelectFlag,
    createSelectError,
    createSelectFilter,
} from './selectors';


const EventsWrapper = styled.div`

    padding-bottom:5%;
  //  margin-top:5%;
`

const CalendarWrapper = styled.div`

   // border:2px solid black;
    width:60%;
    @media (min-height:400px){
        height:450px;
    }
    @media (min-height:1000px){

    }
    margin-left:2.5%;
    margin-top:5%;
    display: inline-block;
   
`;

const FilteringSection = styled.div`

    margin-top:5%;

    width:30%;
    margin-left:5%;
    float:right;
    
`;

const StyledCheckboxGroup = styled(CheckboxGroup)`

    margin-left:5%;
    

`



const FilterHeader = styled.p`

    font-weight:bold;
    //border-bottom: 1px solid black;
    //width:80%;
`;

const FilterLabel = styled.label`

    display:block;
`;

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))


class EventsPage extends Component{


    constructor(props){

        super(props);

        this.unsubscribe = null;
        this.state = {

            possibleFilters:[],
        }
        this.calendarStyle = {

            background:'blue'
        };
    }

    eventStyleGetter(event, start, end, isSelected){
        
        //Color changse depending on event type
        //If start ends 
        var color = 'green';

        //Is it redundant to have both filter system AND color coded? Because if color coded, then don't gotta filter
        //well it does get rid of the + for more though.
        switch (event.eventType){


            case 'Hackathon':
                break;
            
            case 'Workshop':
                break;

            case 'Meeting':
                break;
            
            case 'Contest':
                break;

        }

        console.log("event",event);
        

        var style = {
            backgroundColor: (isSelected?  '#1d9639' : 'green' ),
            
        }

        return {
            style:style,
        }
    }

    componentDidMount(){

        const eventsRef = this.props.firebase.firestore().collection("ClubInfo").doc("Events");

        eventsRef.get()
            .then( doc => {

                if (doc.exists){

                    const eventTypes = doc.get("eventTypes");
                    this.setState({
                        possibleFilters:eventTypes,
                    });
                }
            })

        this.getEvents();
        
    }

    getEvents(){

        //Set up event listener to listen for update to event list.
        const eventsRef = this.props.firebase.firestore().collection("ClubInfo").doc("Events").collection("EventList");


        //Basically checking if fields within fields updated, as in startDate, event titles etc.
        const options = {
            //For changes to alrady added posts.
            includeMetadataChanges: true,
        };


       


        this.unsubscribe = eventsRef.onSnapshot(options, querySnapshot => {

                var events = [];
        
                querySnapshot.forEach( doc => {
        
                    const event = doc.data();
                        //Or I suppose I could filter it here and stop being retarded.
                        //But then it's not optimized, also what's faster filtering here, then they add another filter, pull again?
                        //That's alot of requests to the server which is probably slow.
                    event.startDate = event.startDate.toDate();
                    event.endDate = event.endDate.toDate();
                    events.push(event);
                    
                });
                    console.log("events after initial pull",events)
                    //So have to compile it all together afterwards since OR doesn't exist  only AND.
                    //I could also keep it simple and filter on the selector. I'll get food and try to think of solutions while I eat.
                    this.props.onEventsUpdated(events);
            });
                
        
        
      
    }
    
    componentWillUnmount(){

        if (this.unsubscribe){
            this.unsubscribe();
        }
    }

    

    render(){

        const { selectedEvent, events, selectedMonth, error, tryingToAttend ,isAttendee, filter,
            onCloseEvent, onEventSelected, onMonthSelected, onAttendEvent, onCancelAttendance, onFilterChanged} = this.props;
        

        if (events == null || this.state.possibleFilters.length == 0){

            return null;
        }


        console.log("events",events);
        //Make it so when open, make big calendar hidden too.
        return (
        
        
        <EventsWrapper>
        <CalendarWrapper >



            
            {/*Well I don't want it hidden just overlayed on top of*/}
            <BigCalendar 
               // style={this.calendarStyle}
                aria-hidden={"true"}
                onSelectEvent = { (event,target) => {

                        console.log("event selected",event);

                        
                        onEventSelected(event);
                    }
                }
                eventPropGetter = {(this.eventStyleGetter)}
              
                events = {events}
                startAccessor = 'startDate'
                endAccessor = 'endDate'
                min = {new Date()}
                popup = {true}
                views = {[ 'month']}

            />

            <EventInfo event = {selectedEvent} onAttend = {onAttendEvent} onCancel = {onCancelAttendance} onExit = {onCloseEvent} error={error}
                loading={tryingToAttend} isAttendee = {isAttendee} loggedInUser = {this.props.firebase.auth().currentUser}/>
            
            
            </CalendarWrapper>
            <FilteringSection>
                {/*This will have buttons for filtering, and getting notifications for specific type of events*/}

                <h2 style={{borderBottom:'2px solid black', width:'80%'}}> Filter </h2>


                <StyledCheckboxGroup value={filter} checkboxDepth={2} onChange={ (newFilter) => {onFilterChanged(newFilter)}}
                    >
                    <FilterHeader> Event Type </FilterHeader>
                    {this.state.possibleFilters.map(eventType => {
                        return <FilterLabel><Checkbox value={eventType}/> {eventType} </FilterLabel>
                    })}

                </StyledCheckboxGroup>
            </FilteringSection>
            </EventsWrapper>);

    }

}

const mapStateToProps = createStructuredSelector({

    isAttendee : createSelectFlag("isAttendee"),
    loading : createSelectFlag("loading"),
    filter: createSelectFilter(),
    selectedEvent : createSelectEvent(),
    selectedMonth : createSelectMonth(),
    events : createSelectEvents(),
    error : createSelectError(),
    
});

function mapDispatchToProps(dispatch){


    return {

        onFilterChanged : (newFilters) => {

            return dispatch(filterChanged(newFilters));
        },

        onMonthSelected : (month) => {

            return dispatch(monthSelected(month));

        },

        onCloseEvent : (evt) => {

            if (evt && evt.preventDefault){
                evt.preventDefault();
            }

            return dispatch(closeEvent());
        },

        onEventSelected : (event) => {
            
            return dispatch(eventSelected(event));
        },


        onEventsUpdated : (events) => {

            return dispatch(updateEvents(events));
        },

        onAttendEvent : (event) => {

            return dispatch(attendPressed(event));
        },

        onCancelAttendance : (event) => {

            return dispatch(cancelAttendance(event));
        },
        
    }

}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({key: EVENTS_PATH, reducer});
const withSaga = injectSaga({key: EVENTS_PATH, saga});

export default compose(

    withConnect,
    withReducer,
    withSaga,
    withFirebase,


)(EventsPage);

