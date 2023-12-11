import React, { useEffect, useState } from "react";
import DashboardCompo from "../../components/common/DashboardCompo";
import Layout from "../../components/driver_layout/Layout";
import { AiOutlineCar, AiOutlineUsergroupAdd, AiOutlineGift } from "react-icons/ai";
import { TbCar, TbWallet } from "react-icons/tb";
import {
  BsStar,
  BsCheckCircle,
  BsStarFill,
  BsArrowRightCircle,
  BsPhone,
  BsCheck
} from "react-icons/bs";
import { MdPersonOutline } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import Select from "../../components/common/Select";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useSelector } from "react-redux";
import { BASE_URL, WEBSITE_BASE_URL } from "../../api/base";
import Rating from "../../components/common/Rating";
import { chartSeries } from "../../components/services/chartSeries";
import { validateToken } from "../../components/services/validateToken";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Index = ({ trips, earnings, userDetails }) => {
  const [durationValue, setDurationValue] = useState("daily");
  const [durationValue2, setDurationValue2] = useState("Total Earnings");
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState(["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"]);
  const [seriesData, setSeriesData] = useState(chartSeries(trips, "daily"));

  const { balance, earnings: earningsArr, net_earnings } = earnings;

  const user = useSelector((state) => state.auth.userDetails);
  const { referrals, is_active, reviews } = userDetails;

  const completedTrips = trips.filter((item) => item.status === "completed");
  const canceledTrips = trips.filter((item) => item.status === "canceled");

  const duration = ["Monthly", "Weekly", "Daily"];

  const router = useRouter();

  //copy to clipboard
  const copyToClipboard = (str) => {
    window.navigator.clipboard.writeText(str);
    setOpen(true);
  };

  const getMonthAndDay = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    return `${month} ${day}`;
  };

  useEffect(() => {
    if (durationValue.toLowerCase() === "daily") {
      const dailyArr = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
      const dailySeries = chartSeries(trips, "daily");
      setCategories(dailyArr);
      setSeriesData(dailySeries);
    } else if (durationValue.toLowerCase() === "monthly") {
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
      const monthlySeries = chartSeries(trips, "monthly");

      setCategories(monthlyArr);
      setSeriesData(monthlySeries);
    } else if (durationValue.toLowerCase() === "weekly") {
      const weekLength = chartSeries(trips, "weekly").length;
      const weeksTo4 = ["First week", "Second Week", "Third Week", "Fouth Week"];
      const weeklyArr =
        weekLength === 4
          ? weeksTo4
          : ["First week", "Second Week", "Third Week", "Fouth Week", "Fifth Week"];

      const weeklySeries = chartSeries(trips, "weekly");

      setCategories(weeklyArr);
      setSeriesData(weeklySeries);
    }
  }, [durationValue]);

  return (
    <div className="">
      <div className="flex flex-col md:flex-row mb-5  md:mb-10 justify-center md:justify-between items-center">
        <p className="text-lg tracking-wide font-semibold">Dashboard</p>
        <span className="flex flex-col md:flex-row space-y-2 md:space-y-0 mt-5 md:-mt-5 md:space-x-2">
          {" "}
          <p className="text-sm text-textColor">Referral link:</p>
          <p className="text-scudGreen text-sm">
            {WEBSITE_BASE_URL + `?referral_code=${user.referral_code}`.substring(23) + "..."}
          </p>
          <button
            onClick={() =>
              copyToClipboard(WEBSITE_BASE_URL + `?referral_code=${user.referral_code}`)
            }
            className="bg-scudGreen  max-w-[40px] hover:to-blue-500 text-[10px] text-white rounded-md px-1 py-[2px]"
          >
            Copy
          </button>
        </span>
      </div>

      <div className="w-full flex md:flex-row flex-col space-y-5 md:space-y-0 md:space-x-4 mb-10">
        <DashboardCompo value={trips.length} title="Total trips" color="red" Icon={AiOutlineCar} />
        <DashboardCompo value={completedTrips.length} title="Completed trips" Icon={TbCar} />
        <DashboardCompo
          value={referrals.length}
          title="Total Referrals"
          color="yellow"
          Icon={AiOutlineUsergroupAdd}
        />
        <DashboardCompo
          value={`₦${balance}`}
          title="Total Earnings"
          color="green"
          Icon={TbWallet}
        />
      </div>

      <div className="flex space-y-5 flex-col md:flex-row md:space-y-0 md:space-x-4 w-full mb-5 md:mb-10">
        <div className="w-full">
          <p className="text-lg mb-3 tracking-wider font-semibold">My Profile</p>
          <div className=" border w-full p-4 rounded-lg h-60">
            <div className="flex justify-between mb-8 md:mb-16">
              <div className="flex space-x-4">
                <img
                  src={
                    user.picture === null || user.picture === undefined ? "/user.png" : user.picture
                  }
                  className="rounded-full h-16 w-16"
                />
                <div>
                  <p className="mb-2 text-sm md:text-lg font-[400]">
                    {user?.first_name + " " + user?.last_name}
                  </p>
                  <Rating readOnly={true} rating={user.rating} />
                </div>
              </div>
              <button
                onClick={() => router.push("/driver_profile/profile")}
                className="border hidden md:flex rounded-md justify-center items-center border-scudGreen h-6 p-2"
              >
                <MdPersonOutline className="text-base text-scudGreen" />
                <p className="md:text-sm text-xs text-scudGreen">View Profile</p>
              </button>
            </div>

            <button
              onClick={() => router.push("/driver_profile/profile")}
              className="border my-6 flex md:hidden rounded-md justify-center items-center border-scudGreen h-6 p-2"
            >
              <MdPersonOutline className="text-base text-scudGreen" />
              <p className="md:text-sm text-xs text-scudGreen">View Profile</p>
            </button>

            <div className="flex space-x-6 md:space-x-10">
              <div>
                <p className="md:text-sm text-textColor text-[10px]  mb-4">Profile Status</p>
                {is_active ? (
                  <div className="flex space-x-1 p-[2px] rounded-md bg-green-600/10">
                    <BsCheck className="text-green-600" />
                    <p className="text-xs text-green-600">Verified</p>
                  </div>
                ) : (
                  <div className="flex space-x-1 p-[2px] rounded-md bg-red-300/10">
                    <FcCancel className="" />
                    <p className="text-xs text-red-600">Not Verified</p>
                  </div>
                )}
              </div>
              <div>
                <p className="md:text-sm text-textColor text-[10px]   mb-4">Current Level</p>
                <div className="flex space-x-1 p-[2px] justify-center items-center rounded-md bg-yellow-300/30">
                  <AiOutlineGift className=" text-yellow-400" />
                  <p className="text-xs text-yellow-400">Tier 1</p>
                </div>
              </div>
              <div>
                <p className="md:text-sm text-[10px]  text-textColor mb-4">Reviews</p>
                <div className="flex space-x-2 text-xs text-scudGreen">
                  <p>{reviews.length}</p>
                  <p>Reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full">
          <p className="text-lg mb-3 tracking-wider font-semibold">Earnings</p>
          <div className="border bg-[url(/bgdas.png)] p-4 bg-no-repeat bg-cover w-full rounded-lg h-60">
            <div className="flex justify-between mb-10">
              <p className="text-sm text-white">Total Earnings</p>
              <Select
                value={durationValue2}
                setValue={setDurationValue2}
                data={duration}
                color={"text-white"}
                position={" mt-1"}
              />
            </div>

            <div className=" flex flex-col space-y-4 text-white justify-center items-center">
              <div className="flex justify-center items-center ">
                <p className="md:text-3xl text-2xl">₦</p>
                <p className=" text-3xl  md:text-5xl">{balance}</p>
              </div>
              <div className="  ">
                <p className="md:text-base text-sm">
                  Total Earnings (
                  {getMonthAndDay(user.created_at) + " - " + getMonthAndDay(new Date())} )
                </p>
              </div>
              <button
                onClick={() => router.push("/driver_profile/earnings")}
                className="flex p-1   rounded-md space-x-2 text-white text-sm border-[0.5px] border-white "
              >
                <BsArrowRightCircle className="mt-1" />
                <p>View more</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full ">
        <p className="text-sm mb-3 tracking-wider font-semibold">Trips overview</p>
        <div className="h-72 shadow md:p-4 flex-col space-y-12 md:space-y-0 flex md:flex-row md:space-x-4 w-full md:border rounded-xl">
          <div className="h-full w-full">
            <div className="flex justify-between md:m-0 m-2 md:mb-4">
              <p className="text-xs md:text-base">Total Trips</p>

              <Select
                value={durationValue}
                setValue={setDurationValue}
                data={duration}
                color={"text-textColor"}
                position={"  "}
              />
            </div>
            <div className="w-full h-full">
              {typeof window !== "undefined" && (
                <Chart
                  height={230}
                  options={{
                    chart: {
                      type: "bar",
                      zoom: {
                        enabled: false
                      }
                    },
                    grid: {
                      show: false
                    },
                    dataLabels: {
                      enabled: false
                    },

                    xaxis: {
                      categories: categories
                    }
                  }}
                  series={[
                    {
                      name: "trips",
                      data: seriesData
                    }
                  ]}
                  type="area"
                />
              )}
            </div>
          </div>
          <div className="bg-[#f5f7ff] p-4 rounded-lg w-full md:h-full h-72 ">
            <div className="flex justify-between mb-4">
              <span className="flex space-x-2">
                <p className="text-textColor text-sm">Total Trips:</p>{" "}
                <p className="text-scudGreen text-sm font-bold">{trips?.length}</p>
              </span>

              <button
                onClick={() => router.push("/driver_profile/driver_trips")}
                className="flex p-1  rounded-md space-x-2 text-scudGreen text-sm border-[0.5px] border-scudGreen "
              >
                <BsArrowRightCircle className="mt-1" />
                <p>View more</p>
              </button>
            </div>
            <div className="w-full flex h-36 space-x-4">
              <CircularProgressbar
                styles={{
                  path: {
                    stroke: "#00AB4C",
                    transition: "stroke-dashoffset 0.5s ease 0s",
                    // Rotate the path

                    transformOrigin: "center center"
                  },
                  text: {
                    // Text color
                    fill: "#000",
                    // Text size
                    fontSize: "24px"
                  }
                }}
                className=""
                value={(completedTrips.length / trips.length) * 100}
                text={`${completedTrips?.length}`}
              />
              <CircularProgressbar
                styles={{
                  path: {
                    stroke: "#FF2D2D"
                  },
                  text: {
                    // Text color
                    fill: "#000",
                    // Text size
                    fontSize: "24px"
                  }
                }}
                value={(canceledTrips.length / trips.length) * 100}
                text={`${canceledTrips.length}`}
              />
            </div>
            <span className="flex mt-4 justify-around space-x-8 text-xs md:text-sm text-textColor">
              <p>Completed Trips</p>
              <p>Canceled Trips</p>
            </span>
          </div>
        </div>
      </div>

      <Modal onClose={() => setOpen(false)} open={open}>
        <div className="justify-center mt-1 space-x-3 mr-12 flex items-center">
          <BsCheckCircle className="text-green-600" />
          <p>Copied to clipboard</p>
        </div>
      </Modal>
      <div className="h-80  md:h-24" />
    </div>
  );
};
Index.getLayout = Layout;
export default Index;

export async function getServerSideProps(context) {
  const token = context.req.cookies.accessToken || "";
  const id = context.req.cookies.user_id || "";

  const [tripsRes, earningRes, userRes] = await Promise.all([
    fetch(`${BASE_URL}trips/driver/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }),
    fetch(`${BASE_URL}payments/earnings`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }),
    fetch(`${BASE_URL}auth/profile`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
  ]);

  const [trips, earnings, userDetails] = await Promise.all([
    tripsRes.json(),
    earningRes.json(),
    userRes.json()
  ]);
  if (
    (trips?.statusCode !== undefined && trips?.statusCode === 401) ||
    (earnings.statusCode !== undefined && earnings.statusCode === 401) ||
    userDetails?.statusCode === 401
  ) {
    try {
      await validateToken(context);
    } catch (err) {
      return { redirect: { destination: `/signin/driver-signin`, permanent: false } };
    }
  }

  return {
    props: {
      trips,
      earnings,
      userDetails
    }
  };
}
