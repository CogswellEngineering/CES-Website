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
//Unfortutnately may not be consistent with numbers I have in media.
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";
const HeaderWrapper = styled.div`



  background-color: rgb(0, 24, 74);// rgb(36, 154, 29);
  width:100%;
  margin:auto;
  text-transform:uppercase;
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



const StyledBrowser = styled(BrowserView)`

  display:flex;
  justify-content:space-evenly;

`;

const ClubLogo = styled.img`

  height:50px;
  width:50px;


  ${media.tablet`

    height:40px;
    width:40px;

  `}

  ${media.phone`

      height:30px;
      width:30px;

  `}

  


`;


//Outside
const MobileMenu = styled.div`


  position:absolute;
  
  height:100%;
  background-color: rgb(0, 24, 74);// rgb(36, 154, 29);
  -webkit-transition:  width 0.2s ease-in-out;
  -moz-transition:  width 0.2s ease-in-out;
  -ms-transition:  width 0.2s ease-in-out;    
  -o-transition:  width 0.2s ease-in-out;
  transition:  width 0.2s ease-in-out;  


  width: ${props => props.open? "100%" : "0"};
`;

const ActionMenu = styled.div`

  position:absolute;
  height:100%;
  -webkit-transition:  left 0.2s ease-in-out;
  -moz-transition:  left 0.2s ease-in-out;
  -ms-transition:  left 0.2s ease-in-out;    
  -o-transition:  left 0.2s ease-in-out;
  transition:  left 0.2s ease-in-out;  
  width:100%
  background-color: rgb(0, 24, 74);// rgb(36, 154, 29);

  left: ${props => props.open? "0%" : "100%"};
  right:0;
  border:2px solid black;
  background-color: rgb(0, 24, 74);
`;

//Should I do Mobile Account section too?
//No realy needed rn.
const MobileNav = styled.div`

    
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;
`;


class Header extends Component{
  

  constructor(props){

    super(props);

    if (isMobile){

      //This need to be set to false, on click of anything else. hmm
      this.state = {
        navSideOpen:false,
        accountSideOpen:false,
      };

      

    }

    

    this.onSideToggle = this.onSideToggle.bind(this);
   
    this.closeAll = this.closeAll.bind(this);
  }

  closeAll(){

    this.setState(state =>{

        const newState = _.mapValues(state, () => false);

        return newState;
    });

    document.body.style.overflow = "auto"


  }

  onSideToggle(side){

    console.log("called");
    this.setState(state => {


        console.log("state", state);
        const newState = _.transform(state, (r, v,k) => {

          //Toggle whatever clicked, turn off all else.
          if (k == side){
            r[k] = !v;
            if (r[k]){
              document.body.style.overflow = "hidden"
            }
            else{
              document.body.style.overflow = "auto"
            }
          }
          else{
            r[k] = false;
          }

        
        });
        console.log("new state", newState);
        return newState;
    });

  }

  renderMobileView(){

    const props = this.props;

    return <MobileView>

          <MobileHeader>
          <Hamburger style = {{gridArea:"hamburger"}} isOpen = {this.state.navSideOpen} menuClicked = { () => {this.onSideToggle("navSideOpen")}}
          width={25} height={18}/>
          <ClubLogo src={require('images/CESLogo.png')} style = {{gridArea:"icon"}} alt="sdf"/>

          <p style = {{gridArea:"account"}} onClick = {() => {this.onSideToggle("accountSideOpen");}}> account </p>
          </MobileHeader>

          
          <MobileMenu open = {this.state.navSideOpen}>
            
            {this.state.navSideOpen && <MobileNav>
              
              
              {navPages.map(page => {

                    return <NavLink key={page.name} onClick = {this.closeAll} to={page.url} active={(page.url == props.activePage).toString()}> {page.name} </NavLink>
              }
          )}
            </MobileNav>}

          </MobileMenu>

            <ActionMenu open = {this.state.accountSideOpen} >


            {this.state.accountSideOpen && <MobileNav style = {{textAlign:"right"}}>
            

                <UserActions onActionSelected = {this.closeAll}/>
          
              </MobileNav>
            }
          </ActionMenu>

      </MobileView>
  }

  
  renderBrowserView(){

    const props = this.props;

    return <StyledBrowser>
          <div style = {{display:"flex",  width:"80%"}}>
                <ClubLogo src={require('images/CESLogo.png')} alt="sdf"/>
                <Navbar>    

                  {
                    navPages.map(page => {

                      
                  
                    return <NavLink key={page.name} to={page.url} active={(page.url == props.activePage).toString()}> {page.name} </NavLink>
                  })}

              </Navbar>

          </div>

            <UserActions/>


          </StyledBrowser>
  }


  render() {

    const props = this.props;

    const toRender = isBrowser? this.renderBrowserView() : this.renderMobileView();

  
    return <HeaderWrapper>
      {toRender}
      </HeaderWrapper>
  }
}

export default Header;
