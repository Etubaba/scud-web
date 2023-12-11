import React from "react";
import {
  MdOutlineAccountBalanceWallet,
  MdDirectionsCar,
  MdOutlineTouchApp,
  MdOutlineArrowForwardIos
} from "react-icons/md";
import { GiSteeringWheel } from "react-icons/gi";

import { RiUserSettingsLine } from "react-icons/ri";
import { CgArrowTopRight } from "react-icons/cg";
import { BsArrowBarRight, BsClock, BsHash, BsPeople, BsPersonCircle } from "react-icons/bs";
import { TbCar, TbCarOff } from "react-icons/tb";
import Layout from "../../components/Admin/Layout";
import DashboardCompo from "../../components/common/DashboardCompo";
import { todaysRide } from "../../dummy";
import { BiRefresh, BiTaxi } from "react-icons/bi";
import { useState } from "react";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
// import { useEffect } from "react";
// import { getToken } from "../../components/services/refresh";
import { BASE_URL } from "../../api/base";
import { isDateToday } from "../../components/services/isDateToday";
import { getTimeAgo } from "../../components/services/getTimeAgo";
import EmptyTable from "../../components/common/EmptyTable";
import { useRouter } from "next/router";
import { getToken } from "../../components/services/refresh";
import { validateToken } from "../../components/services/validateToken";
import { todaysEarningsSeries } from "../../components/services/todaysEarningSeries";
import { percentageDiff } from "../../components/services/percentagediff";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Dashboard = ({ stats, earnings, rideRequests }) => {
  const todaysEarningList = earnings.earnings.filter((item) => isDateToday(item.date));

  const [series, setSeries] = useState([
    {
      name: "Earnings",
      data: todaysEarningsSeries(todaysEarningList)
    }
  ]);
  const [options, setOption] = useState({
    chart: {
      type: "area",
      zoom: {
        enabled: false
      }
    },

    dataLabels: {
      enabled: false
    },

    xaxis: {
      zoom: {
        enabled: false
      },
      categories: ["4HR", "8HR", "12HR", "16HR", "20HR", "24HR"]
    }
  });

  console.log("err", stats);
  const router = useRouter();
  const {
    total_office_admins,
    cancelled_rides,
    completed_trips,
    total_drivers,
    total_riders,
    total_vehicles
  } = stats;

  const adminSidebar = useSelector((state) => state.scud.isAdminSideBar);

  const width = adminSidebar ? 460 : 370;

  const mainWidth =
    typeof window !== "undefined"
      ? window.innerWidth < 450
        ? 320
        : window.innerWidth > 500 && window.innerWidth < 768
        ? 600
        : width
      : width;

  const todaysRideRequest = rideRequests?.data.filter((item) => isDateToday(item.time));

  const todaysEarningSum = todaysEarningList.reduce((acc, item) => {
    return item.amount + acc;
  }, 0);

  //table row
  const rows = todaysRideRequest.slice(0, 6)?.map((element, idx) => (
    <tr
      className=" text-center  hover:shadow-md hover:border text-sm text-textColor border-b"
      key={idx}
    >
      <td>{idx + 1}</td>
      <td className="flex  justify-start ml-4 py-1.5 items-center space-x-2">
        <img
          src={element.driver.picture === null ? "/user.png" : element.driver.picture}
          className="rounded-full h-7 w-7"
          alt=""
        />
        <p>{element.driver.first_name}</p>
      </td>
      <td className="md:text-sm text-xs p-3">{getTimeAgo(element.time)}</td>
      <td className="md:text-sm justify-start items-center ml-4 text-xs p-3 flex space-x-2">
        <img
          src={element.rider.picture === null ? "/user.png" : element.rider.picture}
          className="rounded-full h-7 w-7"
          alt=""
        />
        <p className="text-sm">{element.rider.first_name}</p>
      </td>{" "}
      <td className="text-center">
        {element.status == "accepted" ? (
          <div className=" max-w-[100px] p-1 rounded-lg bg-[#f2fbf6]">
            <p className="text-green-600">Accepted</p>
          </div>
        ) : (
          <div className=" max-w-[100px] p-1 rounded-lg bg-[#fff4f4]">
            <p className="text-red-600">Canceled</p>
          </div>
        )}
      </td>
    </tr>
  ));

  function formatNumber(number) {
    if (number < 10000) {
      return number.toLocaleString();
    } else if (number >= 10000 && number < 100000) {
      return (number / 1000).toFixed(1) + "k";
    } else if (number >= 100000 && number < 1000000) {
      return (number / 1000).toFixed(0) + "k";
    } else if (number >= 1000000 && number < 100000000) {
      return (number / 1000000).toFixed(1) + "M";
    } else {
      return (number / 1000000).toFixed(0) + "M";
    }
  }

  return (
    <div className="h-auto  md:px-4 ">
      <div className="">
        <p className="font-semibold text-lg tracking-wider">Dashboard</p>
      </div>

      <div className="grid mb-10 grid-cols-1 md:grid-cols-4 mt-4 gap-4 ">
        <DashboardCompo
          link={"/admin/payment_mgt/earnings"}
          title={"Total Earnings"}
          value={"₦" + earnings.net_earnings}
          filled={true}
          Icon={MdOutlineAccountBalanceWallet}
        />
        <DashboardCompo
          link={"/admin/driver_mgt/manage_driver"}
          title={"Number of Drivers"}
          value={total_drivers}
          filled={true}
          Icon={GiSteeringWheel}
          color="green"
        />
        <DashboardCompo
          title={"Total Vehicles"}
          link={"/admin/vehicle_mgt/all_vehicles"}
          value={total_vehicles}
          filled={true}
          color="yellow"
          Icon={TbCar}
        />
        <DashboardCompo
          link={"/admin/trips_mgt/trips"}
          title={"Completed Trips"}
          value={completed_trips}
          color="indigo"
          filled={true}
          Icon={MdDirectionsCar}
        />
        <DashboardCompo
          title={"Canceled Rides"}
          link={"/admin/trips_mgt/ride_request"}
          value={cancelled_rides}
          filled={true}
          color="red"
          Icon={TbCarOff}
        />
        <DashboardCompo
          title={"Number of Riders"}
          link={"/admin/rider_mgt/rider_mgt"}
          value={total_riders}
          filled={true}
          color="indigo"
          Icon={BsPeople}
        />
        <DashboardCompo
          title={"Total Admins"}
          link={"/admin/admin_mgt/admin_users"}
          value={total_office_admins}
          filled={true}
          Icon={RiUserSettingsLine}
        />
        <DashboardCompo
          title={"Manual Ride Bookings"}
          value={"78"}
          color="emerald"
          filled={true}
          Icon={MdOutlineTouchApp}
        />
      </div>

      <div className="md:flex h-auto mb-5 space-y-8 md:space-y-0 md:space-x-4">
        <div className="md:w-[60%]">
          <div className="flex  justify-between">
            <p className="text-sm font-semibold">Today Ride Requests</p>
            <div
              onClick={() => router.push("/admin/trips_mgt/ride_request")}
              className="bg-white flex justify-between px-2 py-1 rounded-lg border"
            >
              <p className="text-xs  text-scudGreen mr-2">View ride request</p>
              <MdOutlineArrowForwardIos className="text-scudGreen text-xs mt-0.5" />
            </div>
          </div>
          {todaysRideRequest?.length === 0 ? (
            <div className="h-full">
              <EmptyTable
                style={"h-[22.3rem]"}
                Icon={BiTaxi}
                name={"today's ride request"}
                title={"No Ride Request Today"}
              />
            </div>
          ) : (
            <div className=" h-[22.5rem]  overflow-x-auto min mt-5 bg-white border shadow rounded-xl">
              <table className="w-full  min-w-[550px]">
                <thead className="border-b bg-[#fbfbff] w-full rounded-t-lg">
                  <tr className="border-b ">
                    <td className="">
                      <div className="flex py-2 justify-center">
                        <BsHash className="text-scudGreen mr-1 text-lg mt-1" />
                        <p>ID</p>
                      </div>
                    </td>

                    <td className="">
                      <div className="flex py-2 justify-center">
                        <BsPersonCircle className="text-scudGreen mr-2 text-sm mt-1" />
                        <p>Driver</p>
                      </div>
                    </td>
                    <td className=" text-center">
                      <div className="flex justify-center">
                        <BsClock className="text-scudGreen mr-2 text-sm mt-1" />
                        <p>Time </p>
                      </div>
                    </td>
                    <td className="">
                      <div className="flex py-2 justify-center">
                        <BsPersonCircle className="text-scudGreen mr-2 text-sm mt-1" />
                        <p>Rider</p>
                      </div>
                    </td>

                    <td className="justify-start ">
                      <div className="flex justify-start">
                        <div className="border h-4 w-4 mt-1 mr-1 border-scudGreen rounded-full">
                          <BiRefresh className="text-scudGreen text-sm " />
                        </div>
                        <p>Status</p>
                      </div>
                    </td>
                  </tr>
                </thead>

                <tbody className="mx-4">{rows}</tbody>
              </table>
            </div>
          )}
        </div>
        <div className="md:w-[40%] ">
          <div className="flex justify-between">
            {" "}
            <p className="text-sm font-semibold">Today's Earnings</p>
            <div
              onClick={() => router.push("/admin/payment_mgt/earnings")}
              className="bg-white flex justify-between px-2 py-1 rounded-lg border"
            >
              <p className="text-xs text-scudGreen mr-1">View Earnings</p>
              <MdOutlineArrowForwardIos className="text-scudGreen text-xs mt-0.5" />
            </div>
          </div>

          <div className="bg-white rounded-md  mt-5 w-full  px-3 pt-5 shadow h-[22.5rem]">
            <p className="text-xs mb-2 text-[#9E9FA3]">Today's total earning</p>

            <div className="flex mb-3 justify-start items-end space-x-1">
              <p className="text-2xl text-title font-semibold ">₦</p>
              <p className="text-2xl text-title font-semibold">{formatNumber(todaysEarningSum)}</p>
              <div className="flex space-x-2 mb-1">
                <div
                  className={` ${
                    percentageDiff(todaysEarningList).includes("-") ? "bg-red-600" : "bg-green-600"
                  } -mr-1 h-3 w-3 rounded-full flex justify-center items-center`}
                >
                  <CgArrowTopRight className="text-white text-[9px]" />
                </div>
                <p
                  className={`${
                    percentageDiff(todaysEarningList).includes("-")
                      ? "text-red-600"
                      : "text-green-600"
                  } text-xs`}
                >
                  {percentageDiff(todaysEarningList)}
                </p>
              </div>
              <p className="text-sm mb-0.5 font-[50] text-[#9E9FA3]">VS {""} YESTERDAY</p>
            </div>

            <div className=" md:-ml-2  ">
              {typeof window !== "undefined" && (
                <Chart
                  width={mainWidth}
                  height={260}
                  options={options}
                  series={series}
                  type="area"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="mb-16"></div> */}
    </div>
  );
};

Dashboard.getLayout = Layout;
export default Dashboard;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";

  const [requestRes, earningRes, statsRes] = await Promise.all([
    fetch(`${BASE_URL}trips?type=request`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }),
    fetch(`${BASE_URL}payments/earnings/admin`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }),
    fetch(`${BASE_URL}stats`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
  ]);

  const [rideRequests, earnings, stats] = await Promise.all([
    requestRes.json(),
    earningRes.json(),
    statsRes.json()
  ]);

  if (
    (stats?.statusCode !== undefined && stats?.statusCode === 401) ||
    (earnings?.statusCode !== undefined && earnings?.statusCode === 401) ||
    (rideRequests?.statusCode !== undefined && rideRequests?.statusCode === 401)
  ) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }

  // console.log(stats);
  return {
    props: {
      stats,
      earnings,
      rideRequests
    }
  };
}
