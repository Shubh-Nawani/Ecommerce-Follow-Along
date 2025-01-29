import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import ProductForm from '../components/ProductForm';

// Sample product data - in a real app, this would come from an API
const products = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality.'
  },
  {
    id: '2',
    name: 'Smart Watch Series X',
    price: 399.99,
    imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80',
    description: 'Advanced smartwatch with health tracking and seamless connectivity.'
  },
  {
    id: '3',
    name: 'Professional Camera Kit',
    price: 1299.99,
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
    description: 'Professional-grade camera with multiple lenses and accessories.'
  },
  {
    id: '4',
    name: 'Laptop Pro 16"',
    price: 1999.99,
    imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=80',
    description: 'Powerful laptop for professionals with stunning display and long battery life.'
  },
  {
    id: '5',
    name: 'Wireless Gaming Mouse',
    price: 79.99,
    imageUrl: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&q=80',
    description: 'High-precision gaming mouse with customizable RGB lighting.'
  },
  {
    id: '6',
    name: 'Premium Mechanical Keyboard',
    price: 159.99,
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
    description: 'Mechanical keyboard with RGB backlight and premium switches.'
  }
];

export function Products({ onSignOut }: { onSignOut: () => void }) {
  return (
    <>
    <ProductForm/>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">TechStore</h1>
            </div>
            <div className="flex items-center gap-6">
              <nav className="flex items-center gap-6">
                <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Products</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">Categories</a>
                <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
              </nav>
              <button
                onClick={onSignOut}
                className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our curated selection of premium tech products, designed to enhance your digital lifestyle.
          </p>
        </section>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </main>
    </div>
    </>
  );
}