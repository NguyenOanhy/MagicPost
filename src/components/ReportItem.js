import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { countOrdersByStatus } from "../firebase";

const ReportItem = ({ user }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { deliveringCount, deliveredCount, cancelledCount } = await countOrdersByStatus(user);
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
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl text-main-300 font-bold mb-8 flex items-center justify-center">Thống kê đơn hàng</h2>
      <div className="bg-white rounded-lg shadow-md px-16 w-1/2 mb-8 mx-auto flex items-center justify-center">
        {chartData ? <Pie data={chartData} className="p-16"/> : null}
      </div>
    </div>
  );
};

export default ReportItem;