import React from "react";
import './offer.css';
import exclusive_image from '../Assests/exclusive_image.png'
const Offer=()=>{
 return(
    <div className="offers">
        <div className="offers-left">
         <h1>Exclusive</h1>
         <h1>Offer For You</h1>
         <p>ONLY ON BEST SELLER PRODUCTS</p>
         <button>Check Now</button>
        </div>
        <div className="offers-right">
          <img src={exclusive_image} alt=""/>
        </div>
    </div>
 )


}

export default Offer;