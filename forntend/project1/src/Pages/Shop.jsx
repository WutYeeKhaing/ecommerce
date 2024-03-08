import React from "react";
import Hero from '../Components/Hero/Hero.jsx'
import Popular from "../Components/Popular/popular.jsx";
import Offer from "../Components/Offer/offer.jsx";
import Newcollection from "../Components/Newcollection/newcollection.jsx";
import Newletter from "../Components/Newletter/newletter.jsx";
const Shop=()=>{
 return(
    <div>
        <Hero/>
        <Popular/>
        <Offer/>
        <Newcollection/>
        <Newletter/>
    </div>

 )


}

export default Shop;