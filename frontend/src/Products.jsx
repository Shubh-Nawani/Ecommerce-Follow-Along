import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white shadow-lg rounded-lg p-4">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md" />
            <h3 className="text-xl font-semibold mt-2">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <span className="block text-lg font-bold mt-2">${product.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
