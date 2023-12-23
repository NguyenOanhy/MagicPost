import React, { useState } from 'react';
import Signup from '../../components/Signup';

const Management = () => {
  const [showSignup, setShowSignup] = useState(false);

  const handleSignupClick = () => {
    setShowSignup(true);
  };

  const handleSignupComplete = () => {
    setShowSignup(false);
  };

  const handleGoBack = () => {
    setShowSignup(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quản lý nhân viên</h1>
      <div className="content">
        {showSignup ? (
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
        )}
      </div>
    </div>
  );
};

export default Management;