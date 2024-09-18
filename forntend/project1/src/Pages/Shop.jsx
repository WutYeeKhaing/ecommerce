
import React, { useRef } from 'react';
import Hero from '../Components/Hero/Hero.jsx'
import Popular from "../Components/Popular/popular.jsx";
import Offer from "../Components/Offer/offer.jsx";
import Newcollection from "../Components/Newcollection/newcollection.jsx";
import Newletter from "../Components/Newletter/newletter.jsx";
const Shop=()=>{
    const newCollectionRef = useRef(null);
 return(
    <div className="shop">
         <Hero newCollectionRef={newCollectionRef} /> 
        <Popular/>
        <Offer/>
        <div ref={newCollectionRef}>
        <Newcollection />
      </div>
        <Newletter/>
    </div>

 )


}

export default Shop;