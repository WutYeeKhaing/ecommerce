import { createContext } from "react";
import all_product from '../Components/Assests/all_product';
import { useState } from "react";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index < all_product.length + 1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [address, setAddress] = useState({
        street: '',
        city: '',
        postalCode: '',
        phoneNumber: '',
  });
    const [shippingFee, setShippingFee] = useState(0);

    const calculateShipping = (address) => {
       if (!address || !address.street || !address.city || !address.postalCode) {
          return 0;
         }

        if (address.city.toLowerCase().includes("new york")) {
            return 5;
        } else if (address.city.toLowerCase().includes("los angeles")) {
            return 10;
        } else {
            return 8;
        }
    };

     const updateAddress = (newAddress) => {
        setAddress(newAddress);
         setShippingFee(calculateShipping(newAddress));
    }

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find((e) => e.id === Number(item));
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const getTotalCartItems = () => {
    let totalitems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalitems += cartItems[item];
      }
    }
    return totalitems;
  };

  const contextValue = {
    all_product,
    cartItems,
      address,
    addToCart,
    removeFromCart,
    getTotalAmount,
    getTotalCartItems,
      shippingFee,
      updateAddress,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;