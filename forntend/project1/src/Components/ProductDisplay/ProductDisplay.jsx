import React ,{useContext} from "react";
import './productdisplay.css';
import star from'../Assests/star_icon.png';
import star_dull from '../Assests/star_dull_icon.png';
import { ShopContext } from '../../Context/ShopContext';
const ProductDisplay = (props) =>{
    const {product}= props;
    const { addToCart } = useContext(ShopContext);
 return(
    <div className="pdisplay">
        <div className="product-left">
            <div className="product-img">
              <img src={product.image} alt=""/>
              <img src={product.image} alt=""/>
              <img src={product.image} alt=""/>
              <img src={product.image} alt=""/>
            </div>
            <div className="image">
            <img className="Main-img"src={product.image} alt=""/>
            </div>
        </div>
        <div className="product-right">
            <h1>{product.name}</h1>
            <div className="right-star">
                <img src={star} alt=""/>
                <img src={star} alt=""/>
                <img src={star} alt=""/>
                <img src={star} alt=""/>
                <img src={star_dull} alt=""/>
                <p>(122)</p>
            </div>
            <div className="right-price">
                <div className="price-old">${product.old_price}</div>
                <div className="price-new">${product.new_price}</div>
            </div>
            <div className="description">
                A lightweight,usually knitted,pullover shirt,close-fitting 
                a round neckline and short sleeves,worn as an undershirt 
            </div>
            <div className="right-size">
                <h1>Select Size</h1>
                <div className="right-sizes">
                    <div>S</div>
                    <div>M</div>
                    <div>L</div>
                    <div>XL</div>
                    <div>XXL</div>
                </div>
            </div>
            <button onClick={()=>{ addToCart(product.id)}}>ADD TO CART</button>
            <p className="right-category">
                <span>Category:</span>
                Women,T-Shirt,Crop-top
            </p>
            <p className="right-category">
                <span>Tags:</span>
                Modern,Latest,
            </p>
        </div>
    </div>
 );


}

export default ProductDisplay;