import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import icons from '../utils/icons';

const { FaBoxOpen, FaClipboardList, FaUsers, FaInfoCircle, TbLayoutSidebarRightExpand, TbLayoutSidebarLeftExpand } = icons;

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const pages = [
    {
      name: 'Orders',
      iconClass: <FaBoxOpen size={30}/>,
    },
    {
      name: 'Reports',
      iconClass: <FaClipboardList size={30}/>,
    },
    {
      name: 'Management',
      iconClass: <FaUsers size={30}/>,
    },
    {
      name: 'PriceShipping',
      iconClass: <FaInfoCircle size={30}/>,
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
                to={{ pathname: `/private/${page.name.toLowerCase()}` }}
                className="flex items-center space-x-2 px-4 py-2 text-gray-800 hover:bg-gray-300"
                activeClassName="bg-gray-300 text-gray-800"
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