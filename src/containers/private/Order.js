import React, { useState } from "react";
import PendingOrder from "../../components/order/PendingOrder";
import OrderCreate from "../../components/order/OrderCreate";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ViewOrder from "../../components/order/ViewOrder";

const Order = ({ user }) => {
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
    setShowViewOrder(true);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [buttonText, setButtonText] = useState("Tổng quan đơn hàng");
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setButtonText(option.label);
    setIsOpen(false); // Close the dropdown after selecting an option
  };

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-3xl text-main-300 font-bold mt-8 mb-10 mx-auto text-center justify-center">
        QUẢN LÝ ĐƠN HÀNG
      </h1>
      <div className="w-full inline-block text-left pb-3">
        <button
          type="button"
          onClick={toggleDropdown}
          className="inline-flex justify-center w-48 ml-10 py-2 font-medium text-base text-black bg-white border border-main-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 active:bg-white"
        >
          {buttonText}
        </button>

        {isOpen && (
          <div className="absolute w-48 ml-10 mt-2 space-y-1 bg-white border border-gray-300 rounded shadow-md">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                handleViewOrderClick();
                handleOptionClick({
                  label: "Tổng quan đơn hàng",
                  value: "option1",
                });
              }}
            >
              Tổng quan đơn hàng
            </a>
            {!showPendingOrder && user.position !== "Lãnh đạo công ty" && (
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  handlePendingOrderClick();
                  handleOptionClick({
                    label: "Đơn hàng đang chờ",
                    value: "option2",
                  });
                }}
              >
                Đơn hàng đang chờ
              </a>
            )}
            {!showOrderCreate && user.position !== "Lãnh đạo công ty" && (
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  handleOrderCreateClick();
                  handleOptionClick({
                    label: "Tạo đơn hàng",
                    value: "option3",
                  });
                }}
              >
                Tạo đơn hàng
              </a>
            )}
          </div>
        )}
      </div>
      <div className="content bg-white min-h-[500px] flex flex-grow">
        <div className="mx-auto">
          {showViewOrder && !showPendingOrder && !showOrderCreate && (
            <ViewOrder user={user} />
          )}
          {!showViewOrder && showPendingOrder && !showOrderCreate && (
            <PendingOrder user={user} />
          )}
          {!showViewOrder && !showPendingOrder && showOrderCreate && (
            <OrderCreate user={user} />
                   )}
        </div>
      </div>
    </div>
  );
};

export default Order;