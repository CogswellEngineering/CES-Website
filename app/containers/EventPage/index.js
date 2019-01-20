import React, {Component} from 'react';
import { createSelector } from 'reselect'
import {isTablet} from 'react-device-detect';
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
import {SPECIFIC_EVENT, USER_PROFILE_PATH, EMAIL} from 'SiteData/constants';
import {

    addView,
    loadEvent,
    attendEvent,
    cancelAttendance,
    trackEvent,
    untrackEvent,
} from './actions';
import {Button} from 'components/General';

import  {

    HostLink,
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
import { UserLink } from 'components/General';
import Tags from 'components/Tags';

class EventPage extends Component{

    constructor(props){


        super(props);
        this.state = {

            posterPicture: null,
            selectedIndex:0,
        };

        //OnAttend and OnTrack maybe better as dispatches actually
        //through a saga, since they both effect database.
       
        this.updatePosterPicture = this.updatePosterPicture.bind(this);
    }


    componentDidMount(){

        this.pullEventData();

        this.props.addView(this.props.match.params.uid);
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

    renderHeader(){

        const {title, startDate, host} = this.props.event;
        const {onAttendEvent, onTrackEvent, loggedInUser, isTracking, isAttending, onCancelEvent, onUntrackEvent} = this.props;
        console.log("loggedInUser", loggedInUser);
        const eventUid = this.props.match.params.uid;
        console.log("props", this.props);
        console.log(startDate);
        const format = "MMM D";
        const profilePath = USER_PROFILE_PATH.split(":")[0];

        return (
            <Header>

                <div style = {{ gridArea:"date", }}>{dateFns.format(startDate,format)}</div>
                <Title >{title}</Title>
                <div style = {{gridArea:"host"}}> hosted by  
                   
                    {
                        host.uid?
                        <UserLink to = {profilePath+host.uid}> {host.name} </UserLink>
                    :
                        <HostLink href = {"mailto:"+host.email}> {host.name || "TBD"} </HostLink>
                    }
                    
                </div>
                {loggedInUser.isEmpty?
                    <div style = {{textAlign:"center", color:"red",  alignSelf:"flex-end", gridArea:"footer"}}> You must be logged in to track or attend an event. </div>
                :
                <div style = {{gridArea:"footer", display:"flex", flexWrap:"nowrap", placeSelf: "bottom", justifyContent:"space-evenly"}}>
                
                        

                    {!isTracking?
                    
                        <Button style = {{gridArea:"trackButton", alignSelf:"flex-end"}} onClick = {() => {onTrackEvent(loggedInUser,eventUid);}}> Track </Button>
                    :
                        <Button style = {{gridArea:"trackButton", alignSelf:"flex-end"}} onClick = {() => {onUntrackEvent(loggedInUser.uid, eventUid);}}> Untrack </Button>
                    }

                    {
                        
                    isAttending?

                    <Button style = {{gridArea:"attendButton", alignSelf:"flex-end"}} onClick = {() => {onCancelEvent(loggedInUser.uid, eventUid);}}> Cancel Attendance </Button>
                    :
                    <Button style = {{gridArea:"attendButton", alignSelf:"flex-end"}} onClick = {() => {
                        
                        onAttendEvent(loggedInUser.uid, eventUid);

                        //Check for performance and lessen access to backend.
                        if (!isTracking){
                            onTrackEvent(loggedInUser,eventUid);
                        }
                    
                    }}> Attend </Button>
                    }   
                 </div>
                }

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
             <Gallery isEmpty = {!gallery || gallery.length == 0 }>
                

                {gallery.map( picture => {

                    console.log("picture", picture);
                    //Prob should make something here lol.
                    //They shouldn't have multiple of same picture anyway
                    //but I should later on add a check for that or make key more unique.
                    const newObj = {key: i.key + 1};
                    i.key += 1;
                   return <Picture key = {newObj.key + picture} selected = {newObj.key == this.state.selectedIndex || (newObj.key == 1 && this.state.posterPicture == null)} src = {picture} onClick = { (evt) => {this.updatePosterPicture(newObj,picture)}}/>
                })}
                

            </Gallery>
        );
    }


    renderBody(){


        console.log("event", this.props.event);
        const {description, agenda, startDate, endDate, location, callToAction, contact, host} = this.props.event;
        //Body will be it's own grid

        const dateFormat = "ddd, MMMM D YYYY h:mm A";
        return (
            <Body>
                {/*Prob doesn't need to be styled component, just set grid name*/}
                <Description > 
                <Title> Description</Title>
                <p>{description}</p>
                {<Agenda> 

                    {agenda.length > 0 && <Title> Agenda </Title>}
                    {
                        agenda.map(item => {

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
                    {/*The host info should have email to*/}
                    <Title> Contact </Title>
                    <p> If you have questions about the event, you can contact the
                         <HostLink href = {"mailto:"+host.email}> Host</HostLink>
                          </p>
                    <p> If you are experiencing any issues. Contact <HostLink href = {"mailto:"+EMAIL}> us</HostLink> </p>
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
        const shareSize = isTablet? 80 : 48;
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
                    <FacebookIcon size = {shareSize} round = {true}/>
                    </FacebookShareButton>

                    <LinkedinShareButton url = {shareUrl} style = {{marginLeft:"1%"}}>
                    <LinkedinIcon size = {shareSize} round = {true}/>
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
        console.log("event", event);
        const poster = this.state.posterPicture || event.gallery[0] || event.thumbnail;
        return (
            <Wrapper>
            
                <Poster src = {poster}>
                </Poster>
                {this.renderHeader()}
                {this.renderGallery()}
                {this.renderBody()}
                {this.renderFooter()}

            </Wrapper>
        );
    }

}


//Maybe should have jsut made selectors, eh.
const mapStateToProps = (state) => {



    if (state == null || state.get(SPECIFIC_EVENT)==null) return {};

    const loggedInUser = state.get("firebase").auth;
    console.log("loggedInUser", loggedInUser);
    const eventPageState = state.get(SPECIFIC_EVENT);
    //So it's going here
    console.log("eventpage state", eventPageState);
    return {


        loggedInUser,
        event : eventPageState.get("loadedEvent"),
        isAttending: eventPageState.get("isAttending"),
        isTracking: eventPageState.get("isTracking"),

    };
}


const mapDispatchToProps = (dispatch) => {


    return {

            addView : (eventUid) => {

                return dispatch(addView(eventUid));
            },

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