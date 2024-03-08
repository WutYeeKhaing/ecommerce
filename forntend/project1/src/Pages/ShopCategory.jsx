import React from "react";
import './CSS/Shopcategory.css'
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import dropicon from '../Components/Assests/dropdown_icon.png'
import Item from '../Components/Item/item.jsx'
const ShopCategory=(props)=>{
   const{all_product}=useContext(ShopContext);
 return(
    <div className="shopcategory">
        <img  className=" shop-banner" src={props.banner} alt="/"/>
        <div className="shop-indexsort">
         <p>
            <span>Showing 1-12</span>out of 36 products
         </p>
         <div className="shop-sort">
            Sort by<img src={dropicon} alt=""/>
         </div>
         </div>
         <div className="shopcategory-products">
           {all_product.map((item,i)=>{
            if(props.category===item.category){
             return<Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
            }else{
               return null;
            }

           })}
         </div>
         <div className="loadmore">
            Explore More
         </div>
    </div>
 )


}

export default ShopCategory;