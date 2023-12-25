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
    <div className="w-full h-screen flex flex-col">
      <h1 className="text-3xl text-main-300 font-bold mb-8 mt-8 mx-auto text-center justify-center">Quản lý nhân viên</h1>
      <div className="content">
        <Tabs defaultIndex={0} className={"py-0 h-screen"}>
          <TabList className={"mb-0 sticky top-0"}>
            <div className='grid grid-cols-4 text-center font-bold text-md text-white bg-main-300 mt-0'>
            {user.position === "Lãnh đạo công ty" ? (<Tab className={"shadow-lg py-4 justify-center rounded-none"}>Danh sách trưởng điểm</Tab>) : (<Tab className={"shadow-lg py-4 justify-center rounded-none"}>Danh sách nhân viên</Tab>)}
            <Tab onClick={handleSignupClick} className={"shadow-lg py-4 justify-center rounded-none"}>Thêm tài khoản nhân viên</Tab>
            </div>
          </TabList>
          <TabPanel className={"bg-white"}>
          <div className='min-h-[450px]'>
            <ListStaff user={user}/>
          </div>
          </TabPanel>
          <TabPanel className={"bg-white"}>
          <div className='min-h-[450px]'>
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