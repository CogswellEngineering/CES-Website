/**
*
* Header
*
*/

import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import { PageLink, ServiceLink} from './NavLink';
import UserActions from 'containers/UserActions';
import { navPages, servicePages } from './pages';



const HeaderWrapper = styled.div`


  border:2px solid black;
  padding-bottom:1.5%;
  width:90%;
  margin:auto;

`

const LinksWrapper = styled.span`

  width:40%;
  margin-left:12%;
`


const Header = () =>{
  return (
      <HeaderWrapper>
          <LinksWrapper>

        <Navbar>    

          {
            navPages.map(page => {
            return <PageLink key={page.name} to={page.url}> {page.name} </PageLink>
          })}

          
          {//Yeah def in dropdown, lol considering that now there's slight delay. in them showing up.
            servicePages.map(page => {
              return <ServiceLink key={page.name} href={page.url}> {page.name} </ServiceLink>
            })
          }

        </Navbar>
        
        {/*UserActions will be a container, but for now just quick testing doing this*/}
        <UserActions/>
        </LinksWrapper>

      
      </HeaderWrapper>
    );
  }


Header.propTypes = {

};

export default Header;
