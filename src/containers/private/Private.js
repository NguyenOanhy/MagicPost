import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { Scrollbars } from 'react-custom-scrollbars-2';

const Private = () => {
  return (
    <div className='flex h-screen'>
      <div className='flex'>
        <Sidebar />
      </div>
      <div className='flex-auto mt-16'>
        <Scrollbars autoHide style={{ width: '100%', height: '100%' }}>
          <Outlet className='mt-16' />
        </Scrollbars>
      </div>
    </div>
  );
}

export default Private;