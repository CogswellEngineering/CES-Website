import React, {Component} from 'react';
import { createSelector } from 'reselect'
import {

    FacebookShareButton,
    FacebookIcon,
    LinkedinShareButton,
    LinkedinIcon,
} from 'react-share';
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
    Title,
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
 //   Tags,
    Share,
    Location,

} from 'components/StyledComponents/EventPage';

import Tags from 'components/Tags';

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
             this.state.selectedIndex != nextState.selectedIndex || 
             this.props.loggedInUser != nextProps.loggedInUser
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
        const {onAttendEvent, onTrackEvent, loggedInUser} = this.props;
        const eventUid = this.props.match.params.uid;
        console.log(startDate);
        const format = "MMM D";
        return (
            <Header>

                <div style = {{ gridArea:"date", }}>{dateFns.format(startDate,format)}</div>
                <div style = {{fontSize:"1.5em",gridArea:"title", }}>{title}</div>
                <div style = {{gridArea:"host",  }}>by {host}</div>
                <div style = {{gridArea:"footer", display:"flex", flexWrap:"nowrap", placeSelf: "bottom", justifyContent:"space-evenly"}}>
                
                    <div style = {{alignSelf:"flex-end",cursor: "pointer", border: "1px solid black"}} 
                    onClick = {() => {onTrackEvent(loggedInUser.uid, eventUid);}}>
                     Track </div>
                    <div style= {{alignSelf:"flex-end", cursor:"pointer", border: "1px solid black"}}  
                    onClick = { () => {onAttendEvent(loggedInUser.uid,eventUid);}}>
                     Attend </div>
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
                   return <Picture key = {newObj.key + picture} selected = {newObj.key == this.state.selectedIndex} src = {picture} onClick = { (evt) => {this.updatePosterPicture(newObj,picture)}}/>
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
                <Description > 
                <Title> Description</Title>
                <p>{description}</p>
                {<Agenda> 

                    <Title> Agenda </Title>
                    {
                        agenda && agenda.map(item => {

                            const timeFormat = "h:mm a";
                            const {start, end} = item.timeframe;

                            return <AgendaItem key = {item.activity}> 

                                <p style = {{gridArea: "timeFrame",}}>
                                {dateFns.format(start.toDate(), timeFormat)} - {dateFns.format(end.toDate(), timeFormat)}
                                </p>
                                <p style = {{gridArea: "activity"}}>
                                    {item.activity}
                                    </p>

                            </AgendaItem>
                        })
                    }

                    </Agenda>
                    }

                <CallToAction> {callToAction} </CallToAction>

                 </Description>
                  {/*Same case as Description, actually know this will be a ul, prob flex of times and titles*/}
               
                
                {/*does need to be cause maybe a grid in itself*/}
                <div style = {{gridArea:"aside",  }}>
                <DateAndTime> 
                       <Title> Date and Time</Title>
                       <p> {dateFns.format(startDate, dateFormat)} - {dateFns.format(endDate, dateFormat)} </p>

                </DateAndTime>

                <Location> 
                    {/*don't really need to be separate... Also just feeling lazy.
                    <p> {location.state} </p>
                    <p> {location.city} </p>
            <p> {location.}*/}
                    <Title> Location</Title>
                    <p>{location}</p>

                </Location>

                <Contact> 
                    <Title> Contact </Title>
                </Contact>


                </div>
               

                
                
                {/*Same as description*/}

                {/*Same as description* actually no will be div with images inside it so a flex. Still actually lol.*/}
               
            </Body>
        )
    }

    //CallToAction, contact, tags, etc.
    renderFooter(){

        const {tags} = this.props.event;
        //But this in global state constants later.
        const domainName = "localhost:3000";   
        const shareUrl = domainName + this.props.match.url; 
        console.log(domainName + this.props.match.url);
        return (
            <Footer>
            
                <Title> Tags </Title>
                {/*Should have reusable tags, I'll just use those*/}
                { tags &&  <Tags tags = {tags}/>

                }

                <Title> Share with your friends! </Title>

                {/*Will be flex box with image links*/}
                { <Share> 
                    
                    <FacebookShareButton url = {shareUrl}>
                    <FacebookIcon size = {48} round = {true}/>
                    </FacebookShareButton>

                    <LinkedinShareButton url = {shareUrl} style = {{marginLeft:"1%"}}>
                    <LinkedinIcon size = {48} round = {true}/>
                    </LinkedinShareButton>
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
            
                <Poster image = {poster}>
                </Poster>
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

    const loggedInUser = state.get("firebase").auth;
    const eventPageState = state.get(SPECIFIC_EVENT);
    //So it's going here
    console.log("eventpage state", eventPageState);
    return {


        loggedInUser,
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

                console.log("userUid", userUid);
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