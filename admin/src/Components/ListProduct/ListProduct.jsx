import React, { useState, useEffect } from "react";
import './ListProduct.css';
import cartcross from '../../assets/cart_cross_icon.png';

const ListProduct = () => {
    const [allproduct, setAllProduct] = useState([]);
    const [removedProducts, setRemovedProducts] = useState(new Set()); // Track removed products
    const fetchInfo = async () => {
        try {
            const res = await fetch('http://localhost:4000/allproducts');
            if (!res.ok){
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
           console.log("Fetched products:", data);  // Log the data
            setAllProduct(data);
        }
        catch (error) {
             console.error("Error fetching products:", error);
             alert(`Failed to fetch product, message: ${error.message}`)
        }
    }
    useEffect(() => {
        fetchInfo();
    }, []);
    const handleRemoveProduct = (productId) => {
        setRemovedProducts(prevRemovedProducts => {
            const newRemovedProducts = new Set(prevRemovedProducts);
            newRemovedProducts.add(productId); // Add to removed product set
            return newRemovedProducts;
        });

    };
    return (
        <div className='list'>
            <h1>All Product List</h1>
            <div className='listproduct-header'>
                <p>Products</p>
                <p>Title</p>
                <p>Old Price</p>
                <p>New Price</p>
                <p>Category</p>
                <p>Remove</p>
            </div>
            <div className='listproduct'>
                <hr />
                {allproduct.map((product, index) => {
                    if (removedProducts.has(product.id)) {
                        return null; // Dont render if the product is deleted
                    }
                    return (
                        <div className="listproduct-main listproduct" key={product.id}>
                            <img src={product.image} alt="" className="listproduct-icon" />
                            <p>{product.name}</p>
                            <p>${product.old_price}</p>
                            <p>${product.new_price}</p>
                            <p>{product.category}</p>
                            <img src={cartcross} alt=""
                             className="listproduct-remove-icon"
                            onClick={()=>handleRemoveProduct(product.id)}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ListProduct;