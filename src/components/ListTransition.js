import React, { useEffect, useState } from 'react';
import { getDataFromFirestore } from '../firebase'; // Đảm bảo import hàm getDataFromFirestore từ file firebase.js

const ListTransition = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDataFromFirestore('trans_point'); // Thay 'TênCơSởDữLiệu' bằng tên cơ sở dữ liệu bạn muốn truy vấn
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
      <table className="w-full border-collapse mt-7 rounded-xl overflow-hidden">
        <thead>
          <tr className="rounded-lg shadow-lg">
            <th className="border bg-main-300 text-white p-3" style={{ width: "25%" }}>STT</th>
            <th className="border bg-main-300 text-white p-3" style={{ width: "25%" }}>Tên điểm giao dịch</th>
            <th className="border bg-main-300 text-white p-3" style={{ width: "25%" }}>Điểm tập kết tương ứng</th>
            <th className="border bg-main-300 text-white p-3" style={{ width: "25%" }}>Mã bưu chính</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td className="border p-2 text-center"style={{ borderRight: "none"}}>{index + 1}</td>
              <td className="border p-2 pl-20"style={{ borderRight: "none", borderLeft: "none"}}>{item.name}</td>
              <td className="border p-2 text-center"style={{ borderRight: "none", borderLeft: "none"}}>{item.hub}</td>
              <td className="border p-2 text-center"style={{ borderLeft: "none"}}>{item.postcode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListTransition;