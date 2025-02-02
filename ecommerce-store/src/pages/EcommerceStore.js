import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import ShoppingCart from "../components/ShoppingCart";
import { products } from "../data/products";

const EcommerceStore = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">E-commerce Store</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
      <ShoppingCart cart={cart} />
    </div>
  );
};

export default EcommerceStore;
