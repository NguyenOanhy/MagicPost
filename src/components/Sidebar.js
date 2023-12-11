import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import icons from '../utils/icons';

const { FaBoxOpen, FaClipboardList, FaUsers, FaInfoCircle, TbLayoutSidebarRightExpand, TbLayoutSidebarLeftExpand } = icons;

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  const pages = [
    {
      name: 'Đơn hàng', // 'Orders
      path: 'Orders',
      iconClass: <FaBoxOpen size={30} />,
    },
    {
      name: 'Thống kê', // 'Reports
      path: 'Reports',
      iconClass: <FaClipboardList size={30} />,
    },
    {
      name: 'Quản lý', // 'Management
      path: 'Management',
      iconClass: <FaUsers size={30} />,
    },
    {
      name: 'Cước phí', // 'PriceShipping
      path: 'PriceShipping',
      iconClass: <FaInfoCircle size={30} />,
    },
  ];

  return (
    <div className={`bg-gray-200 ${expanded ? 'w-48' : 'w-16'}`}>
      <div
        className="flex px-4 py-2 text-gray-800 hover:bg-gray-300"
        onClick={toggleExpand}
        role="button"
      >
        {expanded ? <TbLayoutSidebarLeftExpand size={30} /> : <TbLayoutSidebarRightExpand size={30} />}
      </div>
      <ul className="space-y-2">
        {pages.map((page, index) => (
          <li key={index}>
            <NavLink
              to={{ pathname: `/private/${page.path.toLowerCase()}` }}
              className={`flex items-center space-x-2 px-4 py-2 text-gray-800 hover:bg-gray-300 ${
                activeIndex === index ? 'bg-gray-300 text-gray-800' : ''
              }`}
              activeClassName="bg-gray-300 text-gray-800"
              onClick={() => handleItemClick(index)}
            >
              {page.iconClass}
              {expanded && <span className="text-base">{page.name}</span>}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;