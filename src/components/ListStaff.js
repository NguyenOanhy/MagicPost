import React, { useEffect, useState } from 'react';
import { getUsersByOffice } from '../firebase.js';

const ListStaff = ({ user }) => {
  const [staffList, setStaffList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await getUsersByOffice(user);
        setStaffList(users);
      } catch (error) {
        console.error('Error fetching users: ', error);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="app-container flex flex-col gap-10 text-base mx-16" >
      <table className='w-full border-collapse mt-7'>
        <thead>
          <tr className="rounded-lg shadow-lg">
            <th className="border bg-main-300 p-2">STT</th>
            <th className="border bg-main-300 p-2">Họ tên</th>
            <th className="border bg-main-300 p-2">Ngày sinh</th>
            <th className="border bg-main-300 p-2">Email</th>
            <th className="border bg-main-300 p-2">Chức vụ</th>
            <th className="border bg-main-300 p-2">Bưu cục</th>
            <th className="border bg-main-300 p-2">Số điện thoại</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff, index) => (
            <tr key={staff.id}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{staff.name}</td>
              <td className="border p-2">{staff.birth}</td>
              <td className="border p-2">{staff.email}</td>
              <td className="border p-2">{staff.position}</td>
              <td className="border p-2">{staff.office}</td>
              <td className="border p-2">{staff.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListStaff;