import React, {Component} from 'react';

import styled from 'styled-components';
//Don't need this one for this cause outdated firestore, only need this part for auth transferring
//which might actually need here. Actually doesn't need to be in redux.
//Except maybe for attending, but can just pass the dispatch as prop from events page into this..
//BUT WAIT, what if they go directly to this event page through their browser history? Then it won't be there.
//I have to have saga for attending, again, can I use same one?
import {withFirebase} from 'react-redux-firebase';
import dateFns from 'date-fns';
import firebase from 'firebase';

import  {

    Wrapper,
    Gallery,
    Header,
    Body,
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

            eventInformation: null,
            shareWindowOpened: false,
        };

        //OnAttend and OnTrack maybe better as dispatches actually
        //through a saga, since they both effect database.
       
        this.onShareClicked = this.onShareClicked.bind(this);


    }

    //Maybe this as well, but it's fine here, there doesn't need to be event info in global state.
    pullEventData(){

        const eventUid = props.match.params.uid;


    }

    onShareClicked = () => {

    }


    renderHeader(){

        const {title, startDate, host} = this.state.eventInformation;

        return (
            <Header>



            </Header>
        );
    }

    renderGallery(){

        const {gallery } = this.state.eventInformation;
        return (
            <Gallery>

            </Gallery>
        );
    }


    renderBody(){


        const {description, agenda, dateAndTime, location, callToAction, contact} = this.state.eventInformation;
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

        const {tags, shareLink} = this.state.eventInformation;
        return (
            <Footer>
            
                <Tags> </Tags>
                <Share> </Share>
            </Footer>
            );

    }

    render(){

        const {poster} = this.state.eventInformation;

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
