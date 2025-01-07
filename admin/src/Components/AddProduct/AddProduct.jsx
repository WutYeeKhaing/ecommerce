import React, { useState } from 'react';
import './AddProduct.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

const AddProduct = () => {
    const [image, setImage] = useState(null);
    const [product, setProduct] = useState({
        name: "",
        category: "women",
        new_price: "",
        old_price: "",
        image:""
    });

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
            setProduct({...product,image:file}) // Update product image with file
        } else {
            setImage(null)
            setProduct({...product,image:""})
        }
    };
    const handleImageRemove = () => {
        setImage(null);
         setProduct({...product,image:""})
    }

    const changeHandler = (event) => {
        setProduct({ ...product, [event.target.name]: event.target.value });
    };

    const Add_Product = async () => {
        let responseData;
        
          if(product.image){
                let formData = new FormData();
                formData.append('product', product.image);

             try {
                   const response = await fetch('http://localhost:4000/upload', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        },
                    body: formData,
                   });
                   if (!response.ok) {
                    const message = `HTTP error! status: ${response.status}`;
                         throw new Error(message);
                    }

                     const data = await response.json();
                      responseData = data;

                       if (responseData && responseData.success) {
                          const productWithImage = { ...product, image: responseData.imageUrl };
                                  const addResponse = await fetch('http://localhost:4000/addproduct', {
                                    method: 'POST',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json',
                                      },
                                     body: JSON.stringify(productWithImage),
                                 });

                            if (addResponse.ok){
                                alert('Product added successfully')
                              } else {
                                const message = `HTTP error! status: ${addResponse.status}`;
                                 throw new Error(message)
                             }
                        }else{
                           alert('Failed to upload image.')
                        }
                    } catch (error) {
                        console.error("Error during form submission:", error.message);
                    alert(`Failed to upload product, message: ${error.message}`)
                  }

        } else {
           try {
                const addResponse = await fetch('http://localhost:4000/addproduct', {
                    method: 'POST',
                    headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                   },
                    body: JSON.stringify(product),
                });
                if (addResponse.ok){
                 alert('Product added successfully')
               } else {
                 const message = `HTTP error! status: ${addResponse.status}`
                   throw new Error(message);
                  }
            } catch (error) {
                console.error("Error during form submission:", error.message);
                alert(`Failed to add product, message:${error.message}`);
              }
        }


    };

    return (
        <div className='add-product-container'>
            <div className='add-product'>
                <div className='addproduct-item'>
                    <p>Product Title</p>
                    <input
                        type='text'
                        name='name'
                        value={product.name}
                        onChange={changeHandler}
                        placeholder='Type here'
                    />
                </div>
                <div className='addp-price'>
                    <div className='addproduct-item'>
                        <p>Price</p>
                        <input
                            type='number'
                            name='old_price'
                            value={product.old_price}
                            onChange={changeHandler}
                            placeholder='Type here'
                        />
                    </div>
                    <div className='addproduct-item'>
                        <p>Offer Price</p>
                        <input
                            type='number'
                            name='new_price'
                            value={product.new_price}
                            onChange={changeHandler}
                            placeholder='Type here'
                        />
                    </div>
                </div>
                <div className='addproduct-item'>
                    <p>Product-category</p>
                    <select
                        name='category'
                        className='add-select'
                        value={product.category}
                        onChange={changeHandler}
                    >
                        <option value='women'>Women</option>
                        <option value='men'>Men</option>
                        <option value='kid'>Kid</option>
                    </select>
                </div>
                <div className='addproduct-item'>
                    <label htmlFor='file-input' className='upload-label'>
                        {image ? (
                            <img
                                src={image}
                                alt="Product Preview"
                                className="upload-preview"
                                onClick={handleImageRemove}
                            />
                        ) : (
                            <>
                                <FontAwesomeIcon icon={faUpload} className="upload-icon" />
                                <p className='addproduct-thumnail'>Upload Product Image</p>
                            </>
                        )}
                    </label>
                    <input
                        onChange={handleImageChange}
                        type='file'
                        name='image'
                        id='file-input'
                        hidden
                    />
                </div>
                <button onClick={Add_Product} className='add-btn'>ADD</button>
            </div>
        </div>
    );
};

export default AddProduct;