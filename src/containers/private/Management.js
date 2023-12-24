import React, { useState } from 'react';
import Signup from '../../components/Signup';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ListStaff from '../../components/ListStaff';

const Management = ({user}) => {
  const [showSignup, setShowSignup] = useState(true);

  const handleSignupClick = () => {
    setShowSignup(true);
  };

  return (
    user.position == "Trưởng điểm tập kết" || user.position == "Trưởng điểm giao dịch" || user.position == "Lãnh đạo công ty" ? (
    <div className="w-full flex flex-col">
      <h1 className="text-3xl text-main-300 font-bold mb-6 mx-auto text-center justify-center">Quản lý nhân viên</h1>
      <div className="content">
        <Tabs defaultIndex={0}>
          <TabList>
            <div className='grid grid-cols-4 text-center font-bold text-md text-main-300 mt-6'>
            <Tab>Danh sách nhân viên</Tab>
            <Tab onClick={handleSignupClick}>Thêm tài khoản nhân viên</Tab>
            </div>
          </TabList>
          <TabPanel>
            <ListStaff user={user}/>
          </TabPanel>
          <TabPanel>
            <div className='mt-16'>
            {showSignup && <Signup />}
          </div>
          </TabPanel>
          
        </Tabs>
        {/* {showSignup ? (
          <>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
              onClick={handleGoBack}
            >
              Quay lại
            </button>
            <Signup onComplete={handleSignupComplete} />
          </>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSignupClick}
          >
            Tạo tài khoản
          </button>
        )} */}
      </div>
    </div>
  ) : 
    (<div>
       Bạn không đủ quyền hạn để xem tính năng này
    </div>)
  )
};

export default Management;