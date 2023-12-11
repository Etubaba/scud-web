import React, { useEffect, useState } from "react";
import Layout from "../../components/driver_layout/Layout";
import {
  BsSearch,
  BsPersonCircle,
  BsCreditCard,
  BsClock,
  BsArrowLeft,
  BsArrowRight,
  BsCalendar2Date
} from "react-icons/bs";
import { TbCarOff, TbCar } from "react-icons/tb";
import { BiRefresh, BiTrip } from "react-icons/bi";
import { MdOutlineLocationOn, MdLocationOn } from "react-icons/md";

import "animate.css";
import DashboardCompo from "../../components/common/DashboardCompo";
import { AiOutlineCar } from "react-icons/ai";
import Select from "../../components/common/Select";
import Modal from "../../components/common/Modal";
import { getAddressSubstring } from "../../components/services/shortenAddress";
import { getTimeAgo } from "../../components/services/getTimeAgo";
import { BASE_URL } from "../../api/base";
import SearchInput from "../../components/admincomponents/SearchInput";
import Pagination from "../../components/common/Pagination";
import EmptyTable from "../../components/common/EmptyTable";
import { validateToken } from "../../components/services/validateToken";

function Trips({ trips }) {
  const [searchState, setSearchState] = useState("");
  const [page, setPage] = useState(1);
  const [dateValue, setDateValue] = useState("Total Trips");
  const [modalOpen, setModalOpen] = useState(false);
  const [details, setDetails] = useState();

  const [tripsList, setTripList] = useState(trips);

  const completedTrips = trips.filter((item) => item.status === "completed");
  const canceledTrips = trips.filter((item) => item.status === "canceled");

  function filterByDateRange(range, objects) {
    if (range === "Total Trips") return objects;
    const dateRange = range.split(" - ");
    const fromDate = new Date(dateRange[0]).getTime();
    const toDate = new Date(dateRange[1]).getTime();

    const filteredObjects = objects.filter((obj) => {
      const createdAt = new Date(obj.created_at).getTime();
      return createdAt >= fromDate && createdAt <= toDate;
    });

    return filteredObjects;
  }

  useEffect(() => {
    setTripList(filterByDateRange(dateValue, trips));
  }, [dateValue]);

  const rows = tripsList
    .filter((item) => {
      if (searchState === "") return item;
      if (searchState !== "") {
        return (
          item.rider.first_name.toLowerCase().includes(searchState.toLowerCase()) ||
          item.pickup.toLowerCase().includes(searchState.toLowerCase()) ||
          item.destination.toLowerCase().includes(searchState.toLowerCase())
        );
      }
    })
    .map((element) => (
      <tr
        onClick={() => {
          setDetails(element);
          setModalOpen(true);
        }}
        className=" text-center hover:shadow-md hover:border text-sm text-textColor border-b"
        key={element.id}
      >
        <td className="flex justify-center py-2 items-center space-x-2">
          <img
            src={element.rider.picture === null ? "/user.png" : element.rider.picture}
            className="rounded-full h-7 w-7 md:h-8 md:w-8"
            alt=""
          />

          <p className=" text-xs ">{element.rider.first_name}</p>
        </td>
        <td className="md:text-xs text-xs">
          <p className="text-xs">{getAddressSubstring(element.pickup)}</p>
        </td>
        <td className="md:text-base text-xs">
          <p className="text-xs">{getAddressSubstring(element.destination)}</p>
        </td>
        <td className="md:text-base text-xs">
          <p className="text-xs">
            {element.trip_fare == null ? "N/A" : `₦ ${element.trip_fare.total_fare}`}
          </p>
        </td>
        <td className="md:text-base text-xs">
          <p className="text-xs">{getTimeAgo(element.start_date)}</p>
        </td>
        <td className="md:text-base text-xs">Cash</td>
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

  const calculateRate = (target) => {
    if (trips.length === 0) return 0;
    const rate = (target / trips.length) * 100;
    return Math.ceil(rate);
  };

  return (
    <div>
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row justify-center md:justify-between">
        <div>
          <p className="font-semibold text-lg tracking-wider"> My Trips</p>
          <p className="text-sm mt-2  text-textColor">A summary of your trips </p>
        </div>
        <div className="md:max-w-[250px]">
          <Select
            position={"md:right-0.5 "}
            value={dateValue}
            setValue={setDateValue}
            dateSelect={true}
          />
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-4 my-8 md:my-10">
        <DashboardCompo value={trips.length} title="Total trips" color="" Icon={AiOutlineCar} />
        <DashboardCompo
          value={calculateRate(completedTrips.length) + "%"}
          title="Acceptance rate"
          color="green"
          Icon={TbCar}
        />
        <DashboardCompo
          value={calculateRate(canceledTrips.length) + "%"}
          title="Cancelled trips"
          color="red"
          Icon={TbCarOff}
        />
      </div>

      {trips.length !== 0 && (
        <div className="flex  flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between items-center  mt-14">
          <div className="flex space-x-2 md:space-x-4">
            <div className="md:min-w-[120px] min-w-[90px] border rounded-md p-1">
              <p className="text-scudGreen text-xs md:text-sm">Total trips: {trips.length}</p>
            </div>
            <div className="min-w-[120px] border rounded-md p-1">
              <p className="text-textColor text-xs md:text-sm">
                Completed trips: {completedTrips.length}
              </p>
            </div>
            <div className="min-w-[120px] text-textColor border rounded-md p-1">
              <p className=" text-xs md:text-sm">cancelled trips: {canceledTrips.length}</p>
            </div>
          </div>
          <SearchInput value={searchState} setValue={setSearchState} style={"mt-4 md:mt-0"} />
        </div>
      )}

      {/* table start here  */}
      {trips.length === 0 ? (
        <EmptyTable Icon={BiTrip} title={"No Trips Details"} name={"trips"} />
      ) : (
        <div className="mt-10 mb-6 bg-white w-full overflow-x-auto border shadow pb-4  rounded-xl">
          <table className="w-full min-w-[700px] ">
            <thead className="border-b  bg-[#fbfbff] w-full rounded-t-lg">
              <tr className="border-b ">
                <td className="">
                  <div className="flex md:text-base text-xs justify-center">
                    <BsPersonCircle className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                    <p className="md:text-base  text-xs">Rider</p>
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
                <td className=" ">
                  <div className="flex  justify-center">
                    {/* <BsPersonCircle className="text-scudGreen mr-2 text-sm mt-1" /> */}
                    <p className="text-scudGreen text-sm md:text-lg -mt-0.5 mr-1">₦</p>
                    <p className="md:text-base text-xs ">Fare</p>
                  </div>
                </td>
                <td className=" text-center">
                  <div className="flex   justify-center">
                    <BsClock className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs ">Time </p>
                  </div>
                </td>
                <td className=" ">
                  <div className="flex justify-center">
                    <BsCreditCard className="text-scudGreen mr-1 md:mr-2  md:text-sm md:mt-1.5" />
                    <p className="md:text-base text-xs ">Payment Method</p>
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

      {/* <Pagination /> */}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="md:w-[30rem] w-72 h-auto">
          <p className=" text-center font-semibold md:text-left ">Trips Details</p>
          <div className="border-b my-4" />
          <div className="flex justify-between items-center">
            <div className="flex space-x-3 justify-center items-center">
              <img
                src={details?.rider.picture === null ? "/user.png" : details?.rider.picture}
                className="h-16 w-16 rounded-full"
                alt=""
              />
              <p className="md:text-2xl text-lg text-textColor">{details?.rider?.first_name}</p>
            </div>
            <div className="flex space-x-2">
              <BsCalendar2Date className="text-scudGreen" />
              <p className="text-textColor text-xs md:text-sm">{details?.date}</p>
            </div>
          </div>
          <div className="bg-[#fdfdff] flex flex-col space-y-4 mt-6 p-4 w-full border h-auto rounded-lg">
            <span className=" flex justify-between ">
              <span className="flex space-x-2">
                <MdLocationOn className="text-scudGreen mr-2 text-sm mt-1" />
                <p className="text-sm text-textColor tracking-wide">Pickup</p>
              </span>
              <p className="text-sm text-textColor tracking-wide">{details?.pickup}</p>
            </span>
            <span className=" flex justify-between ">
              <span className="flex space-x-2">
                <MdOutlineLocationOn className="text-scudGreen mr-2 text-sm mt-1" />
                <p className="text-sm text-textColor tracking-wide">Destination</p>
              </span>
              <p className="text-sm text-textColor tracking-wide">{details?.destination}</p>
            </span>
            <span className=" flex justify-between ">
              <span className="flex space-x-2">
                <p className="text-scudGreen text-sm  mr-3">₦</p>
                <p className="text-sm text-textColor tracking-wide">Fare</p>
              </span>
              <p className="text-sm text-textColor tracking-wide">
                {" "}
                {details?.trip_fare == null ? "N/A" : `₦ ${details?.trip_fare.total_fare}`}
              </p>
            </span>
            <span className=" flex justify-between ">
              <span className="flex space-x-2">
                <BsClock className="text-scudGreen mr-2 text-sm mt-1" />
                <p className="text-sm text-textColor tracking-wide">Time Spent</p>
              </span>
              <p className="text-sm text-textColor tracking-wide">
                {getTimeAgo(details?.start_date)}
              </p>
            </span>
            <span className=" flex justify-between ">
              <span className="flex space-x-2">
                <BsCreditCard className="text-scudGreen mr-2 text-sm mt-1" />
                <p className="text-sm text-textColor tracking-wide">Payment Method</p>
              </span>
              <p className="text-sm text-textColor tracking-wide">Cash</p>
            </span>
            <span className=" flex justify-between ">
              <span className="flex space-x-2">
                <div className="border h-4 w-4 mt-1 mr-1 border-scudGreen rounded-full">
                  <BiRefresh className="text-scudGreen text-sm " />
                </div>
                <p className="text-sm text-textColor tracking-wide">Trip Status</p>
              </span>
              {details?.status == "completed" ? (
                <div className=" max-w-[100px] p-1 rounded-lg bg-[#f2fbf6]">
                  <p className="text-green-600 text-sm">Completed</p>
                </div>
              ) : details?.status == "canceled" ? (
                <div className=" max-w-[100px] p-1 rounded-lg bg-[#fff4f4]">
                  <p className="text-red-600 text-xs">Canceled</p>
                </div>
              ) : (
                <div className=" max-w-[100px] p-1 rounded-lg bg-[#F2F5FF]">
                  <p className="text-scudGreen text-xs">Ongoing</p>
                </div>
              )}
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
}

Trips.getLayout = Layout;
export default Trips;

export async function getServerSideProps(context) {
  const token = context.req.cookies.accessToken || "";
  const id = context.req.cookies.user_id || "";

  const res = await fetch(`${BASE_URL}trips/driver/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const trips = await res.json();

  if (trips?.statusCode !== undefined && trips?.statusCode === 401) {
    try {
      await validateToken(context);
    } catch (err) {
      return { redirect: { destination: `/signin/driver-signin`, permanent: false } };
    }
  }
  return {
    props: {
      trips
    }
  };
}
