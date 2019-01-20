import React, { Component} from 'react';
import styled from 'styled-components';
import media from 'theme/media';

import { withFirebase} from 'react-redux-firebase';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { compose } from 'redux';
import EventCard from 'components/EventCard';
import EventInfo from 'components/EventInfo';
import reducer from './reducer';
import injectReducer from 'utils/injectReducer';
import saga from './saga';
import injectSaga from 'utils/injectSaga';
import { EVENTS_PATH } from 'SiteData/constants';
import Calendar from 'components/Calendar';
import {

    eventSelected,
    updateEvents,
    closeEvent,
    filterChanged,

} from './actions';

import {

    createSelectEvents,
    createSelectEvent,
    createSelectMonth,
    createSelectFlag,
    createSelectFilter,
} from './selectors';



import {

    EventsWrapper,
    GridView,
    ViewSelection,

} from 'components/StyledComponents/EventsPage';
import {Headline, Subtitle} from 'components/General';

class EventsPage extends Component{


    constructor(props){

        super(props);

        this.unsubscribe = null;
        this.state = {

            //I REALLY only need calendar to be vs grid view
            //but for brevity and extension of other views, for whatever reason I'll do same as 
            //admin panel selection.
            calendarView: false,
        }


        this.onChangeView = this.onChangeView.bind(this);
        this.onGoToEvent = this.onGoToEvent.bind(this);
        
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
        const eventsRef = this.props.firebase.firestore().collection("ClubInfo").doc("Events").collection("EventCards");


        //Basically checking if fields within fields updated, as in startDate, event titles etc.
        const options = {
            //For changes to alrady added posts.
            includeMetadataChanges: true,
        };


       
        //If I didn't make this an onSnapshot and just a get instead, would be easer to cache.
        //Also need to look into optimizing this.

        this.unsubscribe = eventsRef.orderBy("startDate").onSnapshot(options, querySnapshot => {

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

    onChangeView(view){

        //This way IS kind of ugly lol.
        //But cleaner way is waste of variables when I know there won't be other options to turn off here.
        if (view == "Calendar"){

            this.setState({

                calendarView: true,
            });
        }
        else{

            this.setState({

                calendarView: false,
            })
        }
    }

    onGoToEvent(event){

        console.log(this.props);

        const {history, selectedEvent} = this.props;
        
        console.log("event",event);
        //becaues I do this. Better if i make it a link.
        history.push("/events/"+ event.eventUid);

    }


    render(){

        const { selectedEvent, events, error ,isAttendee, filter,
            onCloseEvent, onEventSelected, onFilterChanged} = this.props;


        //Make it so when open, make big calendar hidden too.
        return (
        
        
        <EventsWrapper>

            <Headline> Participate in our Events! </Headline>
{/* Until fix calendar these gone.
            <ViewSelection>
                {/*Todo: Replace these with icons
                <Button onClick = {() => {this.onChangeView("Grid")}}> Grid View </Button>
                <Button onClick = {() => {this.onChangeView("Calendar")}}> Calendar View </Button>

            </ViewSelection>
*/}
            {this.state.calendarView?

            <div style = {{gridArea:"content", marginTop:"5%"}}>
                <Calendar events = {events} onSelectEvent = {onEventSelected} style={{width:"60%", margin:"auto"}} />
                <EventInfo event = {selectedEvent} onMoreClicked = {this.onGoToEvent}  onExit = {onCloseEvent}
                    isAttendee = {isAttendee} loggedInUser = {this.props.firebase.auth().currentUser}/>
            </div>
            :
            <GridView>
            
         
                {events && events.map( event => {

                    return <EventCard  
                    onCardClicked = {() => {this.onGoToEvent(event);}}
                    //I should avoid inline like this other than grid area.
                    key = {event.eventUid} {...event}/>
                })}

            </GridView>

            
            }
                {/*This will have buttons for filtering, and getting notifications for specific type of events*/}



            </EventsWrapper>);

    }

}

const mapStateToProps = createStructuredSelector({

    isAttendee : createSelectFlag("isAttendee"),
    loading : createSelectFlag("loading"),
    filter: createSelectFilter(),
    selectedEvent : createSelectEvent(),
    events : createSelectEvents(),
    
});

function mapDispatchToProps(dispatch){


    return {

        onFilterChanged : (newFilters) => {

            return dispatch(filterChanged(newFilters));
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

