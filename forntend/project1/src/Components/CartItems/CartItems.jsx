import React, { useState, useContext } from "react";
import { FaCcVisa, FaCcMastercard, FaPaypal, FaAddressCard, FaPhone, FaCity, FaMapMarkerAlt } from 'react-icons/fa';
import './cartItems.css';
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from '../Assests/cart_cross_icon.png';

const CartItems = () => {
    const { getTotalAmount, all_product, cartItems, removeFromCart, address, updateAddress, shippingFee } = useContext(ShopContext);
    const [promoCode, setPromoCode] = useState('');
    const [showPaymentOptions, setShowPaymentOptions] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [isAddressValid, setIsAddressValid] = useState(false);
    const [finalTotalAmount, setFinalTotalAmount] = useState(0);
    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: '',
    });

    const validateAddress = () => {
        if (address.street && address.city && address.postalCode && address.phoneNumber) {
            setIsAddressValid(true)
            return true;
        } else {
            setIsAddressValid(false)
            return false
        }
    }
    const handleAddressSubmit = () => {
        if (validateAddress()) {
            const totalAmount = getTotalAmount();
            setFinalTotalAmount(totalAmount + shippingFee);
        } else {
            alert('Please fill all the required address fields.');
        }
    };
    const handleCheckout = () => {
        if (!isAddressValid) {
            alert("Please fill in the address and contact information");
            return;
        }
        setShowPaymentOptions(true);

    };
    const handlePaymentMethodSelect = (method) => {
        setSelectedPaymentMethod(method);
    };

    const handlePaymentInfoChange = (e) => {
        const { name, value } = e.target;
        setPaymentInfo(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };


    const confirmPayment = () => {
        if (!selectedPaymentMethod) {
            alert("Please select a payment method.");
            return;
        }

        if (!isAddressValid) {
            alert("Please fill in the address and contact information");
            return;
        }

        // Validate payment information based on the payment method
        if (selectedPaymentMethod !== 'PayPal') {
            if (!paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvv || !paymentInfo.cardholderName) {
                alert('Please fill in all the payment information.');
                return;
            }
              if (paymentInfo.cardNumber.length < 16 || paymentInfo.cvv.length < 3) {
                  alert('Please enter a valid card number and cvv.');
                  return;
            }
        }



        // Perform payment processing here (mock or real)
        console.log(`Payment of $${finalTotalAmount} processed using ${selectedPaymentMethod}!`);
        console.log("Payment Information:", paymentInfo);


        // Optionally clear the cart or perform necessary actions.
        setShowPaymentOptions(false);
        setPaymentInfo({
            cardNumber: '',
            expiryDate: '',
            cvv: '',
            cardholderName: '',
        });
    };



    const handlePromoSubmit = () => {
        if (!promoCode) {
            alert("Please enter a promo code.");
            return;
        }
        if (promoCode.toUpperCase() === "ED") {
            alert(`Promo code "${promoCode}" applied! Enjoy your discount!`);
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

<div className="address-section">
                <h2><FaAddressCard className="section-icon" /> Shipping Details</h2>
                <div className="address-container">
                    <div className="address-field">
                        <FaMapMarkerAlt className="field-icon " />
                        <input
                            type="text"
                            placeholder="Street Address "
                            value={address.street}
                            onChange={(e) => updateAddress({ ...address, street: e.target.value })}
                        />
                    </div>
                    <div className="address-field">
                        <FaCity className="field-icon" />
                        <input
                            type="text"
                            placeholder="City"
                            value={address.city}
                            onChange={(e) => updateAddress({ ...address, city: e.target.value })}
                        />
                    </div>
                    <div className="address-field">
                        <FaMapMarkerAlt className="field-icon" />
                        <input
                            type="text"
                            placeholder="Postal Code"
                            value={address.postalCode}
                            onChange={(e) => updateAddress({ ...address, postalCode: e.target.value })}
                        />
                    </div>
                    <div className="address-field">
                        <FaPhone className="field-icon" />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={address.phoneNumber}
                            onChange={(e) => updateAddress({ ...address, phoneNumber: e.target.value })}
                        />
                    </div>
                    <button onClick={handleAddressSubmit} className="submit-button">
                        Confirm Address
                    </button>
                </div>
            </div>

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
                            <p>${shippingFee.toFixed(2)}</p>
                        </div>
                        <hr />
                        <div className="total-item">
                            <h3>Total</h3>
                            <h3>${finalTotalAmount > 0 ? finalTotalAmount.toFixed(2) : (getTotalAmount() + shippingFee).toFixed(2)}</h3>
                        </div>
                    </div>
                    <button onClick={handleCheckout} className="checkout-button" >PROCEED TO CHECKOUT</button>
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
                        <button onClick={handlePromoSubmit} className="promo-button">Submit</button>
                    </div>
                </div>
            </div>

            {/* Payment Options */}
            {showPaymentOptions && (
                <div className="payment-section">
                    <h2>Select Payment Method</h2>
                    <div className="payment-methods">
                        {[
                            { id: 'Visa', icon: FaCcVisa },
                            { id: 'MasterCard', icon: FaCcMastercard },
                            { id: 'PayPal', icon: FaPaypal }
                        ].map(({ id, icon: Icon }) => (
                            <label key={id} className={`payment-method ${selectedPaymentMethod === id ? 'selected' : ''}`}>
                                <input
                                    type="radio"
                                    value={id}
                                    checked={selectedPaymentMethod === id}
                                    onChange={() => handlePaymentMethodSelect(id)}
                                />
                                <Icon size={40} />
                                <span>{id}</span>
                            </label>
                        ))}
                    </div>

                    {selectedPaymentMethod && selectedPaymentMethod !== 'PayPal' && (
                        <div className="payment-form">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="cardholderName"
                                    placeholder="Cardholder Name"
                                    value={paymentInfo.cardholderName}
                                    onChange={handlePaymentInfoChange}
                                    className="payment-input"
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="cardNumber"
                                    placeholder="Card Number"
                                    value={paymentInfo.cardNumber}
                                    onChange={handlePaymentInfoChange}
                                    className="payment-input"
                                    maxLength="16"
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group half">
                                    <input
                                        type="text"
                                        name="expiryDate"
                                        placeholder="MM/YY"
                                        value={paymentInfo.expiryDate}
                                        onChange={handlePaymentInfoChange}
                                        className="payment-input"
                                        maxLength="5"
                                    />
                                </div>
                                <div className="form-group half">
                                    <input
                                        type="password"
                                        name="cvv"
                                        placeholder="CVV"
                                        value={paymentInfo.cvv}
                                        onChange={handlePaymentInfoChange}
                                        className="payment-input"
                                        maxLength="4"
                                    />
                                </div>
                            </div>
                            <button onClick={confirmPayment} className="confirm-button">
                                Pay ${finalTotalAmount.toFixed(2)}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default CartItems;