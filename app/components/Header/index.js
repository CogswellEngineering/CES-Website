/**
*
* Header
*
*/

import React, {Component} from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import { PageLink, ServiceLink, ServiceIcon} from './NavLink';
import UserActions from 'containers/UserActions';
import { navPages, servicePages } from './pages';
import { Button} from 'components/StyledComponents/UserActions';

import Popover from 'react-simple-popover';

const HeaderWrapper = styled.div`



  background: rgb(36, 154, 29);
  width:100%;
  
  height:50px;
  position: -webkit-sticky;
  position:sticky;
  top:0;
  display:flex;
  justify-content:space-between;
  
`
const VerticalLine = styled.span`

    border-left:1px solid black;
`;

const ClubLogo = styled.img`

  height:48px;
  width:48px;
  align-self:center;
`;



const PageSection = styled.span`

  @media (max-width:700px) {

  };
  margin-right:10px;
  height:100px;
 // border:2px solid black;
`;

const ServiceSection = styled.span`

  margin-left:2px;

`
const ServicesPopover = styled.div`

  height:20em;
  margin-top:10px;
  //width:200px;
  
`


class Header extends Component{
  

  constructor(props){

    super(props);

    this.state = {
      servicesOpen : false,
    };

    this.toggleServices = this.toggleServices.bind(this);
    this.closeServices = this.closeServices.bind(this);
  }


  toggleServices(){

    this.setState({
      servicesOpen: !this.state.servicesOpen
    });

    console.log("services open", this.state.servicesOpen);
  }

  closeServices(){

    this.setState({
      servicesOpen:false,
    });
  }

  
  
  render() {

    const props = this.props;

  
    return (
        <HeaderWrapper>

          <ClubLogo src={require('images/CESLogo.png')} alt="sdf"/>
          <Navbar>    

              <PageSection>
            {
              navPages.map(page => {

                
             
              return <PageLink key={page.name} to={page.url} active={(page.url == props.activePage).toString()}> {page.name} </PageLink>
            })}

              </PageSection>

<VerticalLine/>
          <UserActions/>


            <ServiceSection>

                  <Button ref="target" onClick = {this.toggleServices}> Services </Button>
                
                  <Popover
                    placement='bottom'
                    target={this.refs.target}
                    show={this.state.servicesOpen}
                    onHide={this.closeServices}
                    style={{width:'200px'}}
                  >
                      <ServicesPopover>

                          {//Yeah def in dropdown, lol considering that now there's slight delay. in them showing up.
                      //Fixed slight delay but will do dropdown to make clear distinction between them.
                      //Okay wait, so if I add 1 MORE element it fucks up? wtf, what makes it repeat?
                      servicePages.map(page => {
                          
                          return <ServiceLink key={page.name} href={page.url}> <ServiceIcon src={require("images/"+page.name+".png")}/>{page.name} </ServiceLink>
                          
                          })
                        }

                      </ServicesPopover>
                  </Popover>
            
              </ServiceSection>
          </Navbar>
          
          {/*UserActions will be a container, but for now just quick testing doing this*/}

        
        </HeaderWrapper>
      );
    }
}

Header.propTypes = {

};

export default Header;
