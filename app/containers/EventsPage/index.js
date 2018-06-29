import React, { Component} from 'react';
import styled from 'styled-components';
import EventInfo from 'components/EventInfo';
import { withFirebase} from 'react-redux-firebase';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import moment from 'moment'

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import reducer from './reducer';
import injectReducer from 'utils/injectReducer';
import saga from './saga';
import injectSaga from 'utils/InjectSaga';
import { EVENTS_PATH } from 'components/Header/pages';

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
    createSelectFlag,
    createSelectError,
} from './selectors';


const CalendarWrapper = styled.div`

    height:400px;
    width:60%;
    margin:auto;
`;
BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

class EventsPage extends Component{


    constructor(props){

        super(props);

        this.unsubscribe = null;
    }

    componentDidMount(){

        this.setUpEventListener();
        
    }

    setUpEventListener(){

        //Set up event listener to listen for update to event list.
        const clubInfoRef = this.props.firebase.firestore().collection("ClubInfo");


        //Basically checking if fields within fields updated, as in startDate, event titles etc.
        const options = {
            //For changes to alrady added posts.
            includeMetadataChanges: true,
        };
        
        this.unsubscribe = clubInfoRef.doc("Events").onSnapshot(options, snapshot => {
           
            //Attendees will be document in collection
            //but actual events will in array, instead of documents.
            const upcomingEvents = snapshot.get("eventList");
            
            for (var i in upcomingEvents){

                upcomingEvents[i].startDate = upcomingEvents[i].startDate.toDate();
                upcomingEvents[i].endDate = upcomingEvents[i].endDate.toDate();
            }

            this.props.onEventsUpdated(upcomingEvents);
        });
    }
    
    componentWillUnmount(){

        if (this.unsubscribe){
            this.unsubscribe();
        }
    }

    render(){

        const { selectedEvent, events, selectedMonth, error, tryingToAttend, justAttended,isAttendee,
            onCloseEvent, onEventSelected, onMonthSelected, onAttendEvent, onCancelAttendance,} = this.props;
        

        if (events == null){

            return null;
        }

        return (<CalendarWrapper>

            <BigCalendar 

                onSelectEvent = { (event,target) => {

                        console.log("event selected",event);

                        
                        onEventSelected(event);
                    }
                }
              
                events = {events}
                startAccessor = 'startDate'
                endAccessor = 'endDate'
                views = {[ 'month', 'agenda']}
            />

            <EventInfo event = {selectedEvent} onAttend = {onAttendEvent} onCancel = {onCancelAttendance} onExit = {onCloseEvent} error={error}
                loading={tryingToAttend} isAttendee = {isAttendee} loggedInUser = {this.props.firebase.auth().currentUser}/>
            
            
            </CalendarWrapper>)

    }

}

const mapStateToProps = createStructuredSelector({

    isAttendee : createSelectFlag("isAttendee"),
    loading : createSelectFlag("loading"),
    selectedEvent : createSelectEvent(),
    selectedMonth : createSelectMonth(),
    events : createSelectEvents(),
    error : createSelectError(),
    
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
const withReducer = injectReducer({key: EVENTS_PATH, reducer});
const withSaga = injectSaga({key: EVENTS_PATH, saga});

export default compose(

    withConnect,
    withReducer,
    withSaga,
    withFirebase,


)(EventsPage);

