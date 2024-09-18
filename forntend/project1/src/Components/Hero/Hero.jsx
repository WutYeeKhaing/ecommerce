import React from 'react';
import './Hero.css'
import hand_icon from '../Assests/hand_icon.png'
import arrow_icon from '../Assests/arrow.png'
import hero_img from '../Assests/hero.png'
const Hero=({ newCollectionRef })=>{
    
    const scrollToNewCollection = () => {
      // Scroll to the Newcollection section
      if (newCollectionRef.current) {
        newCollectionRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    };
 return(
    <div className="hero"> 
        <div className="hero-left">
          <h2> New Arrival Only</h2>
            <div> 
                <div className="hand-icon">
                 <p>New</p>
                 <img src={hand_icon} alt=""/>
                </div>
                <p>collections</p>
                <p>for everyone</p>
            </div>
            <div className="hero-lastest-btn" onClick={scrollToNewCollection}>
                <div>Latest Collections</div>
                <img src={arrow_icon} alt=""/>
            </div>
        </div>
        <div className="hero-right">
            <img src={hero_img} alt=""/>
            
        </div>
    </div>
 )


}

export default Hero;