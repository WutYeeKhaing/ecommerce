import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faList } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Link to={'/addproduct'} style={{ textDecoration: 'none' }}>
        <div className='side-item'>
          <FontAwesomeIcon icon={faPlus} className="sidebar-icon" />
          <p>Add Product</p>
        </div>
      </Link>
       <Link to={'/productlist'} style={{ textDecoration: 'none' }}>
          <div className='side-item'>
              <FontAwesomeIcon icon={faList} className="sidebar-icon" />
             <p>Product List</p>
          </div>
       </Link>
    </div>
  );
};

export default Sidebar;