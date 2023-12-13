import React, { useState } from 'react';
import PendingOrder from '../../components/order/PendingOrder';
import OrderCreate from '../../components/order/OrderCreate';

const Order = () => {
  const [showPendingOrder, setShowPendingOrder] = useState(true);
  const [showOrderCreate, setShowOrderCreate] = useState(false);

  const handlePendingOrderClick = () => {
    setShowPendingOrder(true);
    setShowOrderCreate(false);
  };

  const handleOrderCreateClick = () => {
    setShowPendingOrder(false);
    setShowOrderCreate(true);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4">
        <button
          onClick={handlePendingOrderClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Đơn hàng đang chờ
        </button>
      </div>
      <div>
        <button
          onClick={handleOrderCreateClick}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Tạo đơn hàng
        </button>
      </div>
      {showPendingOrder && <PendingOrder />}
      {showOrderCreate && <OrderCreate />}
    </div>
  );
};

export default Order;