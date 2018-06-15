/**
*
* Header
*
*/

import React, {Component} from 'react';
// import styled from 'styled-components';
import Navbar from './Navbar';
import NavLink from './NavLink';
import UserActions,{UserActionLink} from 'containers/UserActions/index';
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
        <UserActions>
       
          <UserActionLink to = "/Login"> Login </UserActionLink>
          <UserActionLink to = "/Register"> Register</UserActionLink>

        </UserActions>
      
      </span>
    </span>
    );
  }


Header.propTypes = {

};

export default Header;
