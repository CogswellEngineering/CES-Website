/**
*
* Header
*
*/

import React, {Component} from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import Hamburger from 'react-hamburger-menu';
import Navbar from './Navbar';
import { NavLink, ServiceLink, ServiceIcon} from './NavLink';
import UserActions from 'containers/UserActions';
import { navPages, servicePages } from './pages';
import { Button} from 'components/StyledComponents/UserActions';
import media from 'theme/media';
import {HEADER_COLOR} from 'theme/colors';
import {TABLET_FONT_SIZE, PHONE_FONT_SIZE} from 'theme/fontData'; 
const accountIcon = require('images/icons8-customer-64.png');
//Unfortutnately may not be consistent with numbers I have in media.
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
  isTablet,
  isMobileOnly
} from "react-device-detect";
const HeaderWrapper = styled.div`



  background-color: ${HEADER_COLOR};
  width:100%;
  position:sticky;
  top:0;  
  z-index: 1;
  text-transform:uppercase;
  padding-bottom:5px;
  padding-top:5px;

  ${media.tablet`


  //  position: ${props=> props.sideOpen? 'fixed' :'sticky'};
    position:sticky;
    top:0;
  `}

  ${media.phone}
  
  


`
const MobileHeader = styled.div`

  display:grid;

  //Hamburger icon, account icon.
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;

  grid-template-areas:
  "hamburger icon account";

  place-items:center;
  display:flex;
  justify-content:space-between;
  width:90%;
  margin:auto;

`;



const StyledBrowser = styled.div`

  display:grid;
  width:95%;
  margin:auto;
  grid-template-columns: auto 1fr 1fr;
  grid-template-rows: 100%;
  grid-template-areas:
  "icon nav account";
  align-items:center;

`;

const ClubLogo = styled.img`

  height:50px;
  width:50px;




  ${media.phone`

      height:30px;
      width:30px;

  `}

  


`;


const MobileMenu = styled.div`

   position:absolute;
  width:100%;
  height:${props => props.open? '100vh' : 'auto'};

  background-color: ${HEADER_COLOR};

 


  -webkit-transition:  ${props => props.open? 'right 0.2s ease-in-out' : ''};
  -moz-transition:  ${props => props.open? ' right 0.2s ease-in-out' : ''};
  -ms-transition:  ${props => props.open? 'right 0.2s ease-in-out' : ''}; 
  -o-transition:  ${props => props.open? 'right 0.2s ease-in-out' : ''};
  transition: ${props => props.open? 'right 0.2s ease-in-out' : ''}; 
  
  right: ${props => props.open? "0%" : "100%"};

  
`;

const ActionMenu = styled.div`

   position:absolute;
   width:100%;
   height:${props => props.open? '100vh' : 'auto'};
   

 
//  transition: ${props => props.open? 'left 0.2s ease-in-out' : ''}; 
  
  //left: ${props => props.open? "0%" : "100%"};

  
  -webkit-transition:  ${props => props.open? 'right 0.2s ease-in-out' : ''};
  -moz-transition:  ${props => props.open? ' right 0.2s ease-in-out' : ''};
  -ms-transition:  ${props => props.open? 'right 0.2s ease-in-out' : ''}; 
  -o-transition:  ${props => props.open? 'right 0.2s ease-in-out' : ''};
  transition: ${props => props.open? 'right 0.2s ease-in-out' : ''}; 
  
  right: ${props => props.open? "0%" : "100%"};

  background-color: ${HEADER_COLOR};

`;

//Should I do Mobile Account section too?
//No realy needed rn.
const MobileNav = styled.div`

    
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;

    ${media.tablet`

        text-align:center;
  
    `}
`;

const AccountIcon = styled.img`


  ${media.tablet`

      width:64px;
      height:64px;
  `}

  ${media.phone`

      width:32px;
      height:32px;

  `}

`;


class Header extends Component{
  
  

  renderMobileView(){

    const props = this.props;

    //Find to put here since sholdn't be re-rendering constnatly anyway
    const hamburgerDims = isTablet? {width:56,height:40, stroke:5} : {width:25, height:18, stroke:2};



    return <MobileView>

          <MobileHeader>
          <Hamburger style = {{gridArea:"hamburger"}} isOpen = {this.props.navSideOpen} menuClicked = {this.props.onNavToggle}
          width={hamburgerDims.width} height={hamburgerDims.height} strokeWidth = {hamburgerDims.stroke}/>
          <ClubLogo src={require('images/CESLogo.png' )} style = {{gridArea:"icon"}} alt="sdf"/>

          <AccountIcon src = {accountIcon} style = {{gridArea:"account"}} onClick = {this.props.onAccToggle}/>
          </MobileHeader>

         
          <MobileMenu open = {this.props.navSideOpen}>
            
           { this.props.navSideOpen && <MobileNav>
            
            {/*
          <ClubLogo src={require('images/CESLogo.png' )} style = {{gridArea:"icon"}} alt="sdf"/>
              
            <Hamburger style = {{gridArea:"hamburger"}} isOpen = {this.props.navSideOpen} menuClicked = {this.props.onNavToggle}
            width={hamburgerDims.width} height={hamburgerDims.height} strokeWidth = {hamburgerDims.stroke}/>*/}
              {navPages.map(page => {

                    return <NavLink key={page.name} onClick = {this.props.closeAll} to={page.url} active={(page.url == props.activePage).toString()}> {page.name} </NavLink>
              }
          )}
            </MobileNav>}

          </MobileMenu>

          <ActionMenu open = {this.props.accountSideOpen} >

              {this.props.accountSideOpen &&
              <MobileNav>
              
              <UserActions onActionSelected = {this.props.closeAll}/>
                  
            
                </MobileNav>
              }
            
          </ActionMenu>
      </MobileView>
  }

  
  renderBrowserView(){

    const props = this.props;

    return <BrowserView><StyledBrowser>
                
        <ClubLogo src={require('images/CESLogo.png')} style = {{gridArea:"icon"}} alt="sdf"/>

                <Navbar style = {{gridArea:"nav"}}>    

                  {
                    navPages.map(page => {

                      
                  
                    return <NavLink key={page.name} to={page.url} active={(page.url == props.activePage).toString()}> {page.name} </NavLink>
                  })}

              </Navbar>


            <UserActions style = {{gridArea:"account", justifySelf:"end"}} activePage = {props.activePage}/>


          </StyledBrowser>
          </BrowserView>
  }


  render() {

    const props = this.props;

    const toRender = isBrowser? this.renderBrowserView() : this.renderMobileView();

  
    return <HeaderWrapper sideOpen = { !isBrowser && (this.props.navSideOpen || this.props.accountSideOpen)}>
      {toRender}
      </HeaderWrapper>
  }
}

export default Header;
