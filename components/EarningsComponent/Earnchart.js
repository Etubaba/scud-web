import React, { useState } from "react";
import dynamic from "next/dynamic";
import Select from "../common/Select";
import { earningSeries } from "../services/earningSeries";
import { useEffect } from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false
});

function Earnchart({ earnings }) {
  const [time, setTime] = useState("Daily");
  const [categories, setCategories] = useState(["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]);
  const [seriesData, setSeriesData] = useState(earningSeries(earnings, time));

  const duration = ["Monthly", "Weekly", "Daily"];

  useEffect(() => {
    if (time.toLowerCase() === "daily") {
      const dailyArr = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
      const dailySeries = earningSeries(earnings, "daily");
      setCategories(dailyArr);
      setSeriesData(dailySeries);
    } else if (time.toLowerCase() === "monthly") {
      const monthlyArr = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      const monthlySeries = earningSeries(earnings, "monthly");

      setCategories(monthlyArr);
      setSeriesData(monthlySeries);
    } else if (time.toLowerCase() === "weekly") {
      const weekLength = earningSeries(earnings, "weekly").length;
      const weeksTo4 = ["First week", "Second Week", "Third Week", "Fouth Week"];
      const weeklyArr =
        weekLength === 4
          ? weeksTo4
          : ["First week", "Second Week", "Third Week", "Fouth Week", "Fifth Week"];

      const weeklySeries = earningSeries(earnings, "weekly");

      setCategories(weeklyArr);
      setSeriesData(weeklySeries);
    }
  }, [time]);

  return (
    <div className="">
      <div className="justify-end flex items-center mb-3">
        {" "}
        <Select
          value={time}
          setValue={setTime}
          data={duration}
          color={"text-textColor"}
          position={"  "}
        />
      </div>

      <ReactApexChart
        options={{
          chart: {
            height: 350,
            type: "bar",

            events: {
              click: function (chart, w, e) {
                // console.log(chart, w, e)
              }
            }
          },
          colors: ["#0333FF"],
          plotOptions: {
            bar: {
              columnWidth: "45%",
              distributed: true
            }
          },
          dataLabels: {
            enabled: false
          },
          legend: {
            show: false
          },
          xaxis: {
            categories: categories,
            labels: {
              style: {
                colors: [
                  "#828282",
                  "#828282",
                  "#828282",
                  "#828282",
                  "#828282",
                  "#828282",
                  "#828282"
                ],
                fontSize: "12px"
              }
            }
          },
          grid: {
            show: true
          }
        }}
        series={[
          {
            name: "Net Earnings",
            data: seriesData
          }
        ]}
        type="bar"
        height={230}
      />
    </div>
  );
}

export default Earnchart;
