import React from "react";
import { useNavigate } from 'react-router-dom';
import './offer.css';
import exclusive_image from '../Assests/exclusive_image.png'
const Offer=()=>{
  const navigate = useNavigate();
 return(
    <div className="offers">
        <div className="offers-left">
         <h1>Exclusive Offer For You</h1>
         
         <p>ONLY ON BEST SELLER PRODUCTS</p>
         <button onClick={() => navigate('/womens')}>Check Now</button>
        </div>
        <div className="offers-right">
          <img src={exclusive_image} alt=""/>
        </div>
    </div>
 )


}

export default Offer;