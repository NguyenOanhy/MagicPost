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
    <div className="app-container flex flex-col gap-10 text-base mx-10" >
      <table className='w-full border-collapse mt-7 rounded-xl overflow-hidden'>
        <thead>
          <tr className="rounded-lg shadow-lg">
            <th className="border text-white bg-main-300 p-3"style={{ border: "none"}}>STT</th>
            <th className="border text-white bg-main-300 p-3"style={{ border: "none"}}>Họ tên</th>
            <th className="border text-white bg-main-300 p-3"style={{ border: "none"}}>Ngày sinh</th>
            <th className="border text-white bg-main-300 p-3"style={{ border: "none"}}>Email</th>
            <th className="border text-white bg-main-300 p-3"style={{ border: "none"}}>Chức vụ</th>
            <th className="border text-white bg-main-300 p-3"style={{ border: "none"}}>Bưu cục</th>
            <th className="border text-white bg-main-300 p-3"style={{ border: "none"}}>Số điện thoại</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff, index) => (
            <tr key={staff.id}>
              <td className="border p-3 text-center"style={{borderRight: "none"}}>{index + 1}</td>
              <td className="border p-3 text-center"style={{ borderRight: "none", borderLeft: "none"}}>{staff.name}</td>
              <td className="border p-3 text-center"style={{ borderRight: "none", borderLeft: "none"}}>{staff.birth}</td>
              <td className="border p-3 text-center"style={{ borderRight: "none", borderLeft: "none"}}>{staff.email}</td>
              <td className="border p-3 text-center"style={{ borderRight: "none", borderLeft: "none"}}>{staff.position}</td>
              <td className="border p-3 text-center"style={{ borderRight: "none", borderLeft: "none"}}>{staff.office}</td>
              <td className="border p-3 text-center"style={{ borderLeft: "none"}}>{staff.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListStaff;