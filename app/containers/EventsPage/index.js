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

import {

    monthSelected,
    eventSelected,
    attendPressed,
    updateEvents,
    closeEvent,
    cancelAttendance,

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
        const clubInfoRef = this.props.firebase.firestore().collection("ClubInfo");

        //Will store a year's worth of events at time only. Rest will be hard copies to stored elsewhere for history.
        //Add a where clause here for month == to month in state.
        this.subscribe = clubInfoRef.doc("Events").onSnapshot(snapshot => {

          
            //Going to have events array and attendees array,
            // attendees array will have foreign key that matches to event, and value pair is array of attendees, uids of users.
            //Unique keys would be both name of event and startDate of it, as there maybe event of same name
            //throughout semseter or year. Bit duplicate data with the keys in attendees.
            //Cannot currently think of way to do it without duplication, other than storing attendees, but one, I don't want to
            //get attendees list cause that's not needed and two I do not want to update everytime new attendee cause doesn't change
            //anything shown / used here. Only thing would be if has max occupancy.
            //Yeah going to have attendees collection where each document is uid of attendee, and field of event info.
            //ALOT of rows, but firestore makes it so a query for 100 rows performs just as well for 1 million rows, it's beautiful

            const upcomingEvents = snapshot.get("eventList");
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

        const { selectedEvent, selectedMonth, events, error, tryingToAttend, justAttended,
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

            <EventInfo event = {selectedEvent} onAttend = {onAttendEvent} onCancel = {onCancelAttendance} onExit = {onCloseEvent} error={error}
                loading={tryingToAttend} submitted={ justAttended }/>
            
            
            </CalendarWrapper>)

    }

}

//Need to add error, and loading onto here
const mapStateToProps = createStructuredSelector({

    //Todo, add all thr boolean props in here, and anyother missing
    //I'll run to see anything small I missed after I merge it.
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
        }
        
    }

}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({key: EVENTS_PAGE_PATH, reducer});
const withSaga = injectSaga({key: EVENTS_PAGE_PATH, saga});

export default compose(

    withConnect,
    withReducer,
    withSaga,
    withFirebase,


)(EventsPage);

