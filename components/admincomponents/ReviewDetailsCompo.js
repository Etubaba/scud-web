import React from "react";

import Rating from "../common/Rating";
import { MdAccessTime, MdOutlineLocationOn } from "react-icons/md";
import ReactTimeAgo from "react-time-ago";
import axios from "axios";
import { BASE_URL } from "../../api/base";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
import useFetch from "../../Hooks/useFetch";
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
    <span className="flex space-x-2 justify-center items-center">
      {" "}
      <img
        className="w-8 h-8 rounded-full"
        src={result == null || result.picture == null ? "/user.png" : result.picture}
        alt=""
      />
      <p className="font-semibold   text-textColor ">
        {result == null || result == undefined ? "" : result?.first_name + " " + result?.last_name}
      </p>
    </span>
  );
};
const FindAddress = ({ id }) => {
  const [result, setResult] = useState({});

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
          .get(`${BASE_URL}trips/${id}`)
          .then((res) => {
            setResult(res.data);
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
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0  md:justify-between">
      <div className="flex flex-col justify-between max-w-[220px]">
        <span className="flex space-x-1">
          <img className="h-7 w-5" src="/marker.svg" alt="" />
          <p className="text-sm mt-1 text-textColor">Pickup Location</p>
        </span>

        <p className="text-xs text-textColor">{result?.pickup}</p>
      </div>
      <div className="flex flex-col justify-between max-w-[220px]">
        <span className="flex space-x-1">
          <MdOutlineLocationOn className="text-scudGreen mt-1 text-lg" />
          <p className="text-sm mt-1 text-textColor">Destination</p>
        </span>

        <p className="text-xs text-textColor">{result?.destination}</p>
      </div>
    </div>
  );
};
const ReviewDetailsCompo = ({ reviews }) => {
  return (
    <>
      {reviews.map((item, index) => (
        <div key={index} className="w-full flex-col md:flex-row  flex m-3 border rounded-md">
          <div className="md:w-[40%] w-full flex flex-col space-y-2   bg-adminbg p-2">
            <p className="text-textColor/50 text-sm">Review</p>
            <div className="flex items-center justify-between">
              {/* {console.log(item)} */}
              <Finder id={item?.reviewer_id} key={index} />
              <Rating readOnly={true} rating={item?.rating} size="xs" />
            </div>
            <p className="text-sm text-textColor mt-8">{item?.comment}</p>
          </div>
          <div className="md:w-[60%] mt-6 md:mt-0 w-full  p-2 h-full bg-white ">
            <p className="text-textColor/50 mb-2 text-sm">Trips Details</p>
            <FindAddress id={item.trip_id} />
            <div className="flex mt-5 justify-between">
              <div className="py-[1.3px] px-4 rounded-md bg-green-600/20">
                <p className={`text-green-600 text-xs`}>completed</p>
              </div>
              <div className="text-textColor  text-sm flex justify-between">
                <MdAccessTime className="text-textColor mt-0.5 mr-1 text-xs" />
                <p className=" text-xs text-textColor">
                  <ReactTimeAgo date={item?.created_at} locale="en-US" />
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ReviewDetailsCompo;
