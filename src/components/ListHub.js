import React, { useEffect, useState } from 'react';
import { getDataFromFirestore } from '../firebase'; // Đảm bảo import hàm getDataFromFirestore từ file firebase.js

const ListHub = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDataFromFirestore('hub'); // Thay 'TênCơSởDữLiệu' bằng tên cơ sở dữ liệu bạn muốn truy vấn
        setData(result);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setData([]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app-container flex flex-col gap-10 text-base mx-10">
    <table className="w-full border-collapse mt-7">
      <thead>
        <tr className="rounded-lg shadow-lg">
          <th className="border bg-main-300 p-2" style={{ width: "25%" }}>STT</th>
          <th className="border bg-main-300 p-2" style={{ width: "50%" }}>Tên điểm tập kết</th>
          <th className="border bg-main-300 p-2" style={{ width: "25%" }}>Mã bưu chính</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={item.id}>
            <td className='text-center'>{index + 1}</td>
            <td>{item.name}</td>
            <td className='text-center'>{item.postcode}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default ListHub;