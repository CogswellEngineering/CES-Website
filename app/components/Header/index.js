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


const HeaderWrapper = styled.div`



  background-color: rgb(0, 24, 74);// rgb(36, 154, 29);
  
  width:100%;
  margin:auto;
  position: sticky;
  top:0;
  //height:50px;
 
  display:flex;
  //Uncomment if want on both sides of header bar.
  justify-content:space-between;
  
  align-items:center;
  brder:2px solid black;
  opacity:0.9;
  text-transform:uppercase;

  
`


const ClubLogo = styled.img`

  height:48px;
  width:48px;
  align-self:center;
  margin-left:10%;
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

        <div style = {{display:"flex",  width:"80%"}}>
          <ClubLogo src={require('images/CESLogo.png')} alt="sdf"/>
          <Navbar>    

            {
              navPages.map(page => {

                
             
              return <PageLink key={page.name} to={page.url} active={(page.url == props.activePage).toString()}> {page.name} </PageLink>
            })}

        </Navbar>

        </div>

          <UserActions/>


          
          {/*UserActions will be a container, but for now just quick testing doing this*/}

        
        </HeaderWrapper>
      );
    }
}

Header.propTypes = {

};

export default Header;
