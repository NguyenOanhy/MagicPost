import React, { useEffect, useState } from 'react';

const Profile = ({ user }) => {

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {user ? (
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-bold">Thông tin người dùng</h2>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Chức vụ:</p>
            <p>{user.position}</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Quyền hạn:</p>
            <p>{user.authority}</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Ngày sinh:</p>
            <p>{user.birth}</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Email:</p>
            <p>{user.email}</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Tên:</p>
            <p>{user.name}</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Bưu cục:</p>
            <p>{user.office}</p>
          </div>
          <div className="mb-4">
            <p className="font-semibold">Số điện thoại:</p>
            <p>{user.phone}</p>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Profile;