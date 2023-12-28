import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import icons from "../utils/icons";
import { MdLogout } from "react-icons/md";
import { auth } from "../firebase";
import path from "../utils/path";

const {
  FaBoxOpen,
  FaClipboardList,
  FaUsers,
  FaInfoCircle,
  TbLayoutSidebarRightExpand,
  TbLayoutSidebarLeftExpand,
  GoHomeFill,
  FaRegUser,
} = icons;

const Sidebar = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0); // Default to the "Trang chủ" menu item
  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("User logged out successfully.");
      navigate(path.PUBLIC);
    } catch (error) {
      console.log("Error signing out", error.message);
    }
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  const pages = [
    {
      name: "Đơn hàng",
      path: "Orders",
      iconClass: <FaBoxOpen size={30} />,
    },
    {
      name: "Thống kê",
      path: "Reports",
      iconClass: <FaClipboardList size={30} />,
    },
    {
      name: "Quản lý",
      path: "Management",
      iconClass: <FaUsers size={30} />,
    },
    {
      name: "Cước phí",
      path: "PriceShipping",
      iconClass: <FaInfoCircle size={30} />,
    },
  ];

  useEffect(() => {
    // Find the index of the current path in the pages array
    const currentIndex = pages.findIndex((page) =>
      location.pathname.includes(`/private/${page.path.toLowerCase()}`)
    );

    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [location]);

  const handleProfileClick = () => {
    setActiveIndex(-1);
  };

  return (
    <div
      className={`bg-main-300 text-white ${
        expanded ? "w-48" : "w-20"
      } flex flex-col justify-between border-r-4`}
    >
      <ul className="space-y-3">
        <ul className="flex flex-col h-40 justify-center px-2 py-8 space-x-2 mb-24 rounded-sm shadow-lg">
          <NavLink
            to={`/private/profile`}
            className="flex flex-col px-2 pb-4"
            onClick={handleProfileClick}
          >
            {/* <FaRegUser size={30} /> */}
            {
              <img class="h-auto w-16 mx-auto py-2" src={require('../image/shipping_box.png')} alt="image description"></img>}
            {expanded && (
              <div className="text-sm pl-2 mx-auto">
                {/* <p>{user.email}</p> */}
                <p className="text-[11px]">{user.position}</p>
                {user.position !== "Lãnh đạo công ty" && (
                  <p className="text-[11px]">{`Bưu cục ` + user.office}</p>
                )}
              </div>
            )}
          </NavLink>
        </ul>
        {pages.map((page, index) => (
          <li key={index}>
            <NavLink
              to={`/private/${page.path.toLowerCase()}`}
              className={`flex items-center space-x-2 px-2 py-2 ml-3 rounded-l-2xl hover:bg-white hover:text-main-300 ${
                activeIndex === index ? "bg-white text-main-300" : ""
              }`}
              activeClassName="bg-gray-300 text-gray-800"
              onClick={() => handleItemClick(index)}
            >
              {page.iconClass}
              {expanded && <span className="text-base">{page.name}</span>}
            </NavLink>
          </li>
        ))}
        <div
          className="flex px-2 py-2 text-white hover:bg-white hover:text-main-300 hover:rounded-s-2xl ml-3"
          onClick={toggleExpand}
          role="button"
        >
          {expanded ? (
            <TbLayoutSidebarRightExpand size={30} />
          ) : (
            <TbLayoutSidebarLeftExpand size={30} />
          )}
        </div>
      </ul>
      <div className="flex items-center space-x-2 px-2 mb-6 py-2 ml-3 rounded-l-2xl hover:bg-white hover:text-main-300 cursor-pointer">
        <MdLogout size={30} onClick={handleLogout} />
        {expanded && <span className="text-base">Đăng xuất</span>}
      </div>
    </div>
  );
};

export default Sidebar;
