import React from 'react';
import './Navbar.css';
import nav_logo from '../../assets/logo1.png';
import nav_profile from '../../assets/hero_image.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'; 


const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="navbar-left">
      <img src={nav_logo} alt='nav-logo' />
      <p className='admin-text'>Admin Panel</p>
      </div>
      <div className="navbar-right">
      <img src={nav_profile}  className="nav-profile" alt='nav-pro'/>
          
      </div>
    </div>
  );
};

export default Navbar;