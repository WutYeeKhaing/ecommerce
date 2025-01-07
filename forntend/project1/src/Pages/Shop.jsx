
import React, { useRef } from 'react';
import Hero from '../Components/Hero/Hero.jsx'
import Popular from "../Components/Popular/popular.jsx";
import Offer from "../Components/Offer/offer.jsx";
import Newcollection from "../Components/Newcollection/newcollection.jsx";
import Newletter from "../Components/Newletter/newletter.jsx";
const Shop=()=>{
    const newCollectionRef = useRef(null);
    const popularRef = useRef(null);
    const offerRef = useRef(null);
    const sectionRefs = {
      newCollection: newCollectionRef,
      popular: popularRef,
      offer: offerRef
    };
 return(
    <div className="shop">
        <Hero sectionRefs={sectionRefs} />
      
      <div ref={popularRef}>
        <Popular />
      </div>
      
     
        <Offer />
     
      
      <div ref={newCollectionRef}>
        <Newcollection />
      </div>
       <div ref={offerRef}>
        <Newletter/>
         </div>
    </div>

 )


}

export default Shop;