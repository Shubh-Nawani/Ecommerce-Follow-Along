import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

export default function AddressForm() {
  const navigate = useNavigate(); // Hook to navigate after form submission
  const [address, setAddress] = useState({
    country: '',
    city: '',
    address1: '',
    address2: '',
    zipCode: '',
    addressType: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Normally, you would send the address to the backend here
    // For now, we will just log it to the console
    console.log('Address Submitted:', address);
    
    // Redirect back to the profile page after form submission
    navigate('/home');
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Add New Address</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={address.country}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={address.city}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="address1" className="block text-sm font-medium text-gray-700">Address Line 1</label>
          <input
            type="text"
            id="address1"
            name="address1"
            value={address.address1}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="address2" className="block text-sm font-medium text-gray-700">Address Line 2</label>
          <input
            type="text"
            id="address2"
            name="address2"
            value={address.address2}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">Zip Code</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={address.zipCode}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="addressType" className="block text-sm font-medium text-gray-700">Address Type</label>
          <select
            id="addressType"
            name="addressType"
            value={address.addressType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="">Select Address Type</option>
            <option value="Home">Home</option>
            <option value="Office">Office</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded-md">Submit</button>
        </div>
      </form>
    </div>
  );
}
