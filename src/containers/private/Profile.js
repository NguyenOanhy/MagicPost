import React from 'react';

const Profile = ({ user }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      {user ? (
        <div>
          <div className="mb-4">
            <h2 className="text-xl font-bold">Thông tin người dùng</h2>
          </div>
          <table className="table-auto">
            <tbody>
              <tr>
                <td className="font-semibold">Chức vụ:</td>
                <td>{user.position}</td>
              </tr>
              <tr>
                <td className="font-semibold">Quyền hạn:</td>
                <td>{user.authority}</td>
              </tr>
              <tr>
                <td className="font-semibold">Ngày sinh:</td>
                <td>{user.birth}</td>
              </tr>
              <tr>
                <td className="font-semibold">Email:</td>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td className="font-semibold">Tên:</td>
                <td>{user.name}</td>
              </tr>
              <tr>
                <td className="font-semibold">Bưu cục:</td>
                <td>{user.office}</td>
              </tr>
              <tr>
                <td className="font-semibold">Số điện thoại:</td>
                <td>{user.phone}</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Profile;