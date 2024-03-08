import React from "react";
import './Footer.css'
import footer_log from '../Assests/logo_big.png'
import instra from '../Assests/instagram_icon.png'
import pinter from '../Assests/pintester_icon.png'
import what from '../Assests/whatsapp_icon.png'
const Footer=()=>{
 return(
 <div className="footer">
    <div className="footer-logo">
        <img src={footer_log} alt=""/>
        <p> SHOPPER</p>
    </div>      
        <ul className="footer-list">
            <li>Company</li>
            <li>Product</li>
            <li>offices</li>
            <li>About</li>
            <li>Contact</li>
        </ul>   
         <div className="footer-icon">
            <div className="footer-icon-container">
                <img src={instra} alt=""/>
            </div>
            <div className="footer-icon-container">
                <img src={pinter} alt=""/>
            </div>
            <div className="footer-icon-container">
                <img src={what} alt=""/>
            </div>
         </div>
            <div className="footer-copyright">
             <hr/>
             <p>Copyright @ 2023 - All Right Reserved.</p>
        
         </div>
 </div>
 )


}

export default Footer;