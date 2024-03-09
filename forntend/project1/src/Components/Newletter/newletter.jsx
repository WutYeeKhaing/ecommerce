import React from "react";
import './newletter.css'
const Newletter=()=>{
 return(
    <div className="newsletter">
        <h1>Get Exclusive offers On Your Email </h1>
        <p>Subscribe to our newletter and stayed updated</p>
        <div>
            <input type="email" placeholder="Your Email"/>
            <button>Subscribe</button>
        </div>
    </div>
 )


}

export default Newletter;