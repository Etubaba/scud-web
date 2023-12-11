import React, { forwardRef, useRef } from "react";
import { useState } from "react";
import { AiOutlineCar, AiOutlinePrinter } from "react-icons/ai";
import Layout from "../../../components/Admin/Layout";
import DashboardCompo from "../../../components/common/DashboardCompo";
import dynamic from "next/dynamic";
import Duration from "../../../components/admincomponents/Duration";
import Select2 from "../../../components/admincomponents/Select2";
import { CgArrowTopRight } from "react-icons/cg";
import { useSelector } from "react-redux";
import { BsCalendarDate, BsFilterSquare, BsPersonCircle } from "react-icons/bs";
import { MdLocationOn, MdOutlineLocationOn } from "react-icons/md";
import { BiRefresh, BiTrip } from "react-icons/bi";
import { GiSteeringWheel } from "react-icons/gi";
import { useRouter } from "next/router";
import Pagination from "../../../components/common/Pagination";
import SearchInput from "../../../components/admincomponents/SearchInput";
import DatePicker from "../../../components/common/DatePicker";
import { BASE_URL } from "../../../api/base";

import { useEffect } from "react";
import EmptyTable from "../../../components/common/EmptyTable";
import { getTimeAgo } from "../../../components/services/getTimeAgo";
import { getAddressSubstring } from "../../../components/services/shortenAddress";
import { chartSeries } from "../../../components/services/chartSeries";
import { validateToken } from "../../../components/services/validateToken";
import PrintTable from "../../../components/common/table/PrintTable";
import { useReactToPrint } from "react-to-print";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Trips = forwardRef(({ data }) => {
  const trips = data?.data;

  const [tripsList, setTripsList] = useState(trips);

  const [time, setTime] = useState("monthly");
  const [dateValue, setDateValue] = useState("Select Date");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState([
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC"
  ]);
  const [filter, setFilter] = useState("Filter Trips");

  const completedTripsCount = trips.filter((item) => item.status === "completed");
  const canceledTripsCount = trips.filter((item) => item.status === "canceled");
  const unstartedTripsCount = trips.filter((item) => item.status === "unstarted");

  const [series, setSeries] = useState([
    {
      name: "Unstarted Trips",
      data: chartSeries(unstartedTripsCount, "monthly")
    },
    {
      name: "Completed Trips",
      data: chartSeries(completedTripsCount, "monthly")
    },
    {
      name: "Canceled Trips",
      data: chartSeries(canceledTripsCount, "monthly")
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
    stroke: {
      curve: "smooth",
      width: 2
    },
    colors: ["#0333FF", "#00AB4C", "#FF2D2D"],

    xaxis: {
      zoom: {
        enabled: false
      },
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC"
      ]
    }
  });

  const router = useRouter();
  //chart width when side bar closes and opens
  const adminSidebar = useSelector((state) => state.scud.isAdminSideBar);
  const width = adminSidebar ? 1170 : 1000;

  const refreshData = async () => {
    await router.replace(router.asPath);
  };
  const mainWidth =
    typeof window !== "undefined"
      ? window.innerWidth < 450
        ? 320
        : window.innerWidth > 500 && window.innerWidth < 768
        ? 650
        : width
      : width;

  const mainHeight =
    typeof window !== "undefined"
      ? window.innerWidth < 450
        ? 250
        : window.innerWidth > 500 && window.innerWidth < 768
        ? 250
        : 300
      : 300;

  const rows = tripsList
    .filter((el) => {
      if (search === "") return el;
      else if (
        el.driver.first_name.toLowerCase().includes(search.toLowerCase()) ||
        el.driver.last_name.toLowerCase().includes(search.toLowerCase()) ||
        el.rider.last_name.toLowerCase().includes(search.toLowerCase()) ||
        el.rider.first_name.toLowerCase().includes(search.toLowerCase())
      )
        return el;
    })
    .map((element) => (
      <tr
        onClick={() => {
          // setDetails(element);
          // setModalOpen(true);
          router.push({
            pathname: "/admin/trips_mgt/user-trips/all_trips",
            query: element.driver.id
          });
        }}
        className=" text-center hover:shadow-md hover:border text-sm text-textColor border-b"
        key={element.id}
      >
        <td className="flex justify-start ml-4 py-2 items-center space-x-2">
          <img
            src={element.driver.picture === null ? "/user.png" : element.driver.picture}
            // src={element.driver.picture}
            className="rounded-full h-7 w-7 md:h-8 md:w-8"
            alt=""
          />
          <p className="md:text-xs text-xs">{element.driver.first_name}</p>
        </td>

        <td className="md:text-xs text-xs">
          <p className="text-xs">{getAddressSubstring(element.pickup)}</p>
        </td>

        <td className="md:text-base text-xs">
          <p className="text-xs">{getAddressSubstring(element.destination)}</p>
        </td>

        <td className="flex justify-start ml-4 py-2 items-center space-x-2">
          <img
            src={element.rider.picture === null ? "/user.png" : element.rider.picture}
            className="rounded-full h-7 w-7 md:h-8 md:w-8"
            alt=""
          />

          <p className=" text-xs ">{element.rider.first_name}</p>
        </td>
        <td className="md:text-base text-xs">
          <p className="text-xs">
            {element.trip_fare == null ? "N/A" : `₦ ${element.trip_fare.total_fare}`}
          </p>
        </td>
        <td className="md:text-base text-xs">
          <p className="text-xs">{getTimeAgo(element.start_date)}</p>
        </td>

        <td align="center" className=" md:text-base text-xs">
          {element.status == "completed" ? (
            <div className=" max-w-[100px]  p-1 rounded-lg bg-[#f2fbf6]">
              <p className="text-green-600 text-xs">Completed</p>
            </div>
          ) : element.status == "canceled" ? (
            <div className=" max-w-[100px] p-1 rounded-lg bg-[#fff4f4]">
              <p className="text-red-600 text-xs">Canceled</p>
            </div>
          ) : (
            <div className=" max-w-[100px] p-1 rounded-lg bg-[#F2F5FF]">
              <p className="text-scudGreen text-xs">Ongoing</p>
            </div>
          )}
        </td>
      </tr>
    ));

  const filterOptions = {
    option1: {
      title: "Filter By trips Status",
      value1: "Completed",
      value2: "Canceled"
    },
    func: applyfilter
  };

  useEffect(() => {
    if (time === "yearly") {
      setOption({
        ...options,
        xaxis: {
          ...options.xaxis,
          categories: [
            "2023",
            "2024",
            "2025",
            "2026",
            "2027",
            "2028",
            "2029",
            "2030",
            "2031",
            "2032"
          ]
        }
      });

      setSeries([
        {
          name: "Unstarted Trips",
          data: chartSeries(unstartedTripsCount, "yearly")
        },
        {
          name: "Completed Trips",
          data: chartSeries(completedTripsCount, "yearly")
        },
        {
          name: "Canceled Trips",
          data: chartSeries(canceledTripsCount, "yearly")
        }
      ]);
    } else if (time === "monthly") {
      setOption({
        ...options,
        xaxis: {
          ...options.xaxis,
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC"
          ]
        }
      });

      setSeries([
        {
          name: "Unstarted Trips",
          data: chartSeries(unstartedTripsCount, "monthly")
        },
        {
          name: "Completed Trips",
          data: chartSeries(completedTripsCount, "monthly")
        },
        {
          name: "Canceled Trips",
          data: chartSeries(canceledTripsCount, "monthly")
        }
      ]);
    } else if (time === "weekly") {
      setOption({
        ...options,
        xaxis: {
          ...options.xaxis,
          categories: ["First Week", "Second Week", "Third Week", "Fourth Week"]
        }
      });
      setSeries([
        {
          name: "Unstarted Trips",
          data: chartSeries(unstartedTripsCount, "weekly")
        },
        {
          name: "Completed Trips",
          data: chartSeries(completedTripsCount, "weekly")
        },
        {
          name: "Canceled Trips",
          data: chartSeries(canceledTripsCount, "weekly")
        }
      ]);
    } else {
      setOption({
        ...options,
        xaxis: {
          ...options.xaxis,
          categories: ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"]
        }
      });

      setSeries([
        {
          name: "Unstarted Trips",
          data: chartSeries(unstartedTripsCount, "daily")
        },
        {
          name: "Completed Trips",
          data: chartSeries(completedTripsCount, "daily")
        },
        {
          name: "Canceled Trips",
          data: chartSeries(canceledTripsCount, "daily")
        }
      ]);
    }
  }, [time]);

  const componentToPrintRef = useRef();

  const handlePrintDoc = useReactToPrint({
    content: () => componentToPrintRef.current,
    documentTitle: "all_trips",
    onAfterPrint: () => null
  });

  const dateObj = new Date().toISOString();
  const max = dateObj.slice(0, 10);

  //filter trips by date
  useEffect(() => {
    if (dateValue === "Select Date") return;
    const filteredTrips = trips.filter((el) => {
      return new Date(el.created_at).getDate() == new Date(dateValue).getDate();
    });
    setTripsList(filteredTrips);
  }, [dateValue]);

  function applyfilter(status) {
    const filteredTrips = trips.filter((el) => {
      return el.status === status;
    });
    setTripsList(filteredTrips);
  }

  return (
    <div>
      <p className="tracking-wide font-semibold text-sm md:text-lg">Manage Trips</p>

      <div className="grid mb-10 grid-cols-1 md:grid-cols-3 mt-4 gap-4 ">
        <DashboardCompo
          title={"Total Trips"}
          value={data.total_records}
          filled={true}
          Icon={AiOutlineCar}
        />
        <DashboardCompo
          title={"Completed Trips"}
          value={completedTripsCount.length}
          filled={true}
          color="green"
          Icon={AiOutlineCar}
        />

        <DashboardCompo
          title={"Canceled Rides"}
          value={canceledTripsCount.length}
          color="red"
          filled={true}
          Icon={AiOutlineCar}
        />
      </div>

      <div className="bg-white rounded-xl mb-10 mt-5 w-full  px-3 pt-5 shadow h-[25.4rem]">
        <p className="text-xs mb-2 text-[#9E9FA3]"> Total trips</p>
        <div className="flex space-y-4 md:space-y-0  flex-col md:flex-row md:justify-between">
          <div className="flex mb-3 justify-start items-end space-x-2">
            <AiOutlineCar className="text-textColor/50 text-xl mb-1.5 " />
            <p className="text-2xl font-semibold">{data?.total_records}</p>
            <div className="flex space-x-2 mb-1">
              <div className=" bg-green-600 -mr-1 h-3 w-3 rounded-full flex justify-center items-center">
                <CgArrowTopRight className="text-white text-[9px]" />
              </div>
              <p className="text-green-600 text-xs">1.2%</p>
            </div>
            <p className="text-sm mb-0.5 font-[50] text-[#9E9FA3]">VS {""} YESTERDAY</p>
          </div>
          <Duration time={time} setTime={setTime} />
        </div>

        <div className="w-full -ml-2 h-full">
          {typeof window !== "undefined" && (
            <Chart
              width={mainWidth}
              height={mainHeight}
              options={options}
              series={series}
              type="line"
            />
          )}
        </div>
      </div>

      <div>
        <div className="flex flex-col md:flex-row items-center mb-4 md:mb-7 md:justify-between">
          <p className="font-semibold md:text-base text-sm md:mt-0 mb-4">All Trips Table</p>
          <SearchInput setValue={setSearch} value={search} />
        </div>

        <div className="flex flex-col space-y-4 md:space-y-0 justify-center items-center md:flex-row md:justify-between">
          <PrintTable
            handlePrintDoc={handlePrintDoc}
            table_id={"#all_trips"}
            file_name={"all_trips"}
          />
          <div className="flex justify-center items-center space-x-3">
            <DatePicker
              max={max}
              onChange={(e) => setDateValue(e.target.value)}
              value={dateValue}
            />

            <Select2
              position={"mt-[12rem]"}
              filter={true}
              filterOptions={filterOptions}
              Icon={BsFilterSquare}
              setValue={setFilter}
              value={filter}
            />
          </div>
        </div>
      </div>

      {/* table start here  */}
      {trips.length == 0 ? (
        <EmptyTable name={"trips"} title={"Trips"} Icon={BiTrip} />
      ) : (
        <div
          id="all_trips"
          ref={componentToPrintRef}
          style={{ height: window.innerHeight, width: "100%" }}
          className="my-5 bg-white w-full overflow-x-auto border shadow pb-4  rounded-xl"
        >
          <table className="w-full min-w-[700px] ">
            <thead className="border-b  bg-[#fbfbff] w-full rounded-t-lg">
              <tr className="border-b ">
                <td className="">
                  <div className="flex md:text-base text-xs justify-center">
                    <GiSteeringWheel className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                    <p className="md:text-base  text-xs">Driver</p>
                  </div>
                </td>

                <td className="md:py-4 py-2 ">
                  <div className="flex  md:text-base text-xs justify-center">
                    <MdLocationOn className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                    <p className="md:text-base text-xs ">Pick Up</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex  justify-center">
                    <MdOutlineLocationOn className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs ">Destination</p>
                  </div>
                </td>

                <td className="">
                  <div className="flex md:text-base text-xs justify-center">
                    <BsPersonCircle className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                    <p className="md:text-base  text-xs">Rider</p>
                  </div>
                </td>

                <td className=" ">
                  <div className="flex  justify-center">
                    {/* <BsPersonCircle className="text-scudGreen mr-2 text-sm mt-1" /> */}
                    <p className="text-scudGreen text-sm md:text-lg -mt-0.5 mr-1">₦</p>
                    <p className="md:text-base text-xs ">Fare</p>
                  </div>
                </td>
                <td className=" text-center">
                  <div className="flex   justify-center">
                    <BsCalendarDate className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs ">Date</p>
                  </div>
                </td>

                <td className=" ">
                  <div className="flex justify-center">
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
      <Pagination setData={setTripsList} serverData={data} isAdmin={true} />
      {/* <Pagination /> */}
    </div>
  );
});

Trips.getLayout = Layout;
export default Trips;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";

  const res = await fetch(`${BASE_URL}trips?type=trips`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();

  if (data?.statusCode !== undefined && data?.statusCode === 401) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }

  console.log();
  return {
    props: {
      data
    }
  };
}
