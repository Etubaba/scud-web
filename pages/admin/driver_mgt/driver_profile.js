import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useReducer } from "react";
import { useState } from "react";
import { AiOutlineGift, AiOutlinePhone } from "react-icons/ai";
import { BiHash, BiRefresh, BiTrip } from "react-icons/bi";
import {
  BsArrowBarRight,
  BsPeople,
  BsPerson,
  BsPersonPlus,
  BsStopwatch,
  BsTelephone
} from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import {
  MdDisabledVisible,
  MdKeyboardArrowRight,
  MdOutlineAccountBalanceWallet,
  MdOutlineKeyboardArrowRight
} from "react-icons/md";
import { TbCar, TbCarOff } from "react-icons/tb";
import { BASE_URL } from "../../../api/base";
import Layout from "../../../components/Admin/Layout";
import PickupDesCompo from "../../../components/admincomponents/PickupDesCompo";
import Review from "../../../components/admincomponents/Review";
import DashboardCompo from "../../../components/common/DashboardCompo";
import Rating from "../../../components/common/Rating";
import { referrees } from "../../../dummy";
import ChatModal from "../../../components/admincomponents/ChatModal";
import EmptyTable from "../../../components/common/EmptyTable";
import Select from "../../../components/common/Select";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { timeOnlineCalculation } from "../../../components/services/timeOnlineCal";
import { GetBrandName } from "./document_details";
import { validateToken } from "../../../components/services/validateToken";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Driver_profile = ({ user, timeOnline }) => {
  // const [licenseStatus, setLicenseStatus] = useState("Verify");
  const [onlinePeriod, setOnlinePeriod] = useState("Monthly");
  const [openChat, setOpenChat] = useState(false);

  const router = useRouter();
  // alltrip hide and show reducer
  const [alltrips, dispatch] = useReducer(
    (alltrips, actions) => {
      if (actions.type == "show") {
        return {
          ...alltrips,
          showall: !alltrips.showall,
          alltrips: alltrips.showall ? user.trips : alltrips.alltrips.slice(0, 2)
        };
      }
      if (actions.type == "review") {
        return {
          ...alltrips,
          showallreview: !alltrips.showallreview,
          reviews: alltrips.showallreview ? user.reviews_recieved : alltrips.reviews.slice(0, 2)
        };
      }
      throw Error("Unknown action.");
    },
    {
      alltrips: user.trips.slice(0, 2),
      showall: true,
      showallreview: true,
      reviews: user.reviews_recieved.slice(0, 2)
    }
  );
  const [level, status] = [1, "Active"];

  const {
    first_name,
    last_name,
    created_at,
    phone,
    state,
    email,
    gender,
    bank_account,
    license,
    vehicles,
    picture,
    trips,
    address,
    is_active
  } = user;

  console.log("//>", user);

  const vehicleDetails = vehicles[0];

  const driver_name =
    first_name?.charAt(0).toUpperCase() +
    first_name?.slice(1) +
    " " +
    last_name?.charAt(0).toUpperCase() +
    last_name?.slice(1);

  const referrees = user.referrals;

  const rows = referrees.map((element) => (
    <tr
      // onClick={() => {
      //   router.push("/admin/rider_mgt/rider_profile");
      // }}
      className=" text-center   hover:shadow-md hover:border text-sm  text-textColor border-b"
      key={element.id}
    >
      <td className="md:text-base text-xs p-3">{element.id}</td>
      <td className="flex justify-center py-2 items-center space-x-2">
        <img
          src={
            element.picture === null || element.picture === undefined
              ? "/user.png"
              : element.picture
          }
          className="rounded-full h-7 w-7 md:h-8 md:w-8"
          alt=""
        />
        <p className=" text-xs ">{element.first_name + " " + element.last_name}</p>
      </td>

      <td className="md:text-xs text-xs p-3">{element.roles[0]}</td>
      <td className="md:text-xs text-xs p-3">{element.gender}</td>
      <td className="md:text-xs text-xs p-3">{element.phone}</td>
      <td className="text-center">
        {element.is_active ? (
          <div className="  p-1 rounded-lg bg-[#f2fbf6]">
            <p className="text-green-600 px-1">active</p>
          </div>
        ) : (
          <div className="  p-1 rounded-lg bg-[#fff4f4]">
            <p className="text-red-600 px-1">inactive</p>
          </div>
        )}
      </td>
    </tr>
  ));

  const sumArray = (arr) => {
    let num = 0;

    arr.forEach((i) => {
      num += i.rating;
    });

    return num / arr.length;
  };

  const [categories, setCategories] = useState([
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
  ]);
  const [seriesData, setSeriesData] = useState(timeOnlineCalculation(timeOnline.data, "monthly"));

  useEffect(() => {
    if (onlinePeriod.toLowerCase() === "daily") {
      const dailyArr = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
      const dailySeries = timeOnlineCalculation(timeOnline.data, "daily");
      setCategories(dailyArr);
      setSeriesData(dailySeries);
    } else if (onlinePeriod.toLowerCase() === "monthly") {
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
      const monthlySeries = timeOnlineCalculation(timeOnline.data, "monthly");

      setCategories(monthlyArr);
      setSeriesData(monthlySeries);
    } else if (onlinePeriod.toLowerCase() === "weekly") {
      const weekLength = timeOnlineCalculation(timeOnline.data, "weekly").length;
      const weeksTo4 = ["First week", "Second Week", "Third Week", "Fouth Week"];
      const weeklyArr =
        weekLength === 4
          ? weeksTo4
          : ["First week", "Second Week", "Third Week", "Fouth Week", "Fifth Week"];

      const weeklySeries = timeOnlineCalculation(timeOnline.data, "weekly");

      setCategories(weeklyArr);
      setSeriesData(weeklySeries);
    }
  }, [onlinePeriod]);

  const adminSidebar = useSelector((state) => state.scud.isAdminSideBar);

  // width and height for chart
  const width = adminSidebar ? 860 : 700;

  const mainWidth =
    typeof window !== "undefined"
      ? window.innerWidth < 450
        ? 300
        : window.innerWidth > 500 && window.innerWidth < 768
        ? 600
        : width
      : width;

  const drivertimeSpentOnline = (time) => {
    if (time === null || time === undefined) return "0 min";
    //remove negative sign
    let thetime;
    if (Math.sign(time) === -1) {
      thetime = time * -1;
    } else {
      thetime = time;
    }

    if (thetime < 60) return `${thetime}min`;
    const hr = (thetime / 60).toFixed(0);
    const min = (thetime % 60).toFixed(0);

    return `${hr}hr:${min}min`;
  };

  const completedTripsCount = alltrips.alltrips.filter((item) => item.status === "completed");
  const canceledTripsCount = alltrips.alltrips.filter((item) => item.status === "canceled");

  return (
    <div>
      {" "}
      <span className="text-lg flex space-x-2  cursor-pointer font-semibold">
        <p
          className="text-gray-500/60 text-sm md:text-base tracking-wide hover:underline"
          onClick={() => router.push("/admin/driver_mgt/manage_driver")}
        >
          Manage Driver
        </p>{" "}
        <MdOutlineKeyboardArrowRight className="mt-1" />
        <p className="tracking-wide text-sm md:text-base  font-semibold">{driver_name}</p>
      </span>
      {/* profile Information */}
      <div className="flex md:flex-row flex-col space-y-6 md:space-y-0 w-full my-10 md:space-x-5">
        <div className="bg-white justify-center  flex p-8 border w-full md:w-1/4 h-auto rounded-md">
          <div className="flex flex-col  items-center">
            <div className=" mb-4">
              <img
                alt=""
                className="w-[10rem] h-[10rem] z-0 rounded-full"
                src={picture === null ? "/user.png" : picture}
              />
              <div className="w-2.5 border border-white h-2.5 rounded-full relative z-10 -mt-5 ml-[7.5rem] bg-green-600"></div>
            </div>
            <p className="text-textColor font-semibold">{driver_name}</p>
            <div className="flex my-3 space-x-2">
              {/* <div
                className={` ${
                  level === 3 ? "bg-green-600/20" : level === 2 ? "bg-blue-600/20" : "bg-red-600/10"
                } py-[1.3px] px-3 rounded-md`}
              >
                <span
                  className={` ${
                    level === 3 ? "text-green-600" : level === 2 ? "text-blue-600" : "text-red-600"
                  }  flex space-x-1`}
                >
                  <AiOutlineGift className={`text-xs mt-0.5`} />
                  <p className="text-xs">Tier {level}</p>
                </span>
              </div> */}
              <div
                className={` ${
                  is_active ? "bg-green-600" : "bg-red-600"
                } py-[1.3px]  min-w-[60px] rounded-md `}
              >
                <p className="text-center  text-white tracking-wider text-xs">
                  {is_active ? "Active" : "Inactive"}
                </p>
              </div>
            </div>

            <Rating size={"xs"} rating={user.rating} readOnly={true} />
            <span className="flex mb-10 mt-3 space-x-2">
              <p className="text-xs  text-textColor/50">Member since</p>
              <p className="text-xs  text-textColor">{new Date(created_at).toLocaleDateString()}</p>
            </span>
            <div className="flex flex-col justify-center items-center space-y-2">
              <button
                onClick={() => setOpenChat(true)}
                className="flex rounded-lg text-sm text-scudGreen px-6 w-full py-1.5 border border-scudGreen"
              >
                <FiSend className="mt-1 mr-1" />
                <p>Send Message</p>
              </button>
              <button
                onClick={() => window.open(`tel:${phone}`)}
                className="flex rounded-lg text-sm text-white px-6 py-1.5 border bg-scudGreen"
              >
                <BsTelephone className="text-lg mr-1" />
                <p>{"0" + phone?.slice(4)}</p>
              </button>
              {/* <Button outline={true} text={[<FiSend />, "View Profile"]} /> */}
            </div>
          </div>
        </div>
        <div className="bg-white p-5 border w-full md:w-3/4 h-auto rounded-md">
          <p className="text-textColor/50 mb-4">Profile Information</p>

          <div className="flex md:flex-row flex-col space-y-6 md:space-y-0 md:space-x-20 lg:space-x-24">
            <div className=" ">
              <span className="mb-5 flex space-y-2 flex-col">
                <p className="md:text-sm text-xs text-textColor/50">Country</p>
                <p className="md:text-sm text-xs text-textColor">Nigeria</p>
              </span>
              <span className=" flex space-y-2 flex-col">
                <p className="md:text-sm text-xs text-textColor/50">Joined date</p>
                <p className="md:text-sm text-xs text-textColor">
                  {new Date(created_at).toLocaleDateString()}
                </p>
              </span>
            </div>
            <div className=" ">
              <span className="mb-5 flex space-y-2 flex-col">
                <p className="md:text-sm text-xs text-textColor/50">State</p>
                <p className="md:text-sm text-xs text-textColor">{state?.name} State</p>
              </span>
              <span className=" flex space-y-2 flex-col">
                <p className="md:text-sm text-xs text-textColor/50">Postal Code</p>
                <p className="md:text-sm text-xs text-textColor">214233</p>
              </span>
            </div>
            <div className=" ">
              {/* <span className="mb-5 flex space-y-2 flex-col">
                <p className="md:text-sm text-xs text-textColor/50">City</p>
                <p className="md:text-sm text-xs text-textColor">Port Harcourt</p>
              </span> */}
              <span className=" flex space-y-2 flex-col">
                <p className="md:text-sm text-xs text-textColor/50">Email</p>
                <p className="md:text-sm text-xs text-textColor">{email}</p>
              </span>
            </div>
            <div className=" ">
              <span className="mb-5 flex space-y-2 flex-col">
                <p className="md:text-sm text-xs text-textColor/50">Gender</p>
                <p className="md:text-sm text-xs text-textColor">{gender}</p>
              </span>
            </div>
          </div>
          <span className="my-5 flex space-y-2 flex-col">
            <p className="md:text-sm text-xs text-textColor/50">Home Address</p>
            <p className="md:text-sm text-xs text-textColor">
              {address === null ? "N/A" : address}
            </p>
          </span>

          <div className="border border-b-[0.5px] my-5"></div>

          <p className="text-textColor/50 mb-5">Bank Account Details</p>

          <div className="flex space-x-20 ">
            <div className="flex flex-col ">
              <span className="mb-5 flex space-y-2 flex-col">
                <p className="md:text-sm text-xs text-textColor/50">Bank Name</p>
                {bank_account === null ? <p> N/A</p> : <GetBrandName bank_id={bank_account?.id} />}
              </span>
              <span className=" flex space-y-2 flex-col">
                <p className="md:text-sm text-xs text-textColor/50">Account Type</p>
                <p className="md:text-sm text-xs text-textColor">Savings</p>
              </span>
            </div>
            <div className="flex md:flex-row md:space-x-16  flex-col">
              <span className="mb-5 flex space-y-2 flex-col">
                <p className="md:text-sm text-xs text-textColor/50">Account Name</p>
                <p className="md:text-sm text-xs text-textColor">{bank_account?.account_name}</p>
              </span>
              <span className="mb-5 flex space-y-2 flex-col">
                <p className="md:text-sm text-xs text-textColor/50">Account Number</p>
                <p className="md:text-sm text-xs text-textColor">{bank_account?.account_number}</p>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* driver statistics */}
      <p className="font-semibold text-textColor mb-4 mt-7">Statistics</p>
      <div className="bg-white border mb-8 p-5 rounded-md">
        <div className="grid w-full grid-cols-1 md:grid-cols-4  gap-4 ">
          <DashboardCompo
            link={"/driver_profile/earnings"}
            title={"Total Balance"}
            value={`₦${user?.account_balance}`}
            filled={true}
            Icon={MdOutlineAccountBalanceWallet}
            color="indigo"
          />
          <DashboardCompo
            link={"/driver_profile/driver_trips"}
            title={"Canceled Trips"}
            value={canceledTripsCount.length}
            filled={true}
            Icon={TbCarOff}
            color="red"
          />
          <DashboardCompo
            link={"/driver_profile/driver_trips"}
            title={"Completed Ride"}
            value={completedTripsCount.length}
            filled={true}
            Icon={TbCar}
            color="green"
          />
          <DashboardCompo
            link={"/driver_profile/driver_referral"}
            title={"Number of Referrals"}
            value={referrees.length}
            filled={true}
            Icon={BsPersonPlus}
            color="yellow"
          />
        </div>
      </div>
      {/* drivers time spent online  */}
      <div className="mb-6">
        <p className="font-semibold text-textColor mb-4 ">Time Online</p>
        <div className="w-full flex-col md:flex-row md:space-y-0 space-y-4 flex space-x-4 bg-white p-4 rounded-md border">
          <div className="md:w-1/4 w-full flex flex-col md:flex-row justify-center py-12 px-3 bg-adminbg rounded-md items-center">
            <div className="flex flex-col space-y-1 justify-center items-center">
              <div
                className={`bg-[#00AB4C] p-2 flex justify-center items-center rounded-full text-white`}
              >
                <BsStopwatch className="text-lg" />
              </div>

              <p className="font-bold text-xl">{drivertimeSpentOnline(timeOnline?.info?.time)}</p>
              <p className="text-textColor/60 text-xs">Overall total time active online</p>
            </div>
          </div>
          <div className="md:w-3/4 md:pr-0  pr-4 w-full">
            <div className="flex justify-between items-center">
              <div className="">
                <p className="text-textColor/60 text-xs">Today's active</p>
                <p className="text-sm font-bold">{drivertimeSpentOnline(timeOnline?.info?.time)}</p>
              </div>

              <Select
                value={onlinePeriod}
                setValue={setOnlinePeriod}
                data={["Yearly", "Monthly", "Weekly", "Daily"]}
                color=""
                position={" mt-1"}
              />
            </div>
            <div className=" mt-4 -ml-4 md:ml-0  ">
              {typeof window !== "undefined" && (
                <Chart
                  width={mainWidth}
                  height={200}
                  options={{
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

                      categories: categories
                    },
                    yaxis: {
                      show: false
                    }
                  }}
                  series={[
                    {
                      name: "Time Online",
                      data: seriesData
                    }
                  ]}
                  type="area"
                />
              )}
            </div>
          </div>
        </div>
      </div>
      {/* driver documents */}
      <p className="font-semibold text-textColor mb-5">Driver's Documents</p>
      <div className="w-full bg-white p-6 rounded-md border">
        <div className="flex flex-col md:flex-row md:space-x-4">
          <div className="bg-adminbg w-full md:w-[45%] rounded-md p-3 mb-5 h-auto ">
            <div className="flex justify-between mb-9">
              <p className="font-[500] text-lg tracking-wide">Driver's License</p>
            </div>
            <div className="flex flex-col justify-center md:justify-start items-center space-y-10 md:space-y-0 md:flex-row md:space-x-16">
              <div>
                <p className="text-sm mb-2 text-textColor">Front View</p>
                <img
                  alt=""
                  className="w-52 rounded-md h-28 border bg-cover"
                  src={license?.front_image == null ? "/no_image.jpg" : license?.front_image}
                />
              </div>
              <div>
                <p className="text-sm mb-2 text-textColor">Back View</p>
                <img
                  alt=""
                  className="w-52 border rounded-md h-28 bg-cover"
                  src={license?.back_image == null ? "/no_image.jpg" : license?.back_image}
                />
              </div>
            </div>
          </div>

          <div className="bg-adminbg w-full md:w-[55%] rounded-md p-3 mb-5 h-auto ">
            <div className="flex justify-between mb-9">
              <p className="font-[500] text-lg tracking-wide">Driver's License</p>
              {/* <Select
                value={licenseStatus}
                setValue={setLicenseStatus}
                data={["Approve", "Decline"]}
                color=""
                position={" mt-1"}
              /> */}

              {/* <span className="text-red-600 items-center flex space-x-2">
                <MdDisabledVisible />
                <p className="md:block hidden">Disable License</p>
              </span> */}
            </div>

            <span className="mb-5 flex space-y-2 flex-col">
              <p className="md:text-sm text-xs text-textColor/50">License Number</p>
              <p className="md:text-sm text-xs text-textColor">{license?.license_number}</p>
            </span>
            <span className="mb-5 flex space-y-2 flex-col">
              <p className="md:text-sm text-xs text-textColor/50">Expiration date</p>
              <p className="md:text-sm text-xs text-textColor">
                {new Date(license?.expiry).toLocaleDateString()}
              </p>
            </span>
          </div>
        </div>

        <div className="flex md:space-y-0 md:space-x-4 flex-col md:flex-row">
          <div className="bg-adminbg  w-full md:w-[55%]  rounded-md p-3 mb-5 h-auto ">
            <p className="text-[15px] leading-3 text-[#1E202B] mb-4 tracking-wide">
              Vehicle Details
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center md:justify-around  md:space-y-0 space-y-6 md:space-x-4">
              {vehicleDetails?.images?.map((item, idx) => (
                <div key={idx}>
                  <p className="text-sm mb-2 text-textColor">
                    {idx === 0 ? "Front View" : idx === 1 ? "Interior View" : "Back View"}
                  </p>
                  <img alt="" className="w-48 rounded-md h-28" src={item} />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-adminbg w-full md:w-[45%]   rounded-md p-3 mb-5 h-auto ">
            <p className="text-[15px] leading-3 text-[#1E202B] mb-4 tracking-wide">
              Vehicle Details
            </p>

            <div className="flex justify-between md:justify-start md:space-x-28">
              <div>
                <span className="mb-5 flex space-y-2 flex-col">
                  <p className="md:text-sm text-xs text-textColor/50">Vehicle Number</p>
                  <p className="md:text-sm text-xs text-textColor">{vehicleDetails?.frsc_number}</p>
                </span>
                <span className="mb-5 flex space-y-2 flex-col">
                  <p className="md:text-sm text-xs text-textColor/50">Brand Name</p>
                  <p className="md:text-sm text-xs text-textColor">
                    {vehicleDetails?.vehicle_brand?.name}
                  </p>
                </span>
              </div>
              <div>
                <span className="mb-5 flex space-y-2 flex-col">
                  <p className="md:text-sm text-xs text-textColor/50">Vehicle mode / year</p>
                  <p className="md:text-sm text-xs text-textColor">
                    {vehicleDetails?.model} /{" "}
                    {new Date(vehicleDetails?.manufacture_date).getFullYear()}
                  </p>
                </span>
                <span className="mb-5 flex space-y-2 flex-col">
                  <p className="md:text-sm text-xs text-textColor/50">Vehicle Color</p>
                  <p className="md:text-sm text-xs text-textColor">{vehicleDetails?.color}</p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-5">
        <p className="font-[400]">
          Trips Details <b className="text-textColor/50">({user.trips.length} )</b>
        </p>
        <button
          onClick={() => {
            dispatch({ type: "show" });
          }}
          className="bg-white flex space-x-2 px-2 py-1 text-scudGreen border rounded-lg "
        >
          <p className="text-xs">{alltrips.showall ? "View all trips" : "Hide all trips"}</p>
          <MdKeyboardArrowRight />
        </button>
      </div>
      <div className="bg-white rounded-md my-6 w-full p-4 h-auto ">
        {alltrips.alltrips.length === 0 ? (
          <EmptyTable name={"trips"} title={"No Trips Details"} Icon={BiTrip} />
        ) : (
          <>
            {alltrips.alltrips.map((trip) => (
              <PickupDesCompo details="trips" trip={trip} />
            ))}
          </>
        )}
      </div>
      <div className="flex justify-between">
        <p className="font-[400]">
          List of Referees<b className="text-textColor/50"> ({referrees.length})</b>
        </p>
        <button className="bg-white flex space-x-2 px-2 py-1 text-scudGreen border rounded-lg ">
          <p className="text-xs">View all referees</p>
          <MdKeyboardArrowRight />
        </button>
      </div>
      {/* table start here  */}
      {referrees.length === 0 ? (
        <EmptyTable Icon={BsPeople} name={"referrees"} title={"No Referrees"} />
      ) : (
        <div className="my-6 bg-white w-full overflow-x-auto border shadow pb-4  rounded-xl">
          <table className="w-full min-w-[700px] ">
            <thead className="border-b  bg-[#fbfbff] w-full rounded-t-lg">
              <tr className="border-b ">
                <td className="">
                  <div className="flex md:text-base text-xs justify-center">
                    <BiHash className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                    <p className="md:text-base  text-xs">id</p>
                  </div>
                </td>

                <td className="md:py-4 py-2 ">
                  <div className="flex  md:text-base text-xs justify-center">
                    <BsPerson className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                    <p className="md:text-base text-xs ">Referrees</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex  justify-center">
                    <BsPeople className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs ">User Type</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex  justify-center">
                    <BsPerson className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs ">Sex</p>
                  </div>
                </td>

                <td className=" text-center">
                  <div className="flex   justify-center">
                    <AiOutlinePhone className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs ">Phone</p>
                  </div>
                </td>

                <td className=" ">
                  <div className="flex justify-start">
                    <div className="border h-4 w-4 mt-1 mr-1 border-scudGreen rounded-full">
                      <BiRefresh className="text-scudGreen text-sm " />
                    </div>
                    <p>Trip Status</p>
                  </div>
                </td>
              </tr>
            </thead>

            <tbody className="mx-4">{rows}</tbody>
          </table>
        </div>
      )}
      {/* table end here  */}
      <div className="flex mb-3 mt-5 justify-between">
        <p className="font-[400]">
          Driver's Review<b className="text-textColor/50"> ({user.reviews_recieved.length})</b>
        </p>
        <button
          onClick={() => dispatch({ type: "review" })}
          className="bg-white flex space-x-2 px-2 py-1 text-scudGreen border rounded-lg "
        >
          <p className="text-xs">
            {alltrips.showallreview ? "View all reviews" : "Hide all reviews"}
          </p>
          <MdKeyboardArrowRight />
        </button>
      </div>
      <div className="bg-white p-5 flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-8 justify-between rounded-md flex border">
        <div className="bg-adminbg w-full md:w-1/3 rounded-md p-4">
          <span className="flex  space-x-2">
            {" "}
            <p className="text-2xl font-bold">
              {user.rating == null ? 0 : user.rating}
              .0
            </p>
            <p className="text-xs mt-3 text-textColor">Ratings</p>
          </span>
          <div className="flex flex-col space-y-2">
            {user.reviews_recieved.map((item, index) => (
              <div key={index} className="flex justify-between">
                <Rating size={"xs"} rating={item.rating} />
                <p className="text-sm">{item.rating}</p>
              </div>
            ))}
          </div>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-3 w-full md:w-2/3">
          {alltrips.reviews.map((item) => (
            <Review rider={true} item={item} key={item.id} />
          ))}
        </div>
      </div>
      <ChatModal open={openChat} onClose={() => setOpenChat(false)} />
    </div>
  );
};
Driver_profile.getLayout = Layout;
export default Driver_profile;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";
  const id = Object.keys(context.query)[0];

  const res = await fetch(`${BASE_URL}users/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });
  const timeRes = await fetch(`${BASE_URL}timeonline/find/user/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const user = await res.json();
  const timeOnline = await timeRes.json();

  if (
    (user?.statusCode !== undefined && user?.statusCode === 401) ||
    (timeOnline.statusCode !== undefined && timeOnline.statusCode === 401)
  ) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }

  return {
    props: {
      user,
      timeOnline
    }
  };
}
