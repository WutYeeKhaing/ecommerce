import React, { useContext, useState, useEffect } from "react";
import './Navbar.css';
import logo from '../Assests/logo1.png';
import cart_icon from '../Assests/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from "../../Context/ShopContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const { getTotalCartItems } = useContext(ShopContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const [toggleIcon, setToggleIcon] = useState(faBars);
    const [showNotification, setShowNotification] = useState(false);
    const [prevCartCount, setPrevCartCount] = useState(getTotalCartItems());

    useEffect(() => {
        const currentCartCount = getTotalCartItems();
        if (currentCartCount > prevCartCount) {
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
            }, 2000); // Hide notification after 2 seconds
        }
        setPrevCartCount(currentCartCount);
    }, [getTotalCartItems(), prevCartCount]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
        setToggleIcon(menuOpen ? faBars : faTimes);
    }

    const handleDropItem = () => {
        setMenuOpen(false);
        setToggleIcon(faBars);
    }

    return (
        <div className="navbar">
            <div className="nav_logo">
                <Link style={{ textDecoration: 'none' }} to='/'>
                    <img src={logo} alt="Shopper Logo" />
                </Link>
            </div>
            <ul className="navmenu">
                <li onClick={() => { setMenu("shop") }}>
                    <Link style={{ textDecoration: 'none' }} to='/'>Shop</Link>
                    {menu === "shop" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("mens") }}>
                    <Link style={{ textDecoration: 'none' }} to='/mens'>Men</Link>
                    {menu === "mens" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("womens") }}>
                    <Link style={{ textDecoration: 'none' }} to='./womens'>Women</Link>
                    {menu === "womens" ? <hr /> : <></>}</li>
                <li onClick={() => { setMenu("kids") }}>
                    <Link style={{ textDecoration: 'none' }} to='./kids'>Kids</Link>
                    {menu === "kids" ? <hr /> : <></>}</li>
            </ul>
            <div className="nav-login-cart">
                <Link to='/login'>
                    <button>Login</button>
                </Link>
                <div className="cart-container">
                    <Link to='/cart'>
                        <img src={cart_icon} alt="" className="cart" />
                    </Link>
                    <div className="nav-cart-count">{getTotalCartItems()}</div>
                    {showNotification && (
                        <div className="cart-notification">
                            Item added to cart!
                        </div>
                    )}
                </div>
            </div>
            <div className='toggle-btn' onClick={toggleMenu}>
                <FontAwesomeIcon icon={toggleIcon} />
            </div>
            <div className={`dropdown-menu ${menuOpen ? 'show' : ''}`}>
                <ul className="dropdown-links">
                    <li onClick={handleDropItem}><Link style={{ textDecoration: 'none' }} to='/'>Shop</Link></li>
                    <li onClick={handleDropItem}><Link style={{ textDecoration: 'none' }} to='/mens'>Men</Link></li>
                    <li onClick={handleDropItem}><Link style={{ textDecoration: 'none' }} to='/womens'>Women</Link></li>
                    <li onClick={handleDropItem}><Link style={{ textDecoration: 'none' }} to='/kids'>Kids</Link></li>
                    <li onClick={handleDropItem}><Link style={{ textDecoration: 'none' }} to='/login'>Login</Link></li>
                    <li onClick={handleDropItem}><Link style={{ textDecoration: 'none' }} to='/cart'>Cart</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default Navbar;