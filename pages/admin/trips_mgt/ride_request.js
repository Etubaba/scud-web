import React from "react";
import { useState } from "react";
import Select2 from "../../../components/admincomponents/Select2";
import { AiOutlineCar } from "react-icons/ai";
import { BiHash, BiRefresh, BiTrip } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import SearchInput from "../../../components/admincomponents/SearchInput";
import Pagination from "../../../components/common/Pagination";
import { FiActivity } from "react-icons/fi";
import { GiPoliceOfficerHead } from "react-icons/gi";
import { MdOutlineLocationOn } from "react-icons/md";
import Layout from "../../../components/Admin/Layout";
import DashboardCompo from "../../../components/common/DashboardCompo";
import { allTrips, location } from "../../../dummy";
import { useRouter } from "next/router";
import { TbCarOff } from "react-icons/tb";
import { IoIosTimer } from "react-icons/io";
import { GoLocation } from "react-icons/go";
import { BASE_URL, STATE_URL } from "../../../api/base";
import { getAddressSubstring } from "../../../components/services/shortenAddress";
import { useEffect } from "react";
import { validateToken } from "../../../components/services/validateToken";
import EmptyTable from "../../../components/common/EmptyTable";

const RideRequest = ({ rideRequest, states }) => {
  const [status, setStatus] = useState("Status");
  const [locations, setLocations] = useState("Location");
  const [search, setSearch] = useState("");
  const [rideReq, setRideReq] = useState(rideRequest.data);

  const acceptedRide = rideReq?.filter((item) => item.status === "accepted");
  const rejectedRide = rideReq?.filter((item) => item.status === "rejected");

  const stateList = states?.map((item) => item.name);

  const rows = rideReq
    ?.filter((item) => {
      if (search !== "") {
        return (
          item.driver.first_name.toLowerCase().includes(search.toLowerCase()) ||
          item.rider.first_name.toLowerCase().includes(search.toLowerCase()) ||
          item.pickup_location.name.toLowerCase().includes(search.toLowerCase()) ||
          item.destination.toLowerCase().includes(search.toLowerCase())
        );
      }
      if (status !== "Status") {
        return item.status == status.toLowerCase();
      }
      if (locations !== "Location") {
        return item.pickup_location.name.toLowerCase() == locations.toLowerCase();
      } else {
        return item;
      }
    })
    ?.map((element, idx) => (
      <tr
        className=" text-center hover:shadow-sm hover:border text-sm  text-textColor border-b"
        key={idx}
      >
        <td className="md:text-base ml-6 text-xs p-3 flex space-x-2">
          <img
            src={element.driver.picture === null ? "/user.png" : element.driver.picture}
            className="rounded-full h-7 w-7"
            alt=""
          />
          <p className="text-sm">{element.driver.first_name}</p>
        </td>{" "}
        <td className="md:text-sm text-xs p-3">{new Date(element.time).toDateString()}</td>
        <td className="md:text-sm justify-start ml-5 text-xs p-3 flex space-x-2">
          <img
            src={element.rider.picture === null ? "/user.png" : element.rider.picture}
            className="rounded-full h-7 w-7"
            alt=""
          />
          <p className="text-sm">{element.rider.first_name}</p>
        </td>{" "}
        <td className="md:text-sm text-xs p-3">{element.pickup_location.name}</td>
        <td className="md:text-sm text-xs p-3">{getAddressSubstring(element.destination)}</td>
        <td className="text-center">
          {element.status == "accepted" ? (
            <div className=" max-w-[100px] p-1 mr-2 rounded-lg bg-[#f2fbf6]">
              <p className="text-green-600">Accepted</p>
            </div>
          ) : element.status == "rejected" ? (
            <div className=" max-w-[100px] p-1 mr-2 rounded-lg bg-[#fff4f4]">
              <p className="text-red-600 text-xs">Canceled</p>
            </div>
          ) : (
            <div className=" max-w-[100px] p-1 mr-2 rounded-lg bg-[#F2F5FF]">
              <p className="text-scudGreen text-xs">Ongoing</p>
            </div>
          )}
        </td>
      </tr>
    ));
  const router = useRouter();
  return (
    <div>
      <div className=" mb-5  md:mb-10  ">
        <p className="md:text-lg text-sm tracking-wide font-semibold">Manage Ride Request</p>
      </div>
      <div className="grid my-10 w-full grid-cols-1 md:grid-cols-3  gap-4 ">
        <DashboardCompo
          title={"Total Ride Request"}
          value={rideRequest?.total_records}
          filled={true}
          Icon={AiOutlineCar}
          color="scudGreen"
        />
        <DashboardCompo
          title={"Accepted Request"}
          value={acceptedRide?.length}
          filled={true}
          Icon={AiOutlineCar}
          color="green"
        />
        <DashboardCompo
          title={"Canceled Request"}
          value={rejectedRide.length}
          filled={true}
          Icon={TbCarOff}
          color="red"
        />
      </div>
      <div className="flex mb-8 justify-between">
        <p className="font-bold">Today's Ride Request</p>
      </div>
      {rideReq.length > 0 && (
        <div className="flex flex-col-reverse md:flex-row md:justify-between">
          <div className="flex space-x-3 ">
            <Select2
              data={["accepted", "rejected"]}
              // iconDropdown={true}
              position={"mt-[7rem] "}
              showSearch={false}
              Icon={FiActivity}
              setValue={setStatus}
              value={status}
            />
            <Select2
              // style={"w-[150px] relative block "}
              // iconDropdown={true}
              position={"mt-[22.9rem] h-80"}
              data={stateList}
              Icon={MdOutlineLocationOn}
              setValue={setLocations}
              value={locations}
            />
          </div>

          <SearchInput setValue={setSearch} value={search} style={"md:mb-0 mb-4"} />
        </div>
      )}
      {/* table start here  */}
      {rideReq?.length === 0 ? (
        <EmptyTable Icon={BiTrip} name={"ride request"} title={"No Ride Request"} />
      ) : (
        <div className="mt-5 mb-6 bg-white w-full overflow-x-auto border shadow pb-4  rounded-xl">
          <table className="w-full min-w-[700px] ">
            <thead className="border-b  bg-[#fbfbff] w-full rounded-t-lg">
              <tr className="border-b ">
                <td className="md:py-4 py-2 ">
                  <div className="flex  md:text-base text-xs justify-center">
                    <BsPerson className="text-scudGreen mr-1 md:mr-2 text-sm md:mt-1" />
                    <p className="md:text-base text-xs ">Rider</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex  justify-center">
                    <IoIosTimer className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs ">Time</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex  justify-center">
                    <GiPoliceOfficerHead className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs ">Driver</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex space-x-2  justify-center">
                    <img src="/marker.svg" alt="icon" className="w-5" />
                    <p className="md:text-base text-xs ">Pickup Location</p>
                  </div>
                </td>
                <td className="">
                  <div className="flex  justify-center">
                    <GoLocation className="text-scudGreen mr-1 md:mr-2 md:text-base md:mt-1" />
                    <p className="md:text-base text-xs ">Destination</p>
                  </div>
                </td>

                <td className=" ">
                  <div className="flex  justify-center">
                    <div className="border h-4 w-4 mt-1 mr-1 border-scudGreen rounded-full">
                      <BiRefresh className="text-scudGreen text-sm " />
                    </div>

                    <p className="md:text-base text-xs ">Status</p>
                  </div>
                </td>
              </tr>
            </thead>

            <tbody className="mx-4">{rows}</tbody>
          </table>
        </div>
      )}
      {/* table end here  */}
      <Pagination setData={setRideReq} serverData={rideRequest} isAdmin={true} />
    </div>
  );
};

RideRequest.getLayout = Layout;
export default RideRequest;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";

  const res = await fetch(`${BASE_URL}trips?type=request`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const stateRes = await fetch(`${STATE_URL}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  });

  const rideRequest = await res.json();
  const states = await stateRes.json();
  if (
    (rideRequest?.statusCode !== undefined && rideRequest?.statusCode === 401) ||
    (states.statusCode !== undefined && states.statusCode === 401)
  ) {
    try {
      await validateToken(context, true);
    } catch (err) {
      return { redirect: { destination: `/admin/auth`, permanent: false } };
    }
  }
  return {
    props: {
      rideRequest,
      states
    }
  };
}
