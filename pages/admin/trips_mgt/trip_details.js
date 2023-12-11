import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { GiPoliceOfficerHead } from "react-icons/gi";
import { GoLocation } from "react-icons/go";
import { IoIosTimer } from "react-icons/io";
import { BASE_URL } from "../../../api/base";
import Layout from "../../../components/Admin/Layout";
import RoutesMap from "../../../components/admincomponents/RoutesMap";
import { validateToken } from "../../../components/services/validateToken";

const Finder = ({ id, rider_name }) => {
  const [result, setResult] = useState(null);
  // const { fetchData, loading } = useFetch(`${BASE_URL}users/${id}`, id,true);

  useEffect(() => {
    let first = true;
    if (first) {
      async function finder() {
        const AUTH_TOKEN = Cookies.get("adminAccessToken");
        axios.defaults.headers.common["Authorization"] = "Bearer " + AUTH_TOKEN;
        axios.defaults.headers.get["Content-Type"] = "application/json";
        await axios
          .get(`${BASE_URL}users/${id}`)
          .then((res) => {
            setResult(res.data);
            // console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
      }

      finder();
    }
    return () => {
      first = false;
    };
  }, [id]);
  return rider_name ? (
    <p>{result?.first_name + " " + result?.last_name} </p>
  ) : (
    <span className="flex space-x-1 md:space-x-3 justify-center items-center">
      <img
        className="w-7 h-7 rounded-full"
        alt=""
        src={result == null || result.picture == null ? "/user.png" : result.picture}
      />
      <p className="text-textColor font-[500] text-xs">
        {result == null || result == undefined ? "" : result?.first_name + " " + result?.last_name}
      </p>
    </span>
  );
};

function tripDetails({ data }) {
  const [vehicleDetails, setVehicleDetails] = useState([]);

  useEffect(() => {
    const findVehicleDetails = async () => {
      const AUTH_TOKEN = Cookies.get("adminAccessToken");
      axios.defaults.headers.common["Authorization"] = "Bearer " + AUTH_TOKEN;
      axios.defaults.headers.get["Content-Type"] = "application/json";
      await axios
        .get(`${BASE_URL}users/${data.driver_id}`)
        .then((res) => {
          setVehicleDetails(res.data.vehicles);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    findVehicleDetails();
  });

  return (
    <div>
      <div className="border rounded-md p-5 md:p-10">
        <div className="flex  md:space-y-0 space-y-6 flex-col md:flex-row md:justify-between">
          <div className="md:w-2/3 md:mr-8">
            <div className=" space-x-2 items-center mb-3 flex">
              <label className="flex">
                <span className=" text-textColor/50  text-sm font-semibold">Driver</span>
              </label>
              <Finder id={data.driver_id} />
            </div>
            <div className="mb-4">
              <label className="flex">
                <img src="/marker.svg" alt="icon" className="w-5" />
                <span className="ml-2 text-sm text-textColor font-semibold">Pickup Location</span>
              </label>
              <div className="flex space-x-2 my-2">
                <p className="text-sm text-textColor">{data.pickup}</p>
              </div>
            </div>
            <div className="mb-4">
              <label className="flex">
                <GoLocation className="text-scudGreen mr-1 md:mr-2 md:text-base " />
                <span className="ml-1 text-textColor text-sm font-semibold">Destination</span>
              </label>
              <div className="flex text-textColor text-sm space-x-2 my-2">
                <p>{data.destination}</p>
              </div>
            </div>
            <div className="mb-4 flex justify-between">
              {data.status == "unstarted" ? (
                <div className="px-2 flex justify-center items-center rounded-md bg-slate-200 !text-scudGreen">
                  <p className="text-xs">ongoing</p>
                </div>
              ) : data.status == "completed" ? (
                <div className="px-2 flex justify-center items-center rounded-md bg-slate-200 !text-green-600">
                  <p className="text-xs">completed</p>
                </div>
              ) : (
                <div className="px-2 flex justify-center items-center rounded-md bg-slate-200 !text-red-500">
                  <p className="text-xs">canceled</p>
                </div>
              )}
              <div className="text-green-500 flex text-sm">
                <IoIosTimer className="mr-1 md:mt-1" />{" "}
                <p className="text-xs md:text-base">{data.duration} to complete (APROX)</p>
              </div>
            </div>
            <div className=" flex space-x-2 mb-3 items-center">
              <label className="flex">
                <span className="text-sm text-textColor/50 font-semibold">Rider</span>
              </label>
              <Finder id={data.rider_id} />
            </div>
          </div>

          <div className="md:w-1/3">
            <div>
              <RoutesMap origin={data.pickup} destination={data.destination} />
            </div>
            <div className="flex  space-x-2 md:space-x-5 my-5">
              <div className="flex  space-x-1 items-center md:py-0 py-1 px-2 border rounded-md">
                <div className="h-2 w-2 bg-scudGreen rounded-full "></div>
                <p className="md:text-xs text-[10px]  ">Route given</p>
              </div>
              <div className="flex  space-x-1 items-center md:py-0 py-1 px-2 border rounded-md">
                <div className="h-2 w-2 bg-red-500 rounded-full "></div>
                <p className="md:text-xs text-[10px]  ">Route taken</p>
              </div>
            </div>
          </div>
        </div>
        <div className="border rounded-md p-4 mb-4">
          <p className="text-[#9E9FA3] my-5">More trip information</p>
          <div className="md:w-4/5">
            <div className="flex justify-between text-sm mb-5">
              <p className="font-semibold text-textColor">Vehicle detail</p>
              <p className="text-textColor/50 ">
                {vehicleDetails.length == 0
                  ? "NULL"
                  : vehicleDetails[0].model + " " + vehicleDetails[0].color}
              </p>
            </div>
            <div className="flex text-sm justify-between mb-5">
              <p className="text-textColor font-semibold">Rider name</p>
              <p className="text-textColor/50">
                <Finder id={data.rider_id} rider_name={true} />
              </p>
            </div>
            <div className="flex text-sm justify-between mb-5">
              <p className="font-semibold text-textColor">Trip date</p>
              <p className="text-textColor/50">
                {data.start_date == null ? "NULL" : data.start_date}
              </p>
            </div>
            <div className="flex text-sm justify-between mb-5">
              <p className="font-semibold text-textColor">Driver arrived</p>
              <p className="text-textColor/50">
                {" "}
                {data.drival_arrival == null ? "NULL" : data.drival_arrival}
              </p>
            </div>
            <div className="flex text-sm justify-between mb-5">
              <p className="font-semibold text-textColor">Start trip</p>
              <p className="text-textColor/50">
                {" "}
                {data.start_date == null ? "NULL" : data.start_date}
              </p>
            </div>
            <div className="flex text-sm justify-between mb-5">
              <p className="font-semibold text-textColor">End trip</p>
              {data.end_date == null ? "NULL" : data.end_date}
            </div>
            <div className="flex text-sm justify-between mb-5">
              <p className="font-semibold text-textColor">Trip duration</p>
              <p className="text-textColor/50">{data.duration == null ? "NULL" : data.duration}</p>
            </div>
            <div className="flex flex-col text-sm md:flex-row md:justify-between mb-5">
              <p className="font-semibold text-textColor">Pickup location</p>
              <p className="text-textColor/50">{data.pickup} </p>
            </div>
            <div className="flex flex-col text-sm md:flex-row md:justify-between mb-5">
              <p className="font-semibold text-textColor">Destination</p>
              <p className="text-textColor/50">{data.destination}</p>
            </div>
          </div>
        </div>

        <div className="border rounded-md p-4">
          <p className="text-[#9E9FA3] my-5">Payment details</p>
          <div className="md:w-4/5">
            <div className="flex text-sm justify-between mb-5">
              <p className="font-semibold text-textColor">Currency</p>
              <p>NGN</p>
            </div>
            <div className="flex text-sm justify-between mb-5">
              <p className="font-semibold text-textColor">Base fare</p>
              <p>{data.fare.base_fare}</p>
            </div>
            <div className="flex justify-between text-sm mb-5">
              <p className="font-semibold text-textColor">Admin Commission for Rider</p>
              <p>...</p>
            </div>
            <div className="flex justify-between text-sm mb-5">
              <p className="font-semibold text-textColor">Admin Commission for Driver</p>
              <p>...</p>
            </div>
            <div className="flex justify-between text-sm mb-5">
              <p className="font-semibold text-textColor">Total Fare</p>
              <p>...</p>
            </div>
            <div className="flex justify-between text-sm mb-5">
              <p className="font-semibold text-textColor">Owe Amount</p>
              <p>...</p>
            </div>
            <div className="flex justify-between text-sm mb-5">
              <p className="font-semibold text-textColor">Cash Collected by Driver</p>
              <p>...</p>
            </div>
            <div className="flex justify-between text-sm mb-5">
              <p className="font-semibold text-textColor">Driver Earnings</p>
              <p>...</p>
            </div>
            <div className="flex justify-between text-sm mb-5">
              <p className="font-semibold text-textColor">Payment Mode</p>
              <p>...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

tripDetails.getLayout = Layout;
export default tripDetails;

export async function getServerSideProps(context) {
  const token = context.req.cookies.adminAccessToken || "";
  const id = Object.keys(context.query)[0];
  const res = await fetch(`${BASE_URL}trips/${id}`, {
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

  return {
    props: {
      data
    }
  };
}
