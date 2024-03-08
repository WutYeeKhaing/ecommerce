import React from "react";
import './breadcrums.css';
import arrow from '../Assests/breadcrum_arrow.png'
const Breadcrums=(props)=>{
    const {product}=props;
 return(
    <div className="bread">
        HOME <img src={arrow} alt=""/> SHOP <img src={arrow} alt=""/>{product.category}<img src={arrow} alt=""/>{product.name}
    </div>
 )


}

export default Breadcrums;