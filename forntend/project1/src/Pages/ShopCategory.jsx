import React, { useContext, useState } from "react";
import './CSS/Shopcategory.css';
import { ShopContext } from "../Context/ShopContext";
import dropicon from '../Components/Assests/dropdown_icon.png';
import Item from '../Components/Item/item.jsx';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);

  const [sortOption, setSortOption] = useState(""); // For sorting options
  const [visibleProducts, setVisibleProducts] = useState(8); // Initial number of products to show

  // Function to handle sorting
  const handleSort = (e) => {
    setSortOption(e.target.value);
  };

  // Function to load more products
  const loadMoreProducts = () => {
    setVisibleProducts((prevVisible) => prevVisible + 12); // Load 12 more products
  };

  // Sorting logic based on selected option
  const sortedProducts = [...all_product]
  .filter((item) => props.category === item.category) // Filter by category
  .sort((a, b) => {
    if (sortOption === "price-asc") {
      return a.new_price - b.new_price;
    } else if (sortOption === "price-desc") {
      return b.new_price - a.new_price;
    } else if (sortOption === "name-asc") {
      return a.name.localeCompare(b.name);
    } else if (sortOption === "name-desc") {
      return b.name.localeCompare(a.name);
    } else {
      return 0; // No sorting
    }
  });

  return (
    <div className="shopcategory">
      <img className="shop-banner" src={props.banner} alt="/" />
      
      <div className="shop-indexsort">
        <p>
          <span>Showing 1-{Math.min(visibleProducts, sortedProducts.length)}</span> out of {sortedProducts.length} products
        </p>
        <div className="shop-sort">
          Sort by
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

      {/* Load More Button */}
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
