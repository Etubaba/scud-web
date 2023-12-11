import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { MdOutlineLocationOn } from "react-icons/md";
import { getTimeAgo } from "../services/getTimeAgo";
import { getAddressSubstring } from "../services/shortenAddress";

const WithdrawerReqTrips = ({ item: { destination, pickup, created_at } }) => {
  return (
    <div className="flex md:flex-row md:space-y-0 space-y-2 flex-col bg-adminbg mb-3 p-3 rounded-lg md:justify-between">
      <div className="flex flex-col justify-between ">
        <span className="flex space-x-1">
          {" "}
          <img className="h-7 w-5" src="/marker.svg" alt="" />
          <p className="text-sm mt-1 text-textColor">Pickup Location</p>
        </span>

        <p className="text-xs text-textColor">{getAddressSubstring(pickup)}</p>
      </div>
      <div className="flex flex-col justify-between ">
        <span className="flex space-x-1">
          {" "}
          <MdOutlineLocationOn className="text-scudGreen mt-1 text-lg" />
          <p className="text-sm mt-1 text-textColor">Destination</p>
        </span>

        <p className="text-xs text-textColor">{getAddressSubstring(destination)}</p>
      </div>
      <span className="flex justify-center text-textColor/50 items-center space-x-1">
        <AiOutlineClockCircle className="text-sm" />
        <p className="text-xs ">{getTimeAgo(created_at)}</p>
      </span>
    </div>
  );
};

export default WithdrawerReqTrips;
