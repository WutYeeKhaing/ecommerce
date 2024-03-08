import React from "react";
import './cartItems.css';
import { useContext } from "react";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from'../Assests/cart_cross_icon.png';
const CartItems=()=>{
    const{getTotalAmount,all_product,cartItems,removeFromCart}=useContext(ShopContext)
 return(
    <div className="cartitem">
        <div className="cart-format main">
            <p>Product</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr/>
        {all_product.map((e)=>{
            if(cartItems[e.id]>0)
            {
            return<div>
            <div className="format cart-format">
                <img src={e.image} alt="" className="img-cart" />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className="quantity">{cartItems[e.id]}</button>
                <p>${e.new_price*cartItems[e.id]}</p>
                <img  className="cart-remove" src={remove_icon} onClick={()=>{removeFromCart(e.id)}}alt=""/>
            </div>
            <hr/>
        </div>
        } 
          return null;  
         })}
         <div className="cart-down">
            <div className="total-cart">
                <h1>Cart Totals</h1>
                <div>
                    <div className="total-item">
                        <p>SubTotal</p>
                        <p>${getTotalAmount()}</p>

                    </div>
                 <hr/>
                 <div className="total-item">
                    <p>Shipping Fee </p>
                    <p>Free</p>
                 </div>
                 <hr/>
                 <div className="total-item">
                    <h3>Total</h3>
                    <h3>{getTotalAmount()}</h3>
                 </div>
                </div>
                <button>PROCEED TO CHECKOUT</button>
            </div>
            <div className="cart-promocode">
                <p>If you have promo code ,Enter it here</p> 
                <div className="promobox">
                    <input type="text" placeholder="promo-code"/>
                    <button>Submit</button>
                </div>
                </div>
         </div>
    </div>
 )


}

export default CartItems;