import React from 'react';

const Profile = ({ user }) => {
  return (
    <div className="mx-auto w-11/12 justify-center items-center shadow-md rounded-lg p-6 bg-white min-h-[600px]">
      {user ? (
        <div className='w-1/2 mx-auto'>
          <div className="mb-4">
          <h1 className="text-3xl text-main-300 font-bold mb-20 mx-auto mt-10 text-center justify-center">Thông tin người dùng</h1>
          </div>
          <div className='items-center justify-center'>
            <img class="h-auto w-24 mx-auto " src={require('../../image/shipper.png')} alt="image description"></img>
          </div>
          <div className='w-full grid grid-cols-2 items-center justify-center'>
          <table className="w-fit mx-16 mt-10">
            <tbody> 
              <tr>
                <td className="font-semibold">Chức vụ:</td>
              </tr>
              <tr>
                <td className="font-semibold">Quyền hạn:</td>
              </tr>
              <tr>
                <td className="font-semibold">Ngày sinh:</td>
              </tr>
              <tr>
                <td className="font-semibold">Email:</td>
              </tr>
              <tr>
                <td className="font-semibold">Tên:</td>
              </tr>
              <tr>
                <td className="font-semibold">Bưu cục:</td>
              </tr>
              <tr>
                <td className="font-semibold">Số điện thoại:</td>
              </tr>
            </tbody>
            </table>
            <table className="mx-auto w-fit mt-10">
            <tbody> 
              <tr>
                <td>{user.position}</td>
              </tr>
              <tr>
                <td>{user.authority}</td>
              </tr>
              <tr>
                <td>{user.birth}</td>
              </tr>
              <tr>
                <td>{user.email}</td>
              </tr>
              <tr>
                <td>{user.name}</td>
              </tr>
              <tr>
                <td>{user.office}</td>
              </tr>
              <tr>
                <td>{user.phone}</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Profile;