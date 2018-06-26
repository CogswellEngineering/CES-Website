import React, { Component} from 'react';
import styled from 'styled-components';
import EventInfo from 'components/EventInfo';
import { withFirebase} from 'react-redux-firebase';
import BigCalendar from 'react-big-calendar';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import reducer from './reducer';
import injectReducer from 'utils/injectReducer';
import saga from './saga';
import injectSaga from 'utils/InjectSaga';
import { EVENTS_PAGE_PATH } from 'components/Header/pages';
import { EventInfo } from 'components/EventInfo/';

import {

    monthSelected,
    eventSelected,
    attendPressed,
    updateEvents,
    closeEvent,

} from './actions';

import {

    createSelectEvents,
    createSelectEvent,
    createSelectMonth,
} from './selectors';


const CalendarWrapper = styled.div`

`;


//Does this even need state?
//State of Events:
    //Current event clicked? or should it just go there? It shouldn't be own page on route should it?
class EventsPage extends Component{


    constructor(props){

        super(props);

        this.unsubscribe = null;
        this.lastMonth = "";
    }

    componentDidMount(){

        this.lastMonth = this.props.month;
        this.setUpEventListener();
        
    }

    setUpEventListener(){

        //Set up event listener to listen for update to event list.
        const clubInfoRef = this.props.firebase.firestore().ref().collection("ClubInfo");

        //Will store a year's worth of events at time only. Rest will be hard copies to stored elsewhere for history.
        //Add a where clause here for month == to month in state.
        this.subscribe = clubInfoRef.doc("events").onSnapshot(snapshot => {

            //Event info, then attendee field as well. For what's to be shown only need info.
            const upcomingEvents = snapshot.get("eventInfo");
        });
        
    }

    //Need to check that if month was changed then change subscription to only query for stuff where month  = month selected
    //that or just get everything, and let Big-Calendar do the filtering.
    componentDidUpdate(){

        //I mean it makes sense right? Don't want to overwrite everything if it's not even what they're looking at.
        //But to set up new listener everytime change month looking at, how expensive si that?

        if (this.lastMonth != this.props.month){
    
            //Stop current event listener
            this.unsubscribe();
            //Then call it to start again.
            this.setUpEventListener();        
        }
    }


    render(){

        const { selectedEvent, selectedMonth, events,
            onCloseEvent, onEventSelected, onMonthSelected, onAttendEvent,} = this.props;

        return (<CalendarWrapper>

            <BigCalendar 
                //Don't think I need to give all the props of this to it.
                onSelectEvent = { (event,target) => {

                    //Target is the actual event selected.
                    onEventSelected(target);
                }
                }
                events = {events}
                startAccessor = 'startDate'
                endAccessor = 'endDate'
                views = {[ 'month', 'agenda']}
            />

            <EventInfo event = {selectedEvent} onExit = {onCloseEvent}/>
            
            
            </CalendarWrapper>)

    }

}

const mapStateToProps = createStructuredSelector({

    selectedEvent : createSelectEvent(),
    selectedMonth : createSelectMonth(),
    events : createSelectEvents(),
});

function mapDispatchToProps(dispatch){


    return {

        onMonthSelected : (month) => {

            return dispatch(monthSelected(month));

        },

        onCloseEvent : (evt) => {

            if (evt && evt.preventDefault){
                evt.preventDefault();
            }

            return dispatch(closeEvent());
        }

        onEventSelected : (event) => {
            
            return dispatch(eventSelected(event));
        },

        onEventsUpdated : (events) => {

            return dispatch(updateEvents(events));
        },

        onAttendEvent : (event) => {

            return dispatch(attendPressed(event));
        }
    }

}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({key: EVENTS_PAGE_PATH, reducer});
const withSaga = injectSaga({key: EVENTS_PAGE_PATH, saga});

export default compose{

    withConnect,
    withReducer,
    withSaga,
    withFirebase,


}(EventsPage);

