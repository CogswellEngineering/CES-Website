/**
*
* Header
*
*/

import React from 'react';
// import styled from 'styled-components';
import Navbar from './Navbar';
import NavLink from './NavLink';
import UserActions from 'containers/UserActions/';
import navPages from './pages';




const Header = () =>{
  return (
    <span>
      <span>
        <Navbar>    
          {navPages.map(page => {
            return <NavLink key={page.name} href={page.url}> {page.name} </NavLink>
          })}
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
