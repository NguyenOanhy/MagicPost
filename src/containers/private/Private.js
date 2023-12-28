import React from 'react';
import { Outlet, useNavigate  } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { Scrollbars } from 'react-custom-scrollbars-2';

const Private = ({user}) => {
  return (
    <div className='flex h-screen bg-white'>
      <div className='flex'>
        <Sidebar user={user}/>
      </div>
      <div className='flex-auto mt-3'>
        <Scrollbars autoHide style={{ width: '100%',height: '100%'}}>
          <Outlet className='' />
        </Scrollbars>
      </div>
    </div>
  );
}

export default Private;