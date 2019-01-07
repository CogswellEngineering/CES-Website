/*
 * HomePage
 *
 * This page will display general information of club and poster of club, so people know what we offer.
 */

import React from 'react';
import {BLOG_PATH, EVENTS_PATH, REGISTER_PATH } from 'components/Header/pages';

import Wrapper, {WhoWeAre, WhatWeDo, JoinUs, Title, SubTitle, Description, Picture,
  HelpStudentsBlock, 
  HostEventsBlock, EventList, EventItem, EventHeader, 
  OtherServicesBlock, StyledLink} from 'components/StyledComponents/HomePage';
//It will have an "Our Services." Section to describe library and printing.
//Purpose of the website etc.
//Essentially AboutPage

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Wrapper>
        <WhoWeAre> 
        
        <Title> Who are we</Title>

        {/*Maybe add Officers here later, or make another page for it*/}
        <Description> We are Cogswell Engineering Society, an engineering club at Cogswell College. Our club room is in 140, feel free to come in and hangout or work on projects with us!
            </Description>

        </WhoWeAre>

        {/*This and WhatWeOffer will be in one*/}
        <WhatWeDo>
        <Title> What we do </Title>

        {/*Could prob jut loop this and have a what we do list in database*/}
        {/*Right now not really worth though, but would be more scalable*/}
        <HelpStudentsBlock>
        {/*Will be picture of room. */}
        <Picture/>
        <SubTitle> We Help Students </SubTitle>
        <Description> Whether you are an engineering student or just taking an engineering class or studying it in your free time,
          we are here to help. We have a library of textbooks people may borrow, a computer they can use and many member willing to help.
        </Description>

      
        </HelpStudentsBlock>

        <HostEventsBlock>
          <SubTitle style = {{placeSelf: "center"}}> We host and participate in events. </SubTitle>
          <Description > The events we have vary from coding competitions to hackathons and workshops. You can see our planned events on 
            our <StyledLink to = {EVENTS_PATH} > Calendar </StyledLink> and updates of these events on our 
            <StyledLink to = {BLOG_PATH}> News </StyledLink> page.
          </Description>
          <EventHeader  style = {{placeSelf: "center"}}>  Events we've done </EventHeader>

          <EventList>
            {/*This will need a pull*/}
            <EventItem> ACM Competition</EventItem>

            <EventItem> ACM Competition</EventItem>

            <EventItem> ACM Competition</EventItem>
            <EventItem> ACM Competition</EventItem>
         
          </EventList>
        </HostEventsBlock>
        

        <OtherServicesBlock>

          {/*This will have links to 3d printer and have picture of 3d printer. Do later, low priority.*/}

        </OtherServicesBlock>
        </WhatWeDo>
       
        <JoinUs>
          <Title> Join us! </Title>
          <Description style = {{textAlign: "center"}}> Create an account <StyledLink to = {REGISTER_PATH} > here </StyledLink> to be rsvp to events, keep track of updates to the club,
          and have access to our services. </Description>
        </JoinUs>


      </Wrapper>
    );
  }
}
