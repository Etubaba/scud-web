import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { MdOutlineLocationOn } from "react-icons/md";
import { BASE_URL } from "../../api/base";
import { trips } from "../../dummy";
import Rating from "../common/Rating";
import { getAddressSubstring } from "../services/shortenAddress";

const Finder = ({ id }) => {
  const [result, setResult] = useState(null);
  // const { fetchData, loading } = useFetch(`${BASE_URL}users/${id}`, id,true);

  // console.log(fetchData);

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
  return (
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

const PickupDesCompo = ({ trip }) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push({
          pathname: "/admin/trips_mgt/trip_details",
          query: trip.id
        });
      }}
      className="bg-adminbg hover:bg-gray-100 px-6 py-4 mb-4 rounded-lg"
    >
      <div className="flex flex-col md:space-y-0 space-y-6 md:flex-row md:justify-between mb-7 w-full md:w-[80%]">
        <div className="flex flex-col justify-between ">
          <span className="flex space-x-1">
            <img className="h-7 w-5" src="/marker.svg" alt="" />
            <p className="text-sm mt-1 text-textColor">Pickup Location</p>
          </span>

          <p className="text-xs text-textColor">{trip.pickup}</p>
        </div>
        <div className="flex flex-col justify-between ">
          <span className="flex space-x-1">
            <MdOutlineLocationOn className="text-scudGreen mt-1 text-lg" />
            <p className="text-sm mt-1 text-textColor">Destination</p>
          </span>

          <p className="text-xs text-textColor">{getAddressSubstring(trip.destination)}</p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="flex justify-between md:space-x-6 mb-4 md:mb-0 md:justify-center items-center">
          <p className="text-sm text-textColor/50">Rider</p>
          <Finder id={trip.rider_id} />
          <Rating size="xs" rating={2} readOnly={true} />
        </div>
        <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:space-x-12 md:justify-between md:items-center">
          {/* {owing && (
            <div className="flex space-x-8 items-center">
              <div className="flex space-x-2">
                <p className="text-xs  text-textColor/50">Oweing Amount :</p>
                <p className="text-xs text-textColor font-semibold ">₦3000</p>
              </div>
              <div className=" min-w-[60px] p-1 rounded-lg bg-[#fff4f4]">
                <p className="text-red-600 text-center text-xs">unpaid</p>
              </div>
            </div>
          )} */}

          <div>
            {trip.status == "completed" ? (
              <div className=" min-w-[90px] p-1 rounded-lg bg-[#f2fbf6]">
                <p className="text-green-600 text-center text-xs">Completed</p>
              </div>
            ) : trip.status == "canceled" ? (
              <div className=" min-w-[90px] p-1 rounded-lg bg-[#fff4f4]">
                <p className="text-red-600 text-center text-xs">Cancelled</p>
              </div>
            ) : (
              <div className=" min-w-[90px] p-1 rounded-lg bg-[#F2F5FF]">
                <p className="text-scudGreen text-center text-xs">Ongoing</p>
              </div>
            )}
          </div>
          {/* )} */}

          <span className="flex justify-center text-textColor/50 items-center space-x-1">
            <AiOutlineClockCircle className="text-sm" />
            <p className="text-xs ">{trips.start_date == null ? "N/A" : trips.start_date}</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PickupDesCompo;
