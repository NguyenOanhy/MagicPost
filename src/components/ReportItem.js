import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { getDataFromFirestore, countOrdersByStatus } from "../firebase";
import { TbTruckDelivery, TbMailCancel } from "react-icons/tb";
import { IoMdCheckmark } from "react-icons/io";
import { IoFileTrayFullOutline } from "react-icons/io5";

const ReportItem = ({ user }) => {
  const [chartData, setChartData] = useState(null);

  const [data, setData] = useState({
    deliveringCount: 0,
    deliveredCount: 0,
    cancelledCount: 0,
    total: 0
  });

  const [selectedOption, setSelectedOption] = useState("");
  const [selectedHub, setSelectedHub] = useState("");
  const [selectedTransPoint, setSelectedTransPoint] = useState("");
  
  const [hubOptions, setHubOptions] = useState([]);
  const [transPointOptions, setTransPointOptions] = useState([]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        let result;
        if (selectedOption === "") {
          result = await countOrdersByStatus(user.office, true);
        } else if (selectedHub) {
          result = await countOrdersByStatus(selectedHub, false);
        } else if (selectedTransPoint) {
          result = await countOrdersByStatus(selectedTransPoint, false);
        }

        const { deliveringCount, deliveredCount, cancelledCount } = result;

        setData({
          deliveringCount, 
          deliveredCount,
          cancelledCount,
          total: deliveredCount + deliveringCount + cancelledCount
        });

        setChartData({
          labels: ["Đang vận chuyển", "Đã vận chuyển", "Đã hủy"],
          datasets: [
            {
              data: [
                deliveringCount, 
                deliveredCount,
                cancelledCount
              ],
              backgroundColor: [
                "#f5a6b6",
                "#7EB6EA",
                "#FED06E",
                
              ]
            }  
          ]
        });

      } catch (error) {
        console.log(error);
      }
    }

    fetchChartData();

  }, [selectedOption, selectedHub, selectedTransPoint, user.office]);

  useEffect(() => {
    const fetchLocations = async () => {
      if (user.position === "Lãnh đạo công ty") {
        const hubs = await getDataFromFirestore("hub");
        setHubOptions(hubs);
        const transPoints = await getDataFromFirestore("trans_point");
        setTransPointOptions(transPoints);
      }
    }

    fetchLocations();

  }, [user]);

// Xử lý khi thay đổi dropdown
const handleDropdownChange = (e) => {
  setSelectedOption(e.target.value);
}

// Xử lý khi chọn hub 
const handleHubSelection = (e) => {
  setSelectedHub(e.target.value);
  setSelectedTransPoint("");
} 

// Xử lý khi chọn điểm giao dịch
const handleTransPointSelection = (e) => {
  setSelectedTransPoint(e.target.value); 
  setSelectedHub(""); 
}

  return (
    <div className="flex flex-row">
    <div className="w-3/4 container mt-8">
      <h2 className="text-3xl text-main-300 font-bold mb-8 flex items-center justify-center">
        Thống kê đơn hàng
      </h2>
      {user.position === "Lãnh đạo công ty" && (
        <div>
          <select value={selectedOption} onChange={handleDropdownChange} className="mb-8 border mr-4 rounded-lg border-main-300 ml-28 px-4 py-2 text-sm text-gray-700 bg-gray-100 text-base">
            <option value="">Tổng quan</option>
            <option value="Điểm tập kết">Điểm tập kết</option>
            <option value="Điểm giao dịch">Điểm giao dịch</option>
          </select>

          {selectedOption === "Điểm tập kết" && (
            <select value={selectedHub} onChange={handleHubSelection} className="border rounded-lg border-main-300 px-4 py-2 text-sm text-gray-700 bg-gray-100">
              <option>Chọn điểm tập kết</option>
              {hubOptions.map((hub) => (
                <option key={hub.id} value={hub.name}>
                  {hub.name}
                </option>
              ))}
            </select>
          )}

          {selectedOption === "Điểm giao dịch" && (
            <select value={selectedTransPoint} onChange={handleTransPointSelection} className="border rounded-lg border-main-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
              <option>Chọn điểm giao dịch</option>
              {transPointOptions.map((transPoint) => (
                <option key={transPoint.id} value={transPoint.name}>
                  {transPoint.name}
                </option>
              ))}
            </select>
          )}
        </div>
      )}
      <div className="bg-white rounded-lg shadow-md px-16 w-3/4 h-[420px] mb-8 mx-auto flex items-center justify-center">
        {chartData ? <Pie data={chartData} className="p-16" /> : null}
      </div>
      </div>
      <div className="w-1/4 container mt-8 ml-[-50px] bg-white rounded-lg shadow-md flex">
        <div className="ml-4 mt-5 p-2">
          <div className="flex flex-row rounded-lg p-4 mb-5" style={{backgroundColor: "rgb(58,140,207)"}}>
            <div>
                <div className="rounded-full w-16 h-16 bg-[rgb(110,186,237)] flex items-center justify-center"><IoMdCheckmark  color="white" className="w-9 h-9"/></div>
            </div>
            <div className="flex flex-col pl-3 text-center pt-3 text-white">
                <h5>Đã vận chuyển</h5>
                <h4>{data.deliveredCount}</h4>
            </div>
          </div>
          <div className="flex flex-row rounded-lg p-4 mb-5" style={{backgroundColor: "#f5a6b6"}}>
            <div>
                <div className="rounded-full w-16 h-16 bg-[#FFB6C1] flex items-center justify-center"><TbTruckDelivery color="white" className="w-10 h-10"/></div>
            </div>
            <div className="flex flex-col pl-3 text-center pt-3 text-white">
                <h5>Đang vận chuyển</h5>
                <h4>{data.deliveringCount}</h4>
            </div>
          </div>
          <div className="flex flex-row rounded-lg p-4 mb-5" style={{backgroundColor: "rgb(247,185,84)"}}>
            <div>
                <div className="rounded-full w-16 h-16 bg-[rgb(247,220,154)] flex items-center justify-center"><TbMailCancel color="white" className="w-10 h-10"/></div>
            </div>
            <div className="flex flex-col pl-3 text-center pt-3 text-white">
                <h5>Đã bị hủy</h5>
                <h4 className="ml-1">{data.cancelledCount}</h4>
            </div>
          </div>
          <div className="flex flex-row rounded-lg p-4 mb-5" style={{backgroundColor: "rgb(71,189,137)"}}>
            <div>
                <div className="rounded-full w-16 h-16 bg-[rgb(112,219,182)] flex items-center justify-center"><IoFileTrayFullOutline color="white" className="w-9 h-9"/></div>
            </div>
            <div className="flex flex-col pl-3 text-center pt-3 text-white">
                <h5>Tổng đơn hàng</h5>
                <h4>{data.total}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportItem;