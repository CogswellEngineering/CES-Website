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
    Picture,
    Header,
    Body,
    Poster,
    Footer,
    Description,
    DateAndTime,
    Agenda,
    AgendaItem,
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
            posterPicture: null,
            selectedIndex:0,
        };

        //OnAttend and OnTrack maybe better as dispatches actually
        //through a saga, since they both effect database.
       
        this.onShareClicked = this.onShareClicked.bind(this);

        this.updatePosterPicture = this.updatePosterPicture.bind(this);
    }


    componentDidMount(){
        this.pullEventData();


    }

    shouldComponentUpdate( nextProps, nextState){

        console.log("current State", this.state);
        console.log("next state", nextState);
        if (nextProps.event != this.props.event ||
             nextProps.isAttending != this.props.isAttending ||
            nextProps.isTracking != this.props.isTracking || 
            this.state.posterPicture != nextState.posterPicture  ||
             this.state.selectedIndex != nextState.selectedIndex
            ){

            return true;
        }

        return false;
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
        const {onAttendEvent, onTrackEvent} = this.props;
        console.log(startDate);
        const format = "MMM D";
        return (
            <Header>

                <div style = {{gridArea:"date"}}>{dateFns.format(startDate,format)}</div>
                <div style = {{gridArea:"title"}}>{title}</div>
                <div style = {{gridArea:"host"}}>by {host}</div>
                <div style = {{gridArea:"footer", display:"flex", flexWrap:"nowrap", placeSelf: "bottom", justifyContent:"space-evenly"}}>
                
                    <div style = {{alignSelf:"flex-end",cursor: "pointer", border: "1px solid black"}} onClick = {() => {onTrackEvent();}}> Track </div>
                    <div style= {{alignSelf:"flex-end", cursor:"pointer", border: "1px solid black"}}  onClick = { () => {onAttendEvent();}}> Attend </div>
                 </div>
            </Header>
        );
    }

    updatePosterPicture(i, image){

        const obj ={key: i.key}
        this.setState({

            posterPicture: image,
            selectedIndex:obj.key,
        });
    }

    renderGallery(){

        const {gallery } = this.props.event;
        console.log("gallery", gallery);
        var i = {key: 0};
        return (
             <Gallery>

                {gallery && gallery.map( picture => {

                    console.log("picture", picture);
                    //Prob should make something here lol.
                    //They shouldn't have multiple of same picture anyway
                    //but I should later on add a check for that or make key more unique.
                    const newObj = {key: i.key + 1};
                    i.key += 1;
                   return <Picture key = {newObj.key + picture} selected = {newObj.key == this.state.selectedIndex} image = {picture} onClick = { (evt) => {this.updatePosterPicture(newObj,picture)}}/>
                })}
                

            </Gallery>
        );
    }


    renderBody(){



        const {description, agenda, startDate, endDate, location, callToAction, contact} = this.props.event;
        //Body will be it's own grid

        const dateFormat = "MMMM D YYYY h:mm A";
        return (
            <Body>
                {/*Prob doesn't need to be styled component, just set grid name*/}
                <Description> {description} </Description>
                
                {/*does need to be cause maybe a grid in itself*/}
                <DateAndTime> 
                       <p> {dateFns.format(startDate, dateFormat)} - {dateFns.format(endDate, dateFormat)} </p>

                </DateAndTime>

                {/*Same case as Description, actually know this will be a ul, prob flex of times and titles*/}
                {agenda && <Agenda> 

                        {
                            agenda.map(item => {

                                const timeFormat = "h:mm a";
                                const {start, end} = item.timeframe;

                                return <AgendaItem key = {item.activity}> 

                                    <p style = {{gridArea: "timeFrame"}}>
                                    {dateFns.format(start.toDate(), timeFormat)} - {dateFns.format(end.toDate(), timeFormat)} 
                                    </p>
                                    <div style = {{gridArea: "activity"}}>
                                        {item.activity}
                                    </div>

                                </AgendaItem>
                            })
                        }

                </Agenda>
                }

                <Location> 
                    {/*don't really need to be separate... Also just feeling lazy.
                    <p> {location.state} </p>
                    <p> {location.city} </p>
            <p> {location.}*/}

                    {location}

                </Location>
                
                {/*Same as description*/}
                <CallToAction> {callToAction} </CallToAction>

                {/*Same as description* actually no will be div with images inside it so a flex. Still actually lol.*/}
                <Contact> </Contact>
               
            </Body>
        )
    }

    //CallToAction, contact, tags, etc.
    renderFooter(){

        const {tags, shareLinks} = this.props.event;
        return (
            <Footer>
            
                {/*Should have reusable tags, I'll just use those*/}
                {tags && <Tags> 

                    {/*Take from tag from elsewhere and use same*/}
                    {tags.map (tag => {

                        return <div> {tag} </div>
                    })}

                </Tags>

                }

                {/*Will be flex box with image links*/}
                {shareLinks && <Share> 
                    
                    {shareLinks.map(shareLink => {

                            //Not SUPER important to have thse, this is extra shit honeslty, core first my man
                            //get layout done.
                        <a href = {shareLink}/>
                    })}

                </Share>
                }
            </Footer>
            );

    }

    render(){

        console.log("event page props", this.props);

        const {event, attending, tracking} = this.props;

        if (event == null){
            return null;
        }
        console.log("event on eventpage", this.state);
        
        const poster = this.state.posterPicture || event.gallery[0] || event.poster;
        return (
            <Wrapper>
            
                <Poster image = {poster}/>
                {this.renderHeader()}
                {this.renderGallery()}
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