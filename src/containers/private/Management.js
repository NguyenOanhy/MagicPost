import React, { useState } from "react";
import Signup from "../../components/Signup";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ListStaff from "../../components/ListStaff";
import ListHub from "../../components/ListHub";
import ListTransition from "../../components/ListTransition";

const Management = ({ user }) => {
  const [showSignup, setShowSignup] = useState(false);
  const [showListStaff, setShowListStaff] = useState(true);
  const [showListHub, setShowListHub] = useState(false);
  const [showListTransition, setShowListTransition] = useState(false);

  const handleSignupClick = () => {
    setShowSignup(true);
    setShowListStaff(false);
    setShowListHub(false);
    setShowListTransition(false);
  };

  const handleListStaffClick = () => {
    setShowListStaff(true);
    setShowSignup(false);
    setShowListHub(false);
    setShowListTransition(false);
  };

  const handleListHubClick = () => {
    setShowListHub(true);
    setShowListStaff(false);
    setShowSignup(false);
    setShowListTransition(false);
  };

  const handleListTransitionClick = () => {
    setShowListTransition(true);
    setShowListStaff(false);
    setShowSignup(false);
    setShowListHub(false);
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

  return (
    <div className="w-full h-screen flex flex-col">
      <h1 className="text-3xl text-main-300 font-bold mt-8 mb-10 mx-auto text-center justify-center">
        QUẢN LÝ NHÂN VIÊN
      </h1>
      <div className="w-full inline-block text-left pb-3">
        <button
          type="button"
          onClick={toggleDropdown}
          className="inline-flex justify-center w-48 ml-10 py-2 font-medium text-base text-slate-700 bg-[#F0F2F5] border border-main-300 rounded-md focus:outline-none focus:ring focus:border-blue-300 active:bg-white"
        >
          {buttonText}
        </button>

        {isOpen && (
          <div className="absolute w-48 ml-10 mt-2 space-y-1 bg-white border border-gray-300 rounded shadow-md">
            {user.position === "Lãnh đạo công ty" && (
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  handleListHubClick();
                  handleOptionClick({
                    label: "Danh sách điểm tập kết",
                  });
                }}
              >
                Danh sách điểm tập kết
              </a>
            )}
            {user.position === "Lãnh đạo công ty" && (
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  handleListTransitionClick();
                  handleOptionClick({
                    label: "Danh sách điểm giao dịch",
                  });
                }}
              >
                Danh sách điểm giao dịch
              </a>
            )}
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                handleListStaffClick();
                handleOptionClick({
                  label: "Danh sách trưởng điểm",
                });
              }}
            >
              Danh sách trưởng điểm
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                handleSignupClick();
                handleOptionClick({
                  label: "Thêm tài khoản nhân viên",
                });
              }}
            >
              Thêm tài khoản nhân viên
            </a>
          </div>
        )}
      </div>
      <div className="content h-full p-4 bg-white">
        <div className="">
          {showListStaff && <ListStaff user={user} />}
          {showListHub && <ListHub user={user} />}
          {showListTransition && <ListTransition user={user} />}
          {showSignup && <Signup />}
        </div>
      </div>
    </div>
  );
};

export default Management;