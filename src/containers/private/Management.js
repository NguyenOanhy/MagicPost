import React, { useState } from "react";
import Signup from "../../components/Signup";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ListStaff from "../../components/ListStaff";

const Management = ({ user }) => {
  const [showSignup, setShowSignup] = useState(false);
  const [showListStaff, setShowListStaff] = useState(true);
  const handleSignupClick = () => {
    setShowSignup(true);
    setShowListStaff(false);
  };
  const handleListStaffClick = () => {
    setShowListStaff(true);
    setShowSignup(false);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [buttonText, setButtonText] = useState(
    user.position === "Lãnh đạo công ty"
      ? "Danh sách trưởng điểm"
      : "Danh sách nhân viên"
  );
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setButtonText(option.label);
    setIsOpen(false); // Close the dropdown after selecting an option
  };

  return user.position == "Trưởng điểm tập kết" ||
    user.position == "Trưởng điểm giao dịch" ||
    user.position == "Lãnh đạo công ty" ? (
    <div className="w-full h-screen flex flex-col ">
      <h1 className="text-3xl text-main-300 font-bold mt-8 mb-10 mx-auto text-center justify-center">
        QUẢN LÝ NHÂN VIÊN
      </h1>
      <div className="relative w-56 inline-block text-left mb-6">
        <button
          type="button"
          onClick={toggleDropdown}
          className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-gray-700 border border-transparent rounded-md hover:bg-gray-600 focus:outline-none focus:ring focus:border-blue-300 active:bg-gray-800"
        >
          {buttonText}
        </button>

        {isOpen && (
          <div className="absolute w-56 mt-2 space-y-2 bg-white border border-gray-300 rounded shadow-md">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                handleListStaffClick();
                handleOptionClick({
                  label:
                    user.position === "Lãnh đạo công ty"
                      ? "Danh sách trưởng điểm"
                      : "Danh sách nhân viên",
                });
              }}
            >
              {user.position === "Lãnh đạo công ty" ? (
                <a>Danh sách trưởng điểm</a>
              ) : (
                <a>Danh sách nhân viên</a>
              )}
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                handleSignupClick();
                handleOptionClick({
                  label: "Thêm tài khoản nhân viên",
                  value: "option2",
                });
              }}
            >
              Thêm tài khoản nhân viên
            </a>
          </div>
        )}
      </div>
      <div className="content h-full bg-white">
        <div className="mt-6">
          {showListStaff && <ListStaff user={user} />}
          {showSignup && <Signup />}
        </div>
      </div>
    </div>
  ) : (
    <div>Bạn không đủ quyền hạn để xem tính năng này</div>
  );
};

export default Management;
