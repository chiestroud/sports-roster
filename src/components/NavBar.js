import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavbarText,
  Button
} from 'reactstrap';
import { signInUser, signOutUser } from '../helpers/auth';

const NavBar = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const authenticated = () => (
    <>
      <Link className='navbar-brand' to="/">Home</Link>
      <NavbarToggler className='m-1' onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="mr-auto" navbar>
          <NavItem className='m-1'>
            <Link className='nav-link' to="/team">Team</Link>
          </NavItem>
            <Button className='m-1' color='danger' onClick={signOutUser}>Log Out</Button>
        </Nav>
        <NavbarText>Welcome</NavbarText>
      </Collapse>
    </>
  );

  return (
    <div>
      <Navbar color="light" light expand="md">
        {user && authenticated()}
        {!user && <Button color='info' onClick={signInUser}>Sign In with Google</Button>}
      </Navbar>
    </div>
  );
};

NavBar.propTypes = {
  user: PropTypes.any
};

export default NavBar;
