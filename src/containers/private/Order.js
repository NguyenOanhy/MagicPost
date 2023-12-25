import React, { useState } from 'react';
import PendingOrder from '../../components/order/PendingOrder';
import OrderCreate from '../../components/order/OrderCreate';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ViewOrder from '../../components/order/ViewOrder';

const Order = ({user}) => {
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
          <h1 className="text-3xl text-main-300 font-bold mt-8 mb-8 mx-auto text-center justify-center">Quản lý đơn hàng</h1>
         <Tabs defaultIndex={0} className={"py-0 h-screen"}>
          <TabList className={"mb-0 bg-main-300 sticky top-0 "}>
            <div className='grid grid-cols-4 text-center font-bold text-md text-white'>
              <Tab onClick={handleViewOrderClick} className={"shadow-lg py-4 justify-center rounded-none"}>Tổng quan đơn hàng</Tab>
              <Tab onClick={handlePendingOrderClick} className={"shadow-lg py-4 justify-center rounded-none"}>Đơn Hàng Đang chờ</Tab>
              <Tab onClick={handleOrderCreateClick} className={"shadow-lg py-4 justify-center rounded-none"}>Tạo đơn hàng</Tab>
            </div>
            
          </TabList>
          <TabPanel  className={"bg-white overflow-y-auto"}>
            <div className='mx-16 mt-0 min-h-[450px]'>
            {showViewOrder && <ViewOrder user = {user}/>}
            </div>
          </TabPanel> 
          <TabPanel className={"bg-white"}>
            <div className='mx-16 min-h-[450px]'>
            {showPendingOrder && <PendingOrder user = {user}/>}
            </div>
          </TabPanel> 
          <TabPanel className={"bg-white overflow-y-auto"}>
          <div className='pt-10'>
            {showOrderCreate && <OrderCreate user = {user}/>}
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