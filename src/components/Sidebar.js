import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import icons from '../utils/icons';
import {getCurrentUserEmail } from '../firebase';

const { FaBoxOpen, FaClipboardList, FaUsers, FaInfoCircle, TbLayoutSidebarRightExpand, TbLayoutSidebarLeftExpand, GoHomeFill, FaRegUser } = icons;

const Sidebar = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0); // Default to the "Trang chủ" menu item
  const [userEmail, setUserEmail] = useState('');

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  const pages = [
    {
      name: 'Đơn hàng',
      path: 'Orders',
      iconClass: <FaBoxOpen size={30} />,
    },
    {
      name: 'Thống kê',
      path: 'Reports',
      iconClass: <FaClipboardList size={30} />,
    },
    {
      name: 'Quản lý',
      path: 'Management',
      iconClass: <FaUsers size={30} />,
    },
    {
      name: 'Cước phí',
      path: 'PriceShipping',
      iconClass: <FaInfoCircle size={30} />,
    },
  ];

  useEffect(() => {
    // Find the index of the current path in the pages array
    const currentIndex = pages.findIndex(
      (page) => location.pathname.includes(`/private/${page.path.toLowerCase()}`)
    );

    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [location]);

  useEffect(() => {
    const fetchUserEmail = async () => {
      const email = await getCurrentUserEmail();
      setUserEmail(email);
      sessionStorage.setItem('userEmail', email); // Store the user email in sessionStorage
    };

    const storedUserEmail = sessionStorage.getItem('userEmail'); // Retrieve the user email from sessionStorage

    if (storedUserEmail) {
      setUserEmail(storedUserEmail);
    } else {
      fetchUserEmail();
    }
  }, []);

  const handleProfileClick = () => {
    setActiveIndex(-1);
  };

  return (
    <div className={`bg-main-300  text-white ${expanded ? 'w-48' : 'w-16'} flex flex-col justify-between`}>
      <ul className="space-y-2">
        <div
          className="flex px-4 py-2 text-white hover:bg-white hover:text-main-300"
          onClick={toggleExpand}
          role="button"
        >
          {expanded ? <TbLayoutSidebarRightExpand size={30} /> : <TbLayoutSidebarLeftExpand size={30} />}
        </div>
        {pages.map((page, index) => (
          <li key={index}>
            <NavLink
              to={`/private/${page.path.toLowerCase()}`}
              className={`flex items-center space-x-2 px-4 py-2 hover:bg-white hover:text-main-300 ${
                activeIndex === index ? 'bg-white text-main-300' : ''
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
      <ul className="flex px-4 py-4 space-x-2">
        <NavLink to={`/private/profile`} 
          className="flex items-center" 
          onClick={handleProfileClick}  >
          <FaRegUser size={30} />
          {expanded && <p className='text-base px-2 py-2'>{userEmail}</p>}
        </NavLink>
      </ul>
    </div>
  );
};

export default Sidebar;