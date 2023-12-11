import React from "react";
import { BsPerson } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";

const NotificationCompo = ({ item }) => {
  const { type, note, time, isRead } = item;
  return (
    <div className="flex border-b py-2 space-x-3">
      <div
        className={`${
          type === "info"
            ? "bg-scudGreen"
            : type === "success"
            ? "bg-green-600"
            : "bg-red-600"
        }   h-8 w-8 rounded-lg flex justify-center items-center`}
      >
        <BsPerson className="text-white text-xl" />
      </div>

      <div className="flex flex-col space-y-2 ">
        <p className="text-textColor text-[12px]">{note}</p>
        <span className="flex ">
          <GoPrimitiveDot
            className={isRead ? `text-gray-300` : `text-scudGreen`}
          />
          <p className="text-textColor/50 text-xs">{time}</p>
        </span>
      </div>
    </div>
  );
};

export default NotificationCompo;
