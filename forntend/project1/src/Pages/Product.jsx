import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrums from "../Components/Breadcrums/breadcrums";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay.jsx";
import Description from "../Components/DescriptionBox/description.jsx";
import RelatedProduct from "../Components/RelatedProducts/relatedproducts.jsx";
const Product=()=>{
   const{all_product}=useContext(ShopContext);
   const {productId}=useParams();
   const product=all_product.find((e)=> e.id===Number(productId))
 return(
    <div>
        <Breadcrums  product={product}/>
        <ProductDisplay product={product} />
        <Description/>
        <RelatedProduct/>
    </div>
 )


}

export default Product;