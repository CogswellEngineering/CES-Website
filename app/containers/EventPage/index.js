import React, {Component} from 'react';
import { createSelector } from 'reselect'

import styled from 'styled-components';
//Don't need this one for this cause outdated firestore, only need this part for auth transferring
//which might actually need here. Actually doesn't need to be in redux.
//Except maybe for attending, but can just pass the dispatch as prop from events page into this..
//BUT WAIT, what if they go directly to this event page through their browser history? Then it won't be there.
//I have to have saga for attending, again, can I use same one?
import dateFns from 'date-fns';
import {connect} from 'react-redux';
import {compose} from 'redux';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import {SPECIFIC_EVENT} from 'components/Header/pages';
import {

    loadEvent,
    attendEvent,
    cancelAttendance,
    trackEvent,
    untrackEvent,
} from './actions';

import  {

    Wrapper,
    Gallery,
    Header,
    Body,
    Poster,
    Footer,
    Description,
    DateAndTime,
    Agenda,
    Contact,
    CallToAction,
    Tags,
    Share,
    Location,

} from 'components/StyledComponents/EventPage';

class EventPage extends Component{

    constructor(props){


        super(props);
        this.state = {

            shareWindowOpened: false,
        };

        //OnAttend and OnTrack maybe better as dispatches actually
        //through a saga, since they both effect database.
       
        this.onShareClicked = this.onShareClicked.bind(this);


    }


    componentDidMount(){
        this.pullEventData();


    }

    shouldComponentUpdate( nextProps, nextState){

        if (nextProps.event != this.props.event || nextProps.isAttending != this.props.isAttending ||
            nextProps.isTracking != this.props.isTracking){

            return true;
        }

        return true;
        

    }
    //Maybe this as well, but it's fine here, there doesn't need to be event info in global state.
    pullEventData(){

        const eventUid = this.props.match.params.uid;


        this.props.onLoadEvent(eventUid);
    }

    onShareClicked = () => {

    }


    renderHeader(){

        const {title, startDate, host} = this.props.event;

        return (
            <Header>



            </Header>
        );
    }

    renderGallery(){

        const {gallery } = this.props.event;
        return (
            <Gallery>

            </Gallery>
        );
    }


    renderBody(){



        const {description, agenda, dateAndTime, location, callToAction, contact} = this.props.event;
        //Body will be it's own grid
        return (
            <Body>
                {/*Prob doesn't need to be styled component, just set grid name*/}
                <Description> </Description>

                {/*does need to be cause maybe a grid in itself*/}
                <DateAndTime> 

                </DateAndTime>

                {/*Same case as Description, actually know this will be a ul, prob flex of times and titles*/}
                <Agenda> </Agenda>

                <Location> </Location>
                
                {/*Same as description*/}
                <CallToAction> </CallToAction>

                {/*Same as description*/}
                <Contact> </Contact>
               
            </Body>
        )
    }

    //CallToAction, contact, tags, etc.
    renderFooter(){

        const {tags, shareLinks} = this.props.event;
        return (
            <Footer>
            
                <Tags> </Tags>
                <Share> </Share>
            </Footer>
            );

    }

    render(){

        console.log("event page props", this.props);

        const {event, attending, tracking} = this.props;

        if (event == null){
            return null;
        }
        console.log("event on eventpage", event);
        const {poster} = event;

        return (
            <Wrapper>
            
                <Poster image = {poster}/>
                {this.renderHeader()}
                {this.renderBody()}
                {this.renderFooter()}

            </Wrapper>
        );
    }

}


const mapStateToProps = (state) => {



    if (state == null || state.get(SPECIFIC_EVENT)==null) return {};


    const eventPageState = state.get(SPECIFIC_EVENT);
    //So it's going here
    console.log("eventpage state", eventPageState);
    return {

        event : eventPageState.get("loadedEvent"),
        attending: eventPageState.get("isAttending"),
        tracking: eventPageState.get("isTracking"),

    };
}


const mapDispatchToProps = (dispatch) => {


    return {

            onLoadEvent: (eventUid) => {

                return dispatch(loadEvent(eventUid));
            },

            onAttendEvent: (userUid, eventUid) => {


                return dispatch(attendEvent(userUid, eventUid));
            },

            onCancelEvent: (userUid, eventUid) => {

                return dispatch(cancelAttendance(userUid, eventUid));
            },

            onTrackEvent: (user, eventUid) => {

                return dispatch(trackEvent(user, eventUid));
            },


            onUntrackEvent: (userUid, eventUid) => {

                return dispatch(untrackEvent(userUid, eventUid));
            }

        };


    }

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withReducer = injectReducer({key:SPECIFIC_EVENT, reducer });
const withSaga = injectSaga({key: SPECIFIC_EVENT, saga});

export default compose(

    withConnect,
    withReducer,
    withSaga,
)(EventPage);