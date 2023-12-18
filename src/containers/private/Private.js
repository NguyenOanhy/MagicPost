import React from 'react';
import { Outlet, useNavigate  } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { Scrollbars } from 'react-custom-scrollbars-2';
import {MdLogout} from "react-icons/md";
import { auth } from '../../firebase';
import path from '../../utils/path';

const Private = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('User logged out successfully.');
      navigate(path.PUBLIC);
    } catch (error) {
      console.log("Error signing out", error.message);
    }
  };
  return (
    <div className='flex h-screen'>
      <div className='flex'>
        <Sidebar />
      </div>
      <div className='flex-auto mt-3'>
        <Scrollbars autoHide style={{ width: '100%',height: '100%'}}>
          <div className='flex justify-end mr-8 cursor-pointer'>
              <MdLogout size={30}
               onClick={handleLogout}/>
          </div>
          <Outlet className='' />
        </Scrollbars>
      </div>
    </div>
  );
}

export default Private;