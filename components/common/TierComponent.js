import React from "react";
import { AiOutlineCheckCircle, AiOutlineGift } from "react-icons/ai";

const TierComponent = ({ color, task, note, level, active }) => {
  const divBorder =
    color === "red"
      ? "border-red-600"
      : color == "green"
      ? "border-green-600"
      : color == "yellow"
      ? "border-yellow-400"
      : "border-scudGreen";

  const iconColor =
    color === "red"
      ? "bg-red-600"
      : color == "green"
      ? "bg-green-600"
      : color == "yellow"
      ? "bg-yellow-400"
      : "bg-scudGreen";
  const textcolor =
    color === "red"
      ? "text-red-600"
      : color == "green"
      ? "text-green-600"
      : color == "yellow"
      ? "text-yellow-400"
      : "text-scudGreen";
  return (
    <div
      className={`shadow-lg rounded-md h-auto justify-start items-center w-full ${divBorder} p-4 border`}
    >
      <div
        className={`flex items-center mb-7  lg:mb-14 ${
          active ? "justify-between" : "justify-start"
        }`}
      >
        <div className="flex space-x-3 justify-center items-center">
          <div
            className={`${iconColor} p-3 flex justify-center items-center rounded-full text-white`}
          >
            <AiOutlineGift className="text-xl " />
          </div>
          <p className={`${textcolor}`}>Tier {level}</p>
        </div>
        {active && (
          <div className="flex space-x-1">
            <AiOutlineCheckCircle className="text-green-600 mt-1" />
            <p className="text-green-600 ">Active</p>
          </div>
        )}
      </div>

      <div>
        <p className="text-base font-medium">Task</p>
        <p className="text-textColor text-xs md:text-sm">{task}</p>
      </div>
      <div className="border-b my-3" />
      <span>
        <span className="text-textColor flex">
          <p className="font-medium text-sm mr-1">NB:</p>
          <small>{note}</small>
        </span>
      </span>
    </div>
  );
};

export default TierComponent;
