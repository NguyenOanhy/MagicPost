import React from 'react';
import { NavLink } from 'react-router-dom';

const Order = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <NavLink
          to="/private/pending-order"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          activeClassName="bg-blue-600"
        >
          Đơn hàng đang chờ
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/private/order-create"
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          activeClassName="bg-green-600"
        >
          Tạo đơn hàng
        </NavLink>
      </div>
    </div>
  );
};

export default Order;