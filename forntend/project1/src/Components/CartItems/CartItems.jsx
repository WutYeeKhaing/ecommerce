import React, { useState, useContext } from "react";
import { FaCcVisa, FaCcMastercard, FaPaypal } from 'react-icons/fa'; // Import icons from React Icons
import './cartItems.css';
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from '../Assests/cart_cross_icon.png';

const CartItems = () => {
    const { getTotalAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
    const [promoCode, setPromoCode] = useState('');
    const [showPaymentOptions, setShowPaymentOptions] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    const handleCheckout = () => {
        const totalAmount = getTotalAmount();
        if (totalAmount === 0) {
            alert("Your cart is empty. Please add items before checking out.");
            return;
        }
        setShowPaymentOptions(true); // Show payment options when checkout is initiated
    };

    const handlePaymentMethodSelect = (method) => {
        setSelectedPaymentMethod(method);
    };

    const confirmPayment = () => {
        const totalAmount = getTotalAmount();
        if (!selectedPaymentMethod) {
            alert("Please select a payment method.");
            return;
        }
        // Perform payment processing here (mock or real)
        console.log(`Payment of $${totalAmount} processed using ${selectedPaymentMethod}!`);
        // Optionally clear the cart or perform necessary actions.
        setShowPaymentOptions(false); // Hide payment options after confirmation
    };

    const handlePromoSubmit = () => {
        if (!promoCode) {
            alert("Please enter a promo code.");
            return;
        }
        if (promoCode.toUpperCase() === "ED") {
            alert(`Promo code "${promoCode}" applied! Enjoy your discount!`);
            // Optionally, apply a discount
        } else {
            alert(`Promo code "${promoCode}" is not valid. Please try again.`);
        }
    };

    return (
        <div className="cartitem">
            <div className="cart-format main">
                <p>Product</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {all_product.map((e) => {
                if (cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="format cart-format">
                                <img src={e.image} alt="" className="img-cart" />
                                <p>{e.name}</p>
                                <p>${e.new_price.toFixed(2)}</p>
                                <button className="quantity">{cartItems[e.id]}</button>
                                <p>${(e.new_price * cartItems[e.id]).toFixed(2)}</p>
                                <img className="cart-remove" src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="" />
                            </div>
                            <hr />
                        </div>
                    );
                }
                return null;
            })}
            <div className="cart-down">
                <div className="total-cart">
                    <h1>Cart Totals</h1>
                    <div>
                        <div className="total-item">
                            <p>SubTotal</p>
                            <p>${getTotalAmount().toFixed(2)}</p>
                        </div>
                        <hr />
                        <div className="total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="total-item">
                            <h3>Total</h3>
                            <h3>${getTotalAmount().toFixed(2)}</h3>
                        </div>
                    </div>
                    <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
                </div>
                <div className="cart-promocode">
                    <p>If you have a promo code, enter it here:</p>
                    <div className="promobox">
                        <input
                            type="text"
                            placeholder="Promo code"
                            value={promoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                        />
                        <button onClick={handlePromoSubmit}>Submit</button>
                    </div>
                </div>
            </div>

            {/* Payment Options */}
            {showPaymentOptions && (
                <div className="payment-options">
                    <h2>Select Payment Method</h2>
                    <div className="payment-methods">
                        <label className="payment-method">
                            <input 
                                type="radio" 
                                value="Visa" 
                                checked={selectedPaymentMethod === 'Visa'} 
                                onChange={() => handlePaymentMethodSelect('Visa')} 
                            />
                            <FaCcVisa size={50} />
                           
                        </label>
                        <label className="payment-method">
                            <input 
                                type="radio" 
                                value="MasterCard" 
                                checked={selectedPaymentMethod === 'MasterCard'} 
                                onChange={() => handlePaymentMethodSelect('MasterCard')} 
                            />
                            <FaCcMastercard size={50} />
                          
                        </label>
                        <label className="payment-method">
                            <input 
                                type="radio" 
                                value="PayPal" 
                                checked={selectedPaymentMethod === 'PayPal'} 
                                onChange={() => handlePaymentMethodSelect('PayPal')} 
                            />
                            <FaPaypal size={50} />
                          
                        </label>
                    </div>
                    <button onClick={confirmPayment}>Confirm Payment</button>
                </div>
            )}
        </div>
    );
}

export default CartItems;
