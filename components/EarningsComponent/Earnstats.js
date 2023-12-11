import React, { useState } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false
});

function Earnstats({ earnings }) {
  const { balance, net_earnings } = earnings;

  const dept = () => {
    if (Math.sign(balance) === 1) return 0;
    else return balance * -1;
  };

  const [chart, setChart] = useState({
    series: [net_earnings, dept()],
    options: {
      colors: ["#0333FF", "#FF2D2D"],

      chart: {
        height: 200,
        type: "radialBar"
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px"
            },
            value: {
              fontSize: "22px"
            },
            total: {
              show: true,
              label: "Balance",
              seriesTotal: [net_earnings, dept()],
              formatter: function (w) {
                // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                return this.seriesTotal[0] - this.seriesTotal[1];
              }
            }
          }
        }
      },
      labels: ["Earnings", "Depts"],
      stroke: {
        lineCap: "round"
      }
    }
  });

  return (
    <div className="">
      <ReactApexChart options={chart.options} series={chart.series} type="radialBar" height={230} />
    </div>
  );
}

export default Earnstats;
