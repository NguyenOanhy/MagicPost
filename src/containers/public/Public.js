import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import icons from '../../utils/icons';

const { CiSearch } = icons;
const Public = () => {
  const [orderId, setOrderId] = useState('');

  const search = (e) => {
    e.preventDefault();
    /* Search order id */
    window.location.href = `/orderPreview/${orderId}`;
    setOrderId('');
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-8 py-2 shadow bg-white">
        <Link to="/" className="flex items-center space-x-2">
          <p className="font-bold text-lg text-primary-color">Magic Post</p>
        </Link>
        <div className="space-x-2">
          <Link to="/login" className="btn small">
            <i className="fas fa-sign-in-alt"></i> Login
          </Link>
          <Link to="/signup" className="btn small register">
            <i className="fas fa-user-edit"></i> Signup
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-center mt-8">
        {/* Search bar */}
        <form onSubmit={search} className="flex items-center space-x-2">
          <input
            className="border border-blue-400 rounded-full py-2 px-4 focus:outline-none focus:border-blue-500"
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Look for your order here"
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full">
            <CiSearch size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Public