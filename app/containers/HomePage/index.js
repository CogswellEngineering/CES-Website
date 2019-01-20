/*
 * HomePage
 *
 * This page will display general information of club and poster of club, so people know what we offer.
 */

import React from 'react';
import {BLOG_PATH, EVENTS_PATH, REGISTER_PATH } from 'SiteData/constants';

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
        <Description> 
          We are Cogswell Engineering Society, an engineering club at Cogswell College.
            
        </Description>

        </WhoWeAre>

       
        <JoinUs>
          <Title> Join us! </Title>
          <Description style = {{textAlign: "center"}}> Create an account <StyledLink to = {REGISTER_PATH} > here </StyledLink> to be rsvp to events, keep track of updates to the club,
          and have access to our services. </Description>
        </JoinUs>


      </Wrapper>
    );
  }
}
