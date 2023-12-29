import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { countOrdersByStatus } from "../firebase";
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

  useEffect(() => {
    async function fetchData() {
      try {
        const { deliveringCount, deliveredCount, cancelledCount } = await countOrdersByStatus(user);
        const data1 = {
          deliveringCount: deliveringCount, 
          deliveredCount: deliveredCount, 
          cancelledCount: cancelledCount, 
          total: deliveredCount + deliveringCount + cancelledCount
        }
        setData(data1);
        setChartData({
          labels: ["Đang vận chuyển", "Đã vận chuyển", "Đã bị huỷ"],
          datasets: [
            {
              data: [deliveringCount, deliveredCount, cancelledCount],
              backgroundColor: ["#f5a6b6", "#7EB6EA", "#FED06E"],
              borderColor: ["#f5a6b6", "#7EB6EA", "#FED06E"],
              borderWidth: 0,
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching order counts: ', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-4">
      <div className="col-start-1 col-span-3 container mt-8">
        <h1 className="text-3xl text-main-300 font-bold mt-8 mb-10 mx-auto text-center justify-center">
        THỐNG KÊ ĐƠN HÀNG
      </h1>
      <div className="bg-white border rounded-lg shadow-md px-16 w-3/4 h-[600px] mb-8 mx-auto flex items-center justify-center">
        {chartData ? <Pie data={chartData} className="p-16"/> : null}
      </div>
      </div>
      <div className="col-start-4 col-span-1 h-[600px] mt-[140px] container ml-[-50px] my-auto bg-white rounded-lg border shadow-md ">
        <div className="mx-auto py-12 w-5/6">
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