/**
*
* Header
*
*/

import React from 'react';
// import styled from 'styled-components';
import Navbar from './Navbar';
import { PageLink, ServiceLink} from './NavLink';
import UserActions from 'containers/UserActions';
import { navPages, servicePages } from './pages';




const Header = () =>{
  return (
    <span>
      <span>
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
      
      </span>
    </span>
    );
  }


Header.propTypes = {

};

export default Header;
