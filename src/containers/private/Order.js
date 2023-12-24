import React, { useState } from 'react';
import PendingOrder from '../../components/order/PendingOrder';
import OrderCreate from '../../components/order/OrderCreate';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ViewOrder from '../../components/order/ViewOrder';

const Order = () => {
  const [showViewOrder, setShowViewOrder] = useState(true);
  const [showPendingOrder, setShowPendingOrder] = useState(false);
  const [showOrderCreate, setShowOrderCreate] = useState(false);

  const handlePendingOrderClick = () => {
    setShowPendingOrder(true);
    setShowOrderCreate(false);
    setShowViewOrder(false);
  };

  const handleOrderCreateClick = () => {
    setShowPendingOrder(false);
    setShowOrderCreate(true);
    setShowViewOrder(false);
  };

  const handleViewOrderClick = () => {
    setShowPendingOrder(false);
    setShowOrderCreate(false);
    setShowViewOrder(true)
  };

  return (
    <div className="w-full flex flex-col">
          <h1 className="text-3xl text-main-300 font-bold mb-6 mx-auto text-center justify-center">Quản lý đơn hàng</h1>
         <Tabs defaultIndex={0}>
          <TabList>
            <div className='grid grid-cols-4 text-center font-bold text-md text-main-300 mt-6'>
              <Tab onClick={handleViewOrderClick}>Tổng quan đơn hàng</Tab>
              <Tab onClick={handlePendingOrderClick}>Đơn Hàng Đang chờ</Tab>
              <Tab onClick={handleOrderCreateClick}>Tạo đơn hàng</Tab>
            </div>
            
          </TabList>
          <TabPanel>
            <div className='mx-16 mt-4'>
            {showViewOrder && <ViewOrder />}
            </div>
          </TabPanel> 
          <TabPanel>
            <div className='mx-16 mt-4'>
            {showPendingOrder && <PendingOrder />}
            </div>
          </TabPanel> 
          <TabPanel>
          <div className='mt-4'>
            {showOrderCreate && <OrderCreate />}
            </div>
          </TabPanel>
          
        </Tabs> 
    {/* <div className="flex flex-col items-center">
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
      {showOrderCreate && <OrderCreate />}*/}
    </div>
  );
};

export default Order;