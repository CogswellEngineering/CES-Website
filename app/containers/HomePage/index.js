/*
 * HomePage
 *
 * This page will display general information of club and poster of club, so people know what we offer.
 */

import React from 'react';


import Wrapper, {WhoWeAre, WhatWeDo, JoinUs, Title, SubTitle, Description, Picture} from 'components/StyledComponents/HomePage';
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
        <div>
        {/*Will be picture of room. */}
        <Picture/>
        <SubTitle> We Help Students </SubTitle>
        <Description> Whether you are an engineering student or just taking an engineering class or studying it in your free time,
          we are here to help. We have a library of textbooks people may borrow, a computer they can use and many member willing to help.
        </Description>

      
        </div>

        
        </WhatWeDo>
       
        <JoinUs>
          <Title> Join us! </Title>

        </JoinUs>


      </Wrapper>
    );
  }
}
