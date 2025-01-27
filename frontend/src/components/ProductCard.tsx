import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

export function ProductCard({ name, price, imageUrl, description }: ProductCardProps) {
  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        />
        <button 
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white shadow-sm hover:shadow transition-all duration-200"
          aria-label="Add to wishlist"
        >
          <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">{name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>
          <button 
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}