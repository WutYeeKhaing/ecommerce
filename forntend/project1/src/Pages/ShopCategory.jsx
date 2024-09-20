import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import './CSS/Shopcategory.css';
import { ShopContext } from "../Context/ShopContext";
import Item from '../Components/Item/item.jsx';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const navigate = useNavigate(); // For navigating between pages

  const [sortOption, setSortOption] = useState(""); 
  const [visibleProducts, setVisibleProducts] = useState(8);

  const handleSort = (e) => {
    setSortOption(e.target.value);
  };

  const loadMoreProducts = () => {
    setVisibleProducts((prevVisible) => prevVisible + 12);
  };

  const handleBannerClick = () => {
    let productId;
    switch(props.category) {
      case "women":
        productId = 12;
        break;
      case "men":
        productId = 16;
        break;
      case "kid":
        productId = 33;
        break;
      default:
        productId = 1;
    }
    navigate(`/product/${productId}`);
  };

  const sortedProducts = [...all_product]
    .filter((item) => props.category === item.category)
    .sort((a, b) => {
      if (sortOption === "price-asc") return a.new_price - b.new_price;
      if (sortOption === "price-desc") return b.new_price - a.new_price;
      if (sortOption === "name-asc") return a.name.localeCompare(b.name);
      if (sortOption === "name-desc") return b.name.localeCompare(a.name);
      return 0;
    });

  return (
    <div className="shopcategory">
      {/* Banner Click Event, Example product ID is 1 */}
      <img 
        className="shop-banner" 
        src={props.banner} 
        alt="Shop Banner" 
        onClick={handleBannerClick}
        style={{ cursor: 'pointer' }}
      />
      
      <div className="shop-indexsort">
        <p>
          <span>Showing 1-{Math.min(visibleProducts, sortedProducts.length)}</span> out of {sortedProducts.length} products
        </p>
        <div className="shop-sort">
          
          <select id="sort" value={sortOption} onChange={handleSort}>
            <option value="">Select</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>
      </div>

      <div className="shopcategory-products">
        {sortedProducts.slice(0, visibleProducts).map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>

      {visibleProducts < sortedProducts.length && (
        <div className="loadmore" onClick={loadMoreProducts}>
          Explore More
        </div>
      )}

      <div className="space"></div>
    </div>
  );
};

export default ShopCategory;
