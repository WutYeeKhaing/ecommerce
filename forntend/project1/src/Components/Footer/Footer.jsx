import React from "react";
import './Footer.css';
import footer_log from '../Assests/logo1.png';
import instra from '../Assests/instagram_icon.png';
import pinter from '../Assests/pintester_icon.png';
import what from '../Assests/whatsapp_icon.png';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={footer_log} alt="ED Market Logo" />
        <p>ED MARKET</p>
      </div>

      {/* Footer links */}
      <ul className="footer-list">
        <li><a href="/company">Company</a></li>
        <li><a href="/product">Product</a></li>
        <li><a href="/offices">Offices</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>

      {/* Social media icons */}
      <div className="footer-icon">
        <div className="footer-icon-container">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={instra} alt="Instagram" />
          </a>
        </div>
        <div className="footer-icon-container">
          <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
            <img src={pinter} alt="Pinterest" />
          </a>
        </div>
        <div className="footer-icon-container">
          <a href="https://wa.me/yourwhatsapplink" target="_blank" rel="noopener noreferrer">
            <img src={what} alt="WhatsApp" />
          </a>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="footer-copyright">
        <hr />
        <p>Copyright &copy; 2023 - All Rights Reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
