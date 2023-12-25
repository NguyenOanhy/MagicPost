import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { countOrdersByStatus } from "../firebase";

const options = {
  credits: {
    enabled: false
  },
  exporting: {
    enabled: false
  },
  chart: {
    type: "column",
    backgroundColor: "none",
    style: {
      fontFamily: "Open Sans"
    },
    spacingLeft: 0,
    spacingRight: 0,
    spacingBottom: 0
  },
  title: {
    text: null
  },
  yAxis: [
    {
      min: 0,
      allowDecimals: false,
      title: {
        text: ""
      },
      gridLineWidth: 0
    }
  ],
  xAxis: {
    labels: {
      style: {
        color: "#CCCBCC"
      }
    },
    categories: ["Thống kê đơn hàng"]
  },
  plotOptions: {
    column: {
      stacking: "normal"
    }
  },
  series: [
    {
      name: "Đang vận chuyển",
      color: "#D94F6B",
      type: "column",
      data: []
    },
    {
      name: "Đã vận chuyển",
      color: "#7EB6EA",
      type: "column",
      data: []
    },
    {
      name: "Đã bị huỷ",
      color: "#FED06E",
      type: "column",
      data: []
    }
  ],
  tooltip: {
    useHTML: true,
    formatter: function (tooltip) {
      const defaultTooltip = tooltip.defaultFormatter.call(this, tooltip);

      defaultTooltip.splice(2, 0, '<hr style="margin-top: 4px; margin-bottom: 4px;">');
      defaultTooltip.splice(1, 0, '<hr style="margin-top: 4px; margin-bottom: 4px;">');

      return defaultTooltip;
    },
    shared: true
  }
};

const ReportItem = ({ user}) => {
  const [chartOptions, setChartOptions] = useState(options);

  useEffect(() => {
    async function fetchData() {
      try {
        const { deliveringCount, deliveredCount, cancelledCount } = await countOrdersByStatus(user);
        setChartOptions((prevOptions) => ({
          ...prevOptions,
          series: [
            {
              ...prevOptions.series[0],
              data: [deliveringCount]
            },
            {
              ...prevOptions.series[1],
              data: [deliveredCount]
            },
            {
              ...prevOptions.series[2],
              data: [cancelledCount]
            }
          ]
        }));
      } catch (error) {
        console.error('Error fetching order counts: ', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl text-main-300 font-bold mb-8 flex items-center justify-center">Thống kê đơn hàng</h2>
      <div className="bg-white rounded-lg shadow-md p-4">
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
        />
      </div>
    </div>
  );
};

export default ReportItem;